import { useState } from "react";
import { motion } from "motion/react";
import { Clock, Award, ChevronRight, CheckCircle2, Flame, AlignRight } from "lucide-react";
import { Recipe, Ingredient } from "../types";
import { PRELOADED_RECIPES } from "../data";

interface RecipeSectionProps {
  activeIngredients: Ingredient[];
  onSelectRecipe: (recipe: Recipe) => void;
}

export default function RecipeSection({ activeIngredients, onSelectRecipe }: RecipeSectionProps) {
  const [filter, setFilter] = useState<"all" | "high-protein">("all");
  
  // Calculate matching stats to show intelligent recommended scores
  const getMatchingScore = (recipe: Recipe) => {
    const checkedIngNamesInBowl = activeIngredients
      .filter(i => i.checked)
      .map(i => i.name.toLowerCase());

    const matchedInRecipe = recipe.ingredientsUsed.filter(ingName => 
      checkedIngNamesInBowl.some(name => name.includes(ingName.toLowerCase()) || ingName.toLowerCase().includes(name))
    );

    return {
      matchedCount: matchedInRecipe.length,
      totalCount: recipe.ingredientsUsed.length,
      percentage: recipe.ingredientsUsed.length > 0 
        ? Math.round((matchedInRecipe.length / recipe.ingredientsUsed.length) * 100)
        : 0,
      matchedList: matchedInRecipe
    };
  };

  // Filter and Sort recipes
  const filteredRecipes = [...PRELOADED_RECIPES].filter(recipe => {
    if (filter === "high-protein") {
      return recipe.protein >= 30;
    }
    return true;
  });

  const sortedRecipes = filteredRecipes.sort((a, b) => {
    return getMatchingScore(b).percentage - getMatchingScore(a).percentage;
  });

  const getDifficultyColor = (diff: Recipe["difficulty"]) => {
    switch (diff) {
      case "Easy": return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "Medium": return "bg-amber-50 text-amber-700 border-amber-100";
      case "Hard": return "bg-rose-50 text-rose-700 border-rose-100";
    }
  };

  return (
    <section id="recipes" className="space-y-6 pt-6">
      
      {/* Dynamic Sub-header adhering to Sleek Interface theme */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
         <div>
            <h2 className="text-3xl font-light font-serif text-charcoal">Your fridge knows what to cook.</h2>
            <p className="text-sm text-muted-gray font-medium mt-1">
              {sortedRecipes.length} intelligent recipes generated based on current inventory.
            </p>
         </div>
         <div className="flex gap-2">
            <button 
              onClick={() => setFilter && setFilter("all")}
              className={`px-4 py-2 rounded-full text-xs font-bold border transition-colors cursor-pointer ${
                filter === "all" ? "bg-charcoal text-white border-charcoal" : "bg-white text-muted-gray border-light-gray-green hover:text-charcoal"
              }`}
            >
              All Recipes
            </button>
            <button 
              onClick={() => setFilter && setFilter("high-protein")}
              className={`px-4 py-2 rounded-full text-xs font-bold border transition-colors cursor-pointer ${
                filter === "high-protein" ? "bg-charcoal text-white border-charcoal" : "bg-white text-muted-gray border-light-gray-green hover:text-charcoal"
              }`}
            >
              High Protein
            </button>
         </div>
      </div>

      {/* Grid rendering cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sortedRecipes.map((recipe, index) => {
          const matchInfo = getMatchingScore(recipe);
          
          return (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              onClick={() => onSelectRecipe(recipe)}
              className="group bg-white border border-light-gray-green rounded-3xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              
              {/* Card visual elements */}
              <div>
                
                {/* Image panel with tags */}
                <div className="relative aspect-16/10 overflow-hidden bg-charcoal">
                  <img
                    src={recipe.imageUrl}
                    alt={recipe.name}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 opacity-90"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  {/* Absolute tags */}
                  <div className="absolute top-4 left-4 flex gap-1.5 flex-wrap">
                    <span className="bg-black/40 backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-widest font-mono px-2.5 py-1 rounded-full">
                      🔥 {recipe.calories} kcal
                    </span>
                    <span className={`text-[9px] uppercase font-bold tracking-wider font-mono px-2.5 py-1 rounded-full border ${getDifficultyColor(recipe.difficulty)}`}>
                      {recipe.difficulty}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-xs text-charcoal text-[9px] font-mono font-bold px-2.5 py-1 rounded-full shadow-xs">
                    ⏱ {recipe.cookingTime} MINS
                  </div>

                  {/* Dynamic Match Score */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-1.5">
                    <div className="bg-fresh-green text-white text-[10.5px] font-semibold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                      <span>{matchInfo.percentage}% Match</span>
                    </div>
                    {matchInfo.matchedCount > 0 && (
                      <span className="text-[10px] text-white font-mono bg-black/35 px-2 py-0.5 rounded-full backdrop-blur-xs">
                        {matchInfo.matchedCount} ingredients available
                      </span>
                    )}
                  </div>
                </div>

                {/* Details text area */}
                <div className="p-6 space-y-3 text-left">
                  <h4 className="font-display font-extrabold text-lg text-charcoal group-hover:text-sage transition-colors leading-tight">
                    {recipe.name}
                  </h4>
                  <p className="text-xs text-muted-gray leading-relaxed line-clamp-2">
                    {recipe.description}
                  </p>

                  {/* Macro values horizontal list */}
                  <div className="grid grid-cols-4 gap-2 pt-3 text-center border-t border-light-gray-green/50">
                    <div className="bg-protein/5 px-2 py-1.5 rounded-xl border border-protein/10">
                      <span className="text-[9px] font-mono text-protein font-semibold uppercase block">PRO</span>
                      <span className="text-xs font-bold text-charcoal">{recipe.protein}g</span>
                    </div>
                    <div className="bg-carbs/5 px-2 py-1.5 rounded-xl border border-carbs/10">
                      <span className="text-[9px] font-mono text-carbs font-semibold uppercase block">CARB</span>
                      <span className="text-xs font-bold text-charcoal">{recipe.carbs}g</span>
                    </div>
                    <div className="bg-fat/5 px-2 py-1.5 rounded-xl border border-fat/10">
                      <span className="text-[9px] font-mono text-fat font-semibold uppercase block">FAT</span>
                      <span className="text-xs font-bold text-charcoal">{recipe.fat}g</span>
                    </div>
                    <div className="bg-fresh-green/5 px-2 py-1.5 rounded-xl border border-fresh-green/10">
                      <span className="text-[9px] font-mono text-fresh-green font-semibold uppercase block">FIB</span>
                      <span className="text-xs font-bold text-charcoal">{recipe.fiber}g</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Action area */}
              <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-light-gray-green/35 text-xs">
                <span className="text-[11px] text-muted-gray font-mono">
                  {recipe.servingSize} • Nutrients Analyzed
                </span>
                <span className="font-semibold text-sage flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                  View Cooking Steps <ChevronRight className="w-4 h-4" />
                </span>
              </div>

            </motion.div>
          );
        })}
      </div>

    </section>
  );
}
