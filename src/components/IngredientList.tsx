import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Check, Sliders, Sparkles, X, PlusCircle, Trash2, HelpCircle } from "lucide-react";
import { Ingredient } from "../types";

interface IngredientListProps {
  ingredients: Ingredient[];
  onToggleIngredient: (id: string) => void;
  onUpdateQuantity: (id: string, qty: number) => void;
  onAddIngredient: (ing: Omit<Ingredient, "id">) => void;
  onRemoveIngredient: (id: string) => void;
}

export default function IngredientList({
  ingredients,
  onToggleIngredient,
  onUpdateQuantity,
  onAddIngredient,
  onRemoveIngredient
}: IngredientListProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState<Ingredient["category"]>("Protein");
  const [newQty, setNewQty] = useState(150);
  const [newUnit, setNewUnit] = useState("g");

  const handleSubmitCustom = (e: FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    onAddIngredient({
      name: newName.trim(),
      category: newCategory,
      estimatedQty: newQty,
      unit: newUnit,
      confidence: 100,
      checked: true
    });

    setNewName("");
    setNewQty(100);
    setShowAddForm(false);
  };

  const getCategoryColor = (cat: Ingredient["category"]) => {
    switch (cat) {
      case "Protein":
        return "bg-protein/10 text-protein border-protein/25";
      case "Vegetable":
        return "bg-fresh-green/10 text-fresh-green border-fresh-green/25";
      case "Dairy":
        return "bg-fat/10 text-fat border-fat/25";
      case "Carb":
        return "bg-carbs/10 text-carbs border-carbs/25";
      case "Fruit":
        return "bg-amber-100 text-amber-700 border-amber-250";
      default:
        return "bg-muted-gray/10 text-muted-gray border-light-gray-green";
    }
  };

  // Determine units based on selected category in creation form
  const handleCategoryChange = (cat: Ingredient["category"]) => {
    setNewCategory(cat);
    if (cat === "Protein" || cat === "Carb" || cat === "Dairy") {
      setNewUnit("g");
      setNewQty(200);
    } else if (cat === "Vegetable" || cat === "Fruit") {
      setNewUnit("cups");
      setNewQty(2);
    } else {
      setNewUnit("pcs");
      setNewQty(1);
    }
  };

  return (
    <div className="bg-white border border-light-gray-green rounded-3xl p-6 shadow-sm">
      
      {/* Header Area */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-light-gray-green/60">
        <div>
          <h3 className="font-display font-extrabold text-lg text-charcoal">
            Detected Ingredients
          </h3>
          <p className="text-xs text-muted-gray mt-0.5">
            Deselect items or slider-adjust estimated weights to calibrate nutritions.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center gap-1.5 bg-mint hover:bg-sage text-emerald-950 hover:text-white text-xs font-semibold px-3 py-1.5 rounded-xl transition-all shadow-xs cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Missing</span>
        </button>
      </div>

      {/* Expandable Add Custom Ingredient Drawer Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-off-white/60 p-4 rounded-2xl border border-light-gray-green/60 mb-6"
          >
            <form onSubmit={handleSubmitCustom} className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-sage uppercase flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Insert Custom Bio-Resource
                </span>
                <button 
                  type="button" 
                  onClick={() => setShowAddForm(false)}
                  className="text-muted-gray hover:text-charcoal p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-5">
                  <label className="block text-[10px] uppercase font-mono font-bold text-muted-gray mb-1">Ingredient Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Avocado, Whole Wheat Pasta"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full bg-white border border-light-gray-green rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:ring-1 focus:ring-sage"
                  />
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-[10px] uppercase font-mono font-bold text-muted-gray mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => handleCategoryChange(e.target.value as Ingredient["category"])}
                    className="w-full bg-white border border-light-gray-green rounded-xl px-2 py-2 text-xs text-charcoal focus:outline-none focus:ring-1 focus:ring-sage"
                  >
                    <option value="Protein">Protein</option>
                    <option value="Vegetable">Vegetable</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Carb">Carbs</option>
                    <option value="Fruit">Fruit</option>
                    <option value="Other">Other Category</option>
                  </select>
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-[10px] uppercase font-mono font-bold text-muted-gray mb-1">Quantity</label>
                  <div className="flex gap-1.5">
                    <input
                      type="number"
                      required
                      min={1}
                      max={2000}
                      value={newQty}
                      onChange={(e) => setNewQty(Number(e.target.value))}
                      className="w-2/3 bg-white border border-light-gray-green rounded-xl px-2 py-2 text-xs text-charcoal focus:outline-none focus:ring-1 focus:ring-sage"
                    />
                    <select
                      value={newUnit}
                      onChange={(e) => setNewUnit(e.target.value)}
                      className="w-1/3 bg-white border border-light-gray-green rounded-xl px-1.5 py-2 text-[10px] text-charcoal focus:outline-none focus:ring-1 focus:ring-sage"
                    >
                      <option value="g">g</option>
                      <option value="pcs">pcs</option>
                      <option value="cups">cups</option>
                      <option value="ml">ml</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  className="bg-charcoal hover:bg-sage text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors cursor-pointer"
                >
                  Verify and Inject Asset
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid of detected elements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ingredients.map((ing) => (
          <motion.div
            key={ing.id}
            layout
            className={`rounded-2xl border p-4 transition-all relative ${
              ing.checked 
                ? "border-light-gray-green bg-white shadow-xs" 
                : "border-light-gray-green/40 bg-off-white/50 opacity-60"
            }`}
          >
            {/* Top row elements */}
            <div className="flex items-start justify-between">
              
              {/* Checkbox and name */}
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => onToggleIngredient(ing.id)}
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all cursor-pointer ${
                    ing.checked 
                      ? "bg-sage border-sage text-white" 
                      : "border-light-gray-green bg-white text-transparent hover:border-sage"
                  }`}
                >
                  {ing.checked && <Check className="w-3.5 h-3.5" />}
                </button>

                <div>
                  <h4 className={`text-sm font-extrabold tracking-tight ${ing.checked ? "text-charcoal" : "text-muted-gray line-through"}`}>
                    {ing.name}
                  </h4>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className={`text-[9px] font-semibold uppercase font-mono px-2 py-0.5 rounded-full border ${getCategoryColor(ing.category)}`}>
                      {ing.category}
                    </span>
                    <span className="text-[10px] text-muted-gray font-mono">
                      Conf: {ing.confidence}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Remove icon, only for user injects or custom edits */}
              <button
                onClick={() => onRemoveIngredient(ing.id)}
                className="text-muted-gray/50 hover:text-rose-600 transition-colors p-1"
                title="Discard Ingredient"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Simulated Gram/Ounce sliders */}
            {ing.checked && (
              <div className="mt-4 pt-4 border-t border-light-gray-green/50 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-muted-gray flex items-center gap-1">
                    <Sliders className="w-3 h-3 text-sage" /> Estimated Qty
                  </span>
                  <span className="text-charcoal font-bold">
                    {ing.estimatedQty} {ing.unit}
                  </span>
                </div>
                
                {/* Visual slider control */}
                <input
                  type="range"
                  min={ing.unit === "pcs" ? 1 : ing.unit === "cups" ? 1 : 10}
                  max={ing.unit === "pcs" ? 12 : ing.unit === "cups" ? 6 : 1000}
                  step={ing.unit === "pcs" || ing.unit === "cups" ? 1 : 10}
                  value={ing.estimatedQty}
                  onChange={(e) => onUpdateQuantity(ing.id, Number(e.target.value))}
                  className="w-full accent-sage h-1 bg-light-gray-green rounded-lg cursor-pointer transition-all"
                />
              </div>
            )}

            {/* Bounding Coordinate Flag overlay visual helper */}
            {ing.checked && ing.x !== undefined && (
              <div className="absolute top-2 right-2 flex items-center gap-0.5 bg-mint text-emerald-900 border border-emerald-200 text-[8px] font-mono px-1 rounded uppercase">
                <span>Box Located #{(ing.x % 9)}</span>
              </div>
            )}

          </motion.div>
        ))}

        {ingredients.length === 0 && (
          <div className="col-span-full border-2 border-dashed border-light-gray-green rounded-2xl p-8 text-center bg-off-white/40">
            <HelpCircle className="w-8 h-8 text-muted-gray mx-auto mb-2" />
            <h4 className="font-display font-bold text-sm text-charcoal">No ingredients active.</h4>
            <p className="text-xs text-muted-gray mt-1 max-w-xs mx-auto">
              Choose one of the presets inside the visual scanner or upload your picture to begin localized scans.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
