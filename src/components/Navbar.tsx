import { useState } from "react";
import { Sparkles, Menu, X, ArrowUpRight, Cpu } from "lucide-react";

interface NavbarProps {
  onStartScanner: () => void;
}

export default function Navbar({ onStartScanner }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 h-20 px-8 z-40 bg-white border-b border-light-gray-green/80 flex items-center justify-between transition-all duration-300">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-sage rounded-lg flex items-center justify-center text-white">
            <div className="w-4 h-4 border-2 border-white rounded-sm" />
          </div>
          <span className="text-xl font-bold tracking-tight uppercase text-charcoal">
            Nutriful <span className="font-light text-sage">FridgeScan</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#hero" className="text-sm font-medium text-charcoal/80 hover:text-sage transition-colors">
            Overview
          </a>
          <a href="#scanner" className="text-sm font-medium text-charcoal/80 hover:text-sage transition-colors flex items-center gap-1">
            Fridge Scan <span className="w-1.5 h-1.5 rounded-full bg-fresh-green animate-pulse"></span>
          </a>
          <a href="#analytics" className="text-sm font-medium text-charcoal/80 hover:text-sage transition-colors">
            Nutrition Diagnostics
          </a>
          <a href="#recipes" className="text-sm font-medium text-charcoal/80 hover:text-sage transition-colors">
            Preloaded Dishes
          </a>
        </div>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-3">
          <div className="text-right">
            <p className="text-[11px] font-mono font-medium text-muted-gray">ESTABLISHED 2026</p>
            <p className="text-[10px] text-fresh-green flex items-center gap-1 justify-end font-mono">
              <Sparkles className="w-2.5 h-2.5" /> AGENT ONLINE
            </p>
          </div>
          
          <button 
            onClick={onStartScanner}
            className="bg-charcoal hover:bg-sage text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-1.5 active:scale-95 group shadow-sm hover:shadow-md cursor-pointer"
          >
            <span>Scan Fridge</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden text-charcoal p-1"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden absolute top-auto left-0 right-0 bg-white border-b border-light-gray-green p-6 flex flex-col gap-4 shadow-xl transition-all duration-300">
          <a 
            href="#hero" 
            onClick={() => setIsOpen(false)}
            className="text-base font-medium text-charcoal/90 hover:text-sage pb-2 border-b border-light-gray-green/40"
          >
            Overview
          </a>
          <a 
            href="#scanner" 
            onClick={() => setIsOpen(false)}
            className="text-base font-medium text-charcoal/90 hover:text-sage pb-2 border-b border-light-gray-green/40 flex items-center justify-between"
          >
            <span>Fridge Scan AI</span>
            <span className="w-2 h-2 rounded-full bg-fresh-green"></span>
          </a>
          <a 
            href="#analytics" 
            onClick={() => setIsOpen(false)}
            className="text-base font-medium text-charcoal/90 hover:text-sage pb-2 border-b border-light-gray-green/40"
          >
            Nutrition Diagnostics
          </a>
          <a 
            href="#recipes" 
            onClick={() => setIsOpen(false)}
            className="text-base font-medium text-charcoal/90 hover:text-sage pb-2 border-b border-light-gray-green/40"
          >
            Preloaded Dishes
          </a>

          <button 
            onClick={() => {
              setIsOpen(false);
              onStartScanner();
            }}
            className="w-full bg-sage hover:bg-charcoal text-white text-sm font-semibold py-3 rounded-xl transition-all duration-300 text-center cursor-pointer"
          >
            Launch Live Camera Scan
          </button>
        </div>
      )}
    </nav>
  );
}
