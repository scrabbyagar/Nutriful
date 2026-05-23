import { motion } from "motion/react";
import { Sparkles, Camera, Play, Apple, Heart, Activity, CheckCircle, Flame } from "lucide-react";

interface HeroProps {
  onTryFree: () => void;
  onWatchDemo: () => void;
}

export default function Hero({ onTryFree, onWatchDemo }: HeroProps) {
  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-mint/20 via-off-white to-off-white pt-20 pb-16 px-6">
      {/* Absolute Aesthetic Blobs */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-sage/5 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute top-1/3 right-1/10 w-[450px] h-[450px] bg-warm-orange/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Headline and Positioning */}
        <div className="lg:col-span-7 space-y-8 text-left">
          
          {/* Tagline Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-light-gray-green shadow-xs"
          >
            <span className="w-2 h-2 rounded-full bg-fresh-green animate-ping" />
            <span className="text-[12px] font-mono tracking-wider text-charcoal/80 uppercase font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-sage" /> Next-Gen Fridge Analysis v2.5
            </span>
          </motion.div>

          {/* Headline */}
          <div className="space-y-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-charcoal leading-[1.08]"
            >
              Your fridge already <br />
              <span className="text-sage relative inline-block font-serif font-light italic tracking-normal">
                knows what to cook.
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-mint rounded-full -z-10" />
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-base sm:text-lg text-muted-gray max-w-xl leading-relaxed"
            >
              Snap a photo and instantly generate AI-powered meals with calories, macros, and nutrition insights. No manual logging, zero kitchen wasting.
            </motion.p>
          </div>

          {/* CTA Group */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-4 pt-2"
          >
            <button 
              onClick={onTryFree}
              className="bg-sage hover:bg-charcoal text-white font-semibold text-sm px-7 py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <Camera className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              <span>Try Fridge Scan</span>
            </button>

            <button 
              onClick={onWatchDemo}
              className="bg-white hover:bg-light-gray-green text-charcoal border border-light-gray-green font-semibold text-sm px-7 py-4 rounded-xl shadow-xs hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current text-warm-orange" />
              <span>Watch Live Demo</span>
            </button>
          </motion.div>

          {/* Social Proof / Features */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="pt-6 border-t border-light-gray-green/60 grid grid-cols-3 gap-6 text-left"
          >
            <div>
              <div className="flex items-center gap-1.5">
                <Apple className="w-4 h-4 text-sage" />
                <span className="font-display font-bold text-lg text-charcoal">98.4%</span>
              </div>
              <p className="text-xs text-muted-gray mt-1">Scan accuracy rate</p>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-warm-orange" />
                <span className="font-display font-bold text-lg text-charcoal">2.1s</span>
              </div>
              <p className="text-xs text-muted-gray mt-1">Generation speed</p>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-fresh-green" />
                <span className="font-display font-bold text-lg text-charcoal">Smart</span>
              </div>
              <p className="text-xs text-muted-gray mt-1">Macro diagnostics</p>
            </div>
          </motion.div>

        </div>

        {/* Right Column: Interactive Animated Demo Frame */}
        <div className="lg:col-span-5 relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative bg-white border border-light-gray-green rounded-3xl p-4 shadow-xl pointer-events-none overflow-hidden"
          >
            {/* Ambient overlay */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-sage" />

            {/* Simulated Frame Header */}
            <div className="flex items-center justify-between pb-3 border-b border-light-gray-green/60 px-1 text-xs text-muted-gray font-mono">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-fresh-green animate-pulse" /> SCANNING_MODE: ACTIVATED
              </span>
              <span>CAM_01_REAR</span>
            </div>

            {/* Inner "Camera Screen" */}
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden mt-3 bg-charcoal">
              {/* Healthy food display placeholder background */}
              <img 
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=600&auto=format&fit=crop" 
                alt="Scanning sample fridge contents" 
                className="w-full h-full object-cover opacity-80"
                referrerPolicy="no-referrer"
              />

              {/* Scanning Ray overlay */}
              <div className="absolute top-0 left-0 right-0 h-2/5 scanner-ray animate-scan-line pointer-events-none" />

              {/* Bounding box simulations */}
              <div className="absolute top-1/4 left-1/4 w-1/4 h-1/3 border-2 border-dashed border-sage rounded-lg flex flex-col justify-end p-1.5">
                <span className="text-[9px] font-mono bg-sage text-white px-1 rounded self-start font-bold uppercase">
                  EGGS [4 detected]
                </span>
              </div>

              <div className="absolute bottom-1/5 right-1/4 w-2/5 h-1/4 border-2 border-dashed border-warm-orange rounded-lg flex flex-col justify-end p-1.5">
                <span className="text-[9px] font-mono bg-warm-orange text-white px-1 rounded self-start font-bold uppercase">
                  SPINACH [Fresh]
                </span>
              </div>
            </div>

            {/* Diagnostics Panel Footer inside Hero */}
            <div className="mt-4 space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-charcoal flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-fresh-green fill-fresh-green" /> Total Bio-Available Assets
                </span>
                <span className="text-sage">6 detected</span>
              </div>
              
              {/* Macro Bars Preview */}
              <div className="grid grid-cols-3 gap-2 text-[10px] font-mono">
                <div className="bg-protein/10 rounded-lg p-2 border border-protein/20">
                  <div className="text-protein font-bold uppercase text-[8px]">Protein</div>
                  <div className="text-charcoal font-bold mt-0.5">94g Est</div>
                </div>
                <div className="bg-carbs/10 rounded-lg p-2 border border-carbs/20">
                  <div className="text-carbs font-bold uppercase text-[8px]">Carbohydrates</div>
                  <div className="text-charcoal font-bold mt-0.5">120g Est</div>
                </div>
                <div className="bg-fat/10 rounded-lg p-2 border border-fat/20">
                  <div className="text-fat font-bold uppercase text-[8px]">Healthy Fat</div>
                  <div className="text-charcoal font-bold mt-0.5">48g Est</div>
                </div>
              </div>

              <div className="bg-mint/40 rounded-xl p-3 border border-sage/20 flex items-center justify-between text-xs text-emerald-950">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                  <span>3 healthy menus compiled instantly</span>
                </div>
                <span className="font-mono font-bold text-sage">100% Match</span>
              </div>
            </div>

          </motion.div>

          {/* Floaters */}
          <motion.div 
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -top-6 -left-6 bg-white border border-light-gray-green rounded-2xl p-3 shadow-md flex items-center gap-2.5 max-w-[180px] pointer-events-none"
          >
            <div className="w-7 h-7 rounded-lg bg-mint flex items-center justify-center text-sage">
              <CheckCircle className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-mono text-muted-gray uppercase leading-none">Confidence</p>
              <p className="text-xs font-extrabold text-charcoal mt-0.5">99.7% Accuracy</p>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 4, delay: 1, ease: "easeInOut" }}
            className="absolute -bottom-4 -right-6 bg-white border border-light-gray-green rounded-2xl p-3 shadow-md flex items-center gap-2.5 max-w-[180px] pointer-events-none"
          >
            <div className="w-7 h-7 rounded-lg bg-orange-100 flex items-center justify-center text-warm-orange">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-mono text-muted-gray uppercase leading-none">CALORIE PREVIEW</p>
              <p className="text-xs font-extrabold text-charcoal mt-0.5">-35% waste recipes</p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
