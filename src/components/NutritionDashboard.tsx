import { motion } from "motion/react";
import { Flame, Apple, Heart, Activity, Target, ShieldCheck } from "lucide-react";
import { Ingredient } from "../types";

interface NutritionDashboardProps {
  activeIngredients: Ingredient[];
}

// Healthy approximate mappings per weight segment (per g / ml / pc / cup)
const INGREDIENT_NUTRITION_MAPPING: Record<
  string, 
  { kcal: number; protein: number; carbs: number; fat: number; fiber: number }
> = {
  "Eggs": { kcal: 74, protein: 6.3, carbs: 0.4, fat: 5.0, fiber: 0 }, // per pc
  "Spinach": { kcal: 7, protein: 0.9, carbs: 1.1, fat: 0.1, fiber: 0.7 }, // per cup
  "Chicken Breast": { kcal: 1.65, protein: 0.31, carbs: 0, fat: 0.036, fiber: 0 }, // per g
  "Tomatoes": { kcal: 0.18, protein: 0.009, carbs: 0.039, fat: 0.002, fiber: 0.012 }, // per g
  "Cheese": { kcal: 4.02, protein: 0.25, carbs: 0.013, fat: 0.33, fiber: 0 }, // per g
  "Milk": { kcal: 0.52, protein: 0.033, carbs: 0.048, fat: 0.02, fiber: 0 }, // per ml
  "Greek Yogurt": { kcal: 0.59, protein: 0.10, carbs: 0.036, fat: 0.004, fiber: 0 }, // per g
  "Berries": { kcal: 0.57, protein: 0.007, carbs: 0.12, fat: 0.003, fiber: 0.024 }, // per g
  "default": { kcal: 1.2, protein: 0.08, carbs: 0.15, fat: 0.05, fiber: 0.02 } // general fallback
};

export default function NutritionDashboard({ activeIngredients }: NutritionDashboardProps) {

  // Calculate dynamic macros in real-time
  const calculated = activeIngredients.reduce(
    (acc, ing) => {
      const mapping = INGREDIENT_NUTRITION_MAPPING[ing.name] || INGREDIENT_NUTRITION_MAPPING["default"];
      const multiplier = ing.estimatedQty;

      acc.calories += Math.round(mapping.kcal * multiplier);
      acc.protein += Number((mapping.protein * multiplier).toFixed(1));
      acc.carbs += Number((mapping.carbs * multiplier).toFixed(1));
      acc.fat += Number((mapping.fat * multiplier).toFixed(1));
      acc.fiber += Number((mapping.fiber * multiplier).toFixed(1));

      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
  );

  // Targets (Simulated ideal daily meal allocation targets)
  const targetCalories = 800;
  const targetProtein = 50; // g
  const targetCarbs = 80;   // g
  const targetFat = 30;     // g
  const targetFiber = 10;   // g

  const caloriePercentage = Math.min(Math.round((calculated.calories / targetCalories) * 100), 100);
  const proteinPercentage = Math.min(Math.round((calculated.protein / targetProtein) * 100), 100);
  const carbsPercentage = Math.min(Math.round((calculated.carbs / targetCarbs) * 100), 100);
  const fatPercentage = Math.min(Math.round((calculated.fat / targetFat) * 100), 100);
  const fiberPercentage = Math.min(Math.round((calculated.fiber / targetFiber) * 100), 100);

  return (
    <div id="analytics" className="bg-white border border-light-gray-green rounded-3xl p-6 shadow-sm flex flex-col justify-between h-full">
      <div>
        
        {/* Section Title */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-light-gray-green/60">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-warm-orange font-extrabold uppercase block">
              Nutrient Diagnostics
            </span>
            <h3 className="font-display font-extrabold text-lg text-charcoal mt-1">
              Active Bio-Availability
            </h3>
          </div>
          
          <div className="bg-mint text-emerald-950 font-mono text-[10px] uppercase font-semibold px-2.5 py-1 rounded-md flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-sage" /> Real-Time Calibration
          </div>
        </div>

        {/* Top Stats Bar - Sleek Theme Design */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-white rounded-2xl border border-light-gray-green p-3 flex flex-col justify-between min-h-[76px] shadow-xs">
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#6B7280] line-clamp-1">Caloric Potential</span>
            <span className="text-xl font-light italic font-serif text-charcoal">{calculated.calories.toLocaleString()} <small className="text-[9px] not-italic font-sans text-[#6B7280]">kcal</small></span>
          </div>
          <div className="bg-white rounded-2xl border border-light-gray-green p-3 flex flex-col justify-between min-h-[76px] border-l-4 border-l-[#E97B63] shadow-xs">
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#E97B63] line-clamp-1">Avg. Protein</span>
            <span className="text-xl font-light italic font-serif text-charcoal">{calculated.protein} <small className="text-[9px] not-italic font-sans text-[#6B7280]">g</small></span>
          </div>
          <div className="bg-white rounded-2xl border border-light-gray-green p-3 flex flex-col justify-between min-h-[76px] border-l-4 border-l-[#E9C46A] shadow-xs">
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#E9C46A] line-clamp-1">Avg. Carbs</span>
            <span className="text-xl font-light italic font-serif text-charcoal">{calculated.carbs} <small className="text-[9px] not-italic font-sans text-[#6B7280]">g</small></span>
          </div>
          <div className="bg-white rounded-2xl border border-light-gray-green p-3 flex flex-col justify-between min-h-[76px] border-l-4 border-l-[#DDA15E] shadow-xs">
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#DDA15E] line-clamp-1">Avg. Fats</span>
            <span className="text-xl font-light italic font-serif text-charcoal">{calculated.fat} <small className="text-[9px] not-italic font-sans text-[#6B7280]">g</small></span>
          </div>
        </div>

        {/* Dynamic Analytics Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Left Side: Circular Progress Gauge for Calories */}
          <div className="md:col-span-4 flex flex-col items-center justify-center p-4 bg-off-white/40 rounded-2xl border border-light-gray-green/30">
            <div className="relative w-32 h-32 flex items-center justify-center">
              {/* SVG circular track */}
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="52"
                  className="stroke-light-gray-green/60"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="52"
                  className="stroke-sage transition-all duration-500 ease-out"
                  strokeWidth="10"
                  strokeDasharray={`${2 * Math.PI * 52}`}
                  strokeDashoffset={`${2 * Math.PI * 52 * (1 - caloriePercentage / 100)}`}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>

              {/* Inner Circle Content */}
              <div className="absolute text-center">
                <Flame className="w-5 h-5 text-warm-orange mx-auto -mb-1" />
                <span className="font-display font-extrabold text-2xl tracking-tight text-charcoal">
                  {calculated.calories}
                </span>
                <p className="text-[9px] uppercase tracking-wider font-mono text-muted-gray mt-0.5">kcal Est.</p>
              </div>
            </div>

            <p className="text-[11px] text-muted-gray text-center font-mono mt-3">
              {caloriePercentage}% of ideal single meal cap ({targetCalories} kcal)
            </p>
          </div>

          {/* Right Side: Macro bars & sliders */}
          <div className="md:col-span-8 space-y-4">
            
            {/* Protein Macro Bar */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-charcoal flex items-center gap-1.5 font-sans">
                  <span className="w-2.5 h-2.5 rounded-full bg-protein inline-block" /> Protein
                </span>
                <span className="font-mono text-muted-gray">
                  <strong className="text-charcoal">{calculated.protein}g</strong> / {targetProtein}g
                </span>
              </div>
              <div className="w-full h-2.5 bg-off-white cream-border rounded-full overflow-hidden">
                <div 
                  className="h-full bg-protein transition-all duration-500 ease-out" 
                  style={{ width: `${proteinPercentage}%` }}
                />
              </div>
            </div>

            {/* Carbs Macro Bar */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-charcoal flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-carbs inline-block" /> Carbohydrates
                </span>
                <span className="font-mono text-muted-gray">
                  <strong className="text-charcoal">{calculated.carbs}g</strong> / {targetCarbs}g
                </span>
              </div>
              <div className="w-full h-2.5 bg-off-white cream-border rounded-full overflow-hidden">
                <div 
                  className="h-full bg-carbs transition-all duration-500 ease-out" 
                  style={{ width: `${carbsPercentage}%` }}
                />
              </div>
            </div>

            {/* Fats Macro Bar */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-charcoal flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-fat inline-block" /> Healthy Fats
                </span>
                <span className="font-mono text-muted-gray">
                  <strong className="text-charcoal">{calculated.fat}g</strong> / {targetFat}g
                </span>
              </div>
              <div className="w-full h-2.5 bg-off-white cream-border rounded-full overflow-hidden">
                <div 
                  className="h-full bg-fat transition-all duration-500 ease-out" 
                  style={{ width: `${fatPercentage}%` }}
                />
              </div>
            </div>

            {/* Fiber Macro Bar */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-charcoal flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-fresh-green inline-block" /> Dietary Fiber
                </span>
                <span className="font-mono text-muted-gray">
                  <strong className="text-charcoal">{calculated.fiber}g</strong> / {targetFiber}g
                </span>
              </div>
              <div className="w-full h-2.5 bg-off-white cream-border rounded-full overflow-hidden">
                <div 
                  className="h-full bg-fresh-green transition-all duration-500 ease-out" 
                  style={{ width: `${fiberPercentage}%` }}
                />
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Wellness Insight Box based on active scan ingredients */}
      <div className="mt-6 pt-5 border-t border-light-gray-green/60">
        <div className="bg-sage/5 border border-sage/10 rounded-2xl p-4 flex items-start gap-3">
          <Activity className="w-5 h-5 text-sage mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-display font-medium text-xs text-emerald-950">
              Nutriful System Bio-Advice
            </h4>
            <p className="text-[11px] text-muted-gray leading-normal mt-1">
              {activeIngredients.length === 0 
                ? "Awaiting scanned food ingredients to compute cellular advice diagnostics."
                : activeIngredients.some(i => i.name === "Chicken Breast" && i.checked)
                  ? "Highly dense leucine protein observed. Ideal for fueling type-II muscle fibers and ensuring rapid sarcoplasmic recovery levels."
                  : activeIngredients.some(i => i.name === "Spinach" && i.checked)
                    ? "Abundant magnesium and non-heme iron detected. Promotes cellular mitochondrial recovery and optimizes capillary oxygen circulation."
                    : "Balanced assets ready. This mix yields antioxidant properties with fiber to promote healthy glucose processing and gut microbiota wellness."}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
