import { motion, AnimatePresence } from "motion/react";
import { X, Clock, Award, ShieldCheck, Flame, Play, BookOpen, User, Check, Sparkles } from "lucide-react";
import { Recipe } from "../types";

interface RecipeModalProps {
  recipe: Recipe | null;
  onClose: () => void;
}

export default function RecipeModal({ recipe, onClose }: RecipeModalProps) {
  if (!recipe) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        
        {/* Backdrop Blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-charcoal/40 backdrop-blur-md"
        />

        {/* Modal Sheet Container */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 30 }}
          transition={{ type: "spring", damping: 25, stiffness: 350 }}
          className="relative bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col"
        >
          
          {/* Header Area */}
          <div className="relative aspect-21/9 bg-charcoal">
            <img 
              src={recipe.imageUrl} 
              alt={recipe.name} 
              className="w-full h-full object-cover opacity-80" 
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            
            {/* Close trigger button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Title & basic indicators */}
            <div className="absolute bottom-4 left-6 right-6 text-left">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#F9C74F] font-bold">
                📱 Premium Recipe Guide
              </span>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight leading-none mt-1">
                {recipe.name}
              </h3>
            </div>
          </div>

          {/* Modal scrollable body area */}
          <div className="p-6 md:p-8 overflow-y-auto space-y-8 flex-1">
            
            {/* Horizontal parameters indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-light-gray-green/60 text-left">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-mint rounded-xl flex items-center justify-center text-sage">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-muted-gray uppercase">Timing</p>
                  <p className="text-sm font-extrabold text-charcoal">{recipe.cookingTime} mins</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-orange-100 rounded-xl flex items-center justify-center text-warm-orange">
                  <Flame className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-muted-gray uppercase">Calorie Sum</p>
                  <p className="text-sm font-extrabold text-charcoal">{recipe.calories} kcal</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-rose-100 rounded-xl flex items-center justify-center text-rose-500">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-muted-gray uppercase">Complexity</p>
                  <p className="text-sm font-extrabold text-charcoal">{recipe.difficulty}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-emerald-100 rounded-xl flex items-center justify-center text-[#5FA777]">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-muted-gray uppercase">Serving Size</p>
                  <p className="text-sm font-extrabold text-charcoal">{recipe.servingSize}</p>
                </div>
              </div>
            </div>

            {/* Split Grid for Ingredients and Nutrition Facts */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-left">
              
              {/* Left Column: Ingredients Detail */}
              <div className="md:col-span-7 space-y-4">
                <h4 className="font-display font-extrabold text-base text-charcoal flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-sage" /> Required Ingredients
                </h4>

                <div className="bg-off-white/40 border border-light-gray-green rounded-2xl p-4 space-y-2">
                  {recipe.ingredientsDetail.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center justify-between text-xs py-2 border-b border-light-gray-green/60 last:border-0"
                    >
                      <span className="text-charcoal flex items-center gap-2 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-sage" /> {item.name}
                      </span>
                      <span className="font-mono text-muted-gray bg-white border border-light-gray-green px-2 py-0.5 rounded-lg text-[11px]">
                        {item.qty}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Dynamic Macros details */}
              <div className="md:col-span-5 space-y-4">
                <h4 className="font-display font-extrabold text-base text-charcoal flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#5FA777]" /> Nutrition Facts
                </h4>

                <div className="bg-charcoal text-white rounded-2xl p-5 space-y-4 font-mono select-none">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-[11px] text-white/70">CALORIES</span>
                    <span className="text-base font-extrabold font-display">{recipe.calories} kcal</span>
                  </div>

                  {/* Micro-scale macro progress tracks */}
                  <div className="space-y-3 pt-1">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-protein inline-block" /> PROTEIN</span>
                      <span className="font-bold text-white">{recipe.protein}g</span>
                    </div>
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-protein" style={{ width: `${(recipe.protein / 50) * 100}%` }} />
                    </div>

                    <div className="flex justify-between items-center text-[10px]">
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-carbs inline-block" /> CARBS</span>
                      <span className="font-bold text-white">{recipe.carbs}g</span>
                    </div>
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-carbs" style={{ width: `${(recipe.carbs / 80) * 100}%` }} />
                    </div>

                    <div className="flex justify-between items-center text-[10px]">
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-fat inline-block" /> FAT</span>
                      <span className="font-bold text-white">{recipe.fat}g</span>
                    </div>
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-fat" style={{ width: `${(recipe.fat / 35) * 100}%` }} />
                    </div>

                    <div className="flex justify-between items-center text-[10px]">
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-fresh-green inline-block" /> FIBER</span>
                      <span className="font-bold text-white">{recipe.fiber}g</span>
                    </div>
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-fresh-green" style={{ width: `${(recipe.fiber / 12) * 100}%` }} />
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Preparation Steps */}
            <div className="space-y-4 text-left">
              <h4 className="font-display font-extrabold text-base text-charcoal">
                Preparation Guidelines
              </h4>
              
              <div className="space-y-4">
                {recipe.steps.map((step, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <span className="w-6 h-6 rounded-full bg-mint text-emerald-950 font-mono text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-xs text-charcoal/80 leading-relaxed font-sans mt-0.5">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Simulated interactive preparation video screen clip */}
            <div className="bg-off-white/50 border border-light-gray-green rounded-2xl p-4 text-center space-y-2">
              <span className="text-[9px] font-mono tracking-wider uppercase text-muted-gray block">
                🎥 Interactive Kitchen Companion preview
              </span>
              <div className="relative aspect-21/9 rounded-xl bg-charcoal overflow-hidden flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=600&auto=format&fit=crop" 
                  alt="Cooking Prep" 
                  className="absolute inset-0 w-full h-full object-cover opacity-35 blur-xs"
                  referrerPolicy="no-referrer"
                />
                
                <button className="bg-white/95 hover:bg-sage hover:text-white p-3.5 rounded-full shadow-lg text-charcoal transition-all relative z-10 flex items-center justify-center cursor-pointer">
                  <Play className="w-5 h-5 fill-current" />
                </button>
              </div>
              <p className="text-[10px] text-muted-gray italic">
                Scan recipes come complete with full guide-along vocal assistants and animated macro counters when cooked.
              </p>
            </div>

            {/* Absolute Dynamic Wellness Recommendation Box */}
            {recipe.wellnessTip && (
              <div className="bg-sage/10 rounded-2xl p-5 border border-sage/20 text-left flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-display font-bold text-xs text-emerald-950 uppercase tracking-wide">
                    Nutriful Biomodeling System Tip
                  </h5>
                  <p className="text-[11.5px] text-muted-gray leading-normal mt-1">
                    {recipe.wellnessTip}
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* Footer Area with Start Cooking confirmation */}
          <div className="border-t border-light-gray-green/60 p-5 bg-off-white/40 flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="bg-white hover:bg-light-gray-green/60 border border-light-gray-green font-semibold text-xs px-5 py-2.5 rounded-xl cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                alert(`Perfect! Starting full-screen guidance timer for "${recipe.name}". Happy cooking!`);
                onClose();
              }}
              className="bg-sage hover:bg-charcoal text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
            >
              Launch Cooking Mode
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
