import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Brain, Code, Cpu, ShieldAlert, Award } from "lucide-react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ScanConsole from "./components/ScanConsole";
import IngredientList from "./components/IngredientList";
import NutritionDashboard from "./components/NutritionDashboard";
import RecipeSection from "./components/RecipeSection";
import RecipeModal from "./components/RecipeModal";

import { Ingredient, Recipe } from "./types";
import { FRIDGE_SCENES } from "./data";

export default function App() {
  // Active Scan and Calibration States
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [imageSource, setImageSource] = useState<string>("");
  const [scanLoading, setScanLoading] = useState<boolean>(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [hasScanned, setHasScanned] = useState<boolean>(false);

  // Initialize with some wonderful ingredients from our first preset scene to keep the viewport full and premium on first render
  useEffect(() => {
    const defaultScene = FRIDGE_SCENES[0];
    setIngredients(defaultScene.preloadedIngredients);
    setImageSource(defaultScene.url);
  }, []);

  // Handle incoming OCR Scan outputs
  const handleScanComplete = (detectedList: Ingredient[], scannedUrl: string) => {
    setIngredients(detectedList);
    setImageSource(scannedUrl);
    setHasScanned(true);
  };

  // Reset visual and nutritional scanning states
  const handleResetScan = () => {
    setIngredients([]);
    setImageSource("");
    setHasScanned(false);
  };

  // Toggle ingredient item inclusion
  const handleToggleIngredient = (id: string) => {
    setIngredients(prev => 
      prev.map(ing => ing.id === id ? { ...ing, checked: !ing.checked } : ing)
    );
  };

  // Update specific estimated quantity multiplier
  const handleUpdateQuantity = (id: string, qty: number) => {
    setIngredients(prev =>
      prev.map(ing => ing.id === id ? { ...ing, estimatedQty: qty } : ing)
    );
  };

  // Update coordinate values dynamically from dragging
  const handleUpdateIngredientCoords = (id: string, x: number, y: number) => {
    setIngredients(prev =>
      prev.map(ing => ing.id === id ? { ...ing, x, y } : ing)
    );
  };

  // Add missing items to the list
  const handleAddIngredient = (newIng: Omit<Ingredient, "id">) => {
    const id = `user_ing_${Date.now()}`;
    const itemWithId: Ingredient = {
      ...newIng,
      id
    };
    setIngredients(prev => [...prev, itemWithId]);
  };

  // Remove elements from list
  const handleRemoveIngredient = (id: string) => {
    setIngredients(prev => prev.filter(ing => ing.id !== id));
  };

  // UX Smooth-Scroll Anchor Actions
  const handleScrollToScanner = () => {
    const scannerElement = document.getElementById("scanner");
    if (scannerElement) {
      scannerElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleWatchDemoPreset = () => {
    // Scroll and set to wellness preset, triggering a state update
    handleScrollToScanner();
    // Re-scans or just triggers the presets instantly
    const secondScene = FRIDGE_SCENES[0];
    setIngredients(secondScene.preloadedIngredients);
    setImageSource(secondScene.url);
    setHasScanned(true);
  };

  const activeIngredientsCount = ingredients.filter(i => i.checked).length;

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-mint selection:text-emerald-950 bg-off-white pb-0">
      
      {/* Premium Navigation Header */}
      <Navbar onStartScanner={handleScrollToScanner} />

      {/* Hero Visualizer Deck */}
      <Hero 
        onTryFree={handleScrollToScanner} 
        onWatchDemo={handleWatchDemoPreset} 
      />

      {/* Main Feature Dashboard Area */}
      <main className="max-w-7xl mx-auto w-full px-6 py-12 space-y-12">
        
        {/* Step 1: Eye Scanning Interface Console */}
        <div className="space-y-4">
          <div className="text-left">
            <span className="font-mono text-[10.5px] uppercase tracking-widest text-sage font-extrabold bg-mint px-2.5 py-1 rounded-sm">
              PHASE 01 // COMPUTER VISION DECK
            </span>
            <p className="text-xs text-muted-gray mt-2 font-mono">
              Capturing 4K relative density layers and segmenting specific organic matrix structures.
            </p>
          </div>
          
          <ScanConsole 
            onScanComplete={handleScanComplete}
            hasScanned={hasScanned}
            onResetScan={handleResetScan}
            ingredients={ingredients}
            onRemoveIngredient={handleRemoveIngredient}
            onUpdateIngredientCoords={handleUpdateIngredientCoords}
            loading={scanLoading}
            setLoading={setScanLoading}
          />
        </div>

        {/* Step 2 & 3 & 4 conditional rendering */}
        {hasScanned ? (
          <>
            {/* Step 2: Interactive Calibration and Live Nutrient Diagnostics (Bento Grid) */}
            {ingredients.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6">
                
                {/* Calibration Panel: List of detected items */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="text-left">
                    <span className="font-mono text-[10.5px] uppercase tracking-widest text-[#F4A261] font-extrabold bg-[#F4A261]/15 px-2.5 py-1 rounded-sm">
                      PHASE 02 // CALIBRATION DECK
                    </span>
                    <p className="text-xs text-muted-gray mt-2 font-mono">
                      Scale absolute weights (g) or fluid volumes (ml) to match physical container sizes.
                    </p>
                  </div>

                  <IngredientList
                    ingredients={ingredients}
                    onToggleIngredient={handleToggleIngredient}
                    onUpdateQuantity={handleUpdateQuantity}
                    onAddIngredient={handleAddIngredient}
                    onRemoveIngredient={handleRemoveIngredient}
                  />
                </div>

                {/* Calculations Panel: Calories Progress and dynamic macros */}
                <div className="lg:col-span-5 space-y-4 h-full">
                  <div className="text-left">
                    <span className="font-mono text-[10.5px] uppercase tracking-widest text-[#5FA777] font-extrabold bg-[#5FA777]/15 px-2.5 py-1 rounded-sm">
                      PHASE 03 // DIAGNOSTICS DECK
                    </span>
                    <p className="text-xs text-muted-gray mt-2 font-mono">
                      Translating active items into calibrated biomodel micronutrients instantly.
                    </p>
                  </div>

                  <NutritionDashboard 
                    activeIngredients={ingredients.filter(i => i.checked)} 
                  />
                </div>

              </div>
            )}

            {/* Step 3: High-Matching Recipes Display */}
            <div className="pt-10 border-t border-light-gray-green/60">
              <div className="text-left mb-6">
                <span className="font-mono text-[10.5px] uppercase tracking-widest text-indigo-600 font-extrabold bg-indigo-50 px-2.5 py-1 rounded-sm">
                  PHASE 04 // CULINARY LOGIC MATRIX
                </span>
                <p className="text-xs text-muted-gray mt-2 font-mono">
                  Mapping ingredients against 4 preloaded elite menus with custom macros.
                </p>
              </div>

              <RecipeSection 
                activeIngredients={ingredients}
                onSelectRecipe={(recipe) => setSelectedRecipe(recipe)}
              />
            </div>
          </>
        ) : (
          /* Sleek premium cinematic placeholder inviting them to scan first */
          <div className="bg-white/60 border border-dashed border-light-gray-green rounded-3xl p-10 py-16 text-center space-y-4 max-w-2xl mx-auto shadow-xs">
            <div className="w-14 h-14 rounded-full bg-mint/50 text-sage mx-auto flex items-center justify-center animate-pulse">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="font-display font-extrabold text-lg text-charcoal">Recipes & Diagnostics Pending Scan</h3>
              <p className="text-xs text-muted-gray leading-relaxed max-w-md mx-auto font-sans">
                Trigger a vision scan above using one of our healthy presets, high-definition local uploads, or live camera stream to initiate ingredient calibration and calculate custom meal metrics.
              </p>
            </div>
            <div className="pt-2">
              <button 
                onClick={handleScrollToScanner}
                className="bg-sage text-white px-5 py-2 rounded-xl text-xs font-bold shadow-sm hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              >
                Go to Optical Scanner
              </button>
            </div>
          </div>
        )}

        {/* Dynamic Educational Widget */}
        <div className="bg-white border border-light-gray-green p-6 sm:p-8 rounded-3xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center shadow-xs">
          <div className="md:col-span-8 space-y-2 text-left">
            <h4 className="font-display font-extrabold text-lg text-charcoal">
              A startup-level demonstration of complete kitchen synergy.
            </h4>
            <p className="text-xs text-muted-gray leading-relaxed font-sans max-w-xl">
              Fridge Scan AI is engineered to minimize vegetable spoilage, optimize sports nutritional balances, and remove cooking decision fatigue. Our diagnostic computer vision overlays make grocery matching look entirely cinematic and effortless.
            </p>
          </div>
          <div className="md:col-span-4 flex justify-start md:justify-end gap-3 font-mono text-xs">
            <div className="bg-mint/40 text-emerald-950 border border-sage/20 rounded-xl p-3 text-center">
              <p className="text-[9px] uppercase text-muted-gray">Precision</p>
              <p className="font-extrabold text-charcoal leading-none mt-1">99.4%</p>
            </div>
            <div className="bg-mint/40 text-emerald-950 border border-sage/20 rounded-xl p-3 text-center">
              <p className="text-[9px] uppercase text-muted-gray">Matching</p>
              <p className="font-extrabold text-[#F4A261] leading-none mt-1">Sub-Sec</p>
            </div>
          </div>
        </div>

      </main>

      {/* Floating Detailed Guided Cooking Sheets */}
      <RecipeModal 
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />

      {/* Classic Investor Footer */}
      <footer className="bg-white border-t border-light-gray-green/80 py-12 px-6 text-center text-xs text-muted-gray">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-sage flex items-center justify-center text-white font-bold font-display text-sm">
              N
            </div>
            <span className="font-display font-bold text-charcoal">Nutriful Corp.</span>
          </div>
          
          <p className="text-[11px] font-mono">
            &copy; 2026 Nutriful Ecosystem. Powered by computer vision networks and athletic nutrition algorithms.
          </p>

          <div className="flex gap-4 text-muted-gray font-mono text-[10px]">
            <span className="hover:text-sage cursor-pointer">PRIVACY RULES</span>
            <span>•</span>
            <span className="hover:text-sage cursor-pointer">INVESTOR DECK</span>
          </div>
        </div>
      </footer>

      {/* Sleek Bottom Analytics Status Bar */}
      <footer className="py-4 bg-charcoal px-8 flex flex-col md:flex-row items-center justify-between text-mint text-[10px] font-bold uppercase tracking-[0.2em] gap-4">
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
          <span>AI Model: Vision-Nutri v4.2</span>
          <span className="hidden sm:inline">•</span>
          <span>Confidence Score: 98.4%</span>
          <span className="hidden sm:inline">•</span>
          <span>Inventory Sync: Active</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-fresh-green animate-pulse" />
          <span>System Live</span>
        </div>
      </footer>

    </div>
  );
}
