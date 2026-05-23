import React, { useState, useRef, useEffect, DragEvent, ChangeEvent, PointerEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Camera, Upload, Eye, RefreshCw, Layers, Check, 
  Trash2, Plus, Sparkles, Sliders, AlertCircle, Play 
} from "lucide-react";
import { Ingredient, FridgeScene } from "../types";
import { FRIDGE_SCENES } from "../data";

interface ScanConsoleProps {
  onScanComplete: (ingredients: Ingredient[], imageSourceUrl: string) => void;
  hasScanned: boolean;
  onResetScan: () => void;
  ingredients: Ingredient[];
  onRemoveIngredient: (id: string) => void;
  onUpdateIngredientCoords: (id: string, x: number, y: number) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export default function ScanConsole({ 
  onScanComplete, 
  hasScanned, 
  onResetScan, 
  ingredients, 
  onRemoveIngredient, 
  onUpdateIngredientCoords,
  loading, 
  setLoading 
}: ScanConsoleProps) {
  const [activeTab, setActiveTab] = useState<"preset" | "upload" | "camera">("preset");
  const [selectedScene, setSelectedScene] = useState<FridgeScene>(FRIDGE_SCENES[0]);
  
  // Upload and Custom Scanning Support
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  // Live Camera Stream Support
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [capturedFrame, setCapturedFrame] = useState<string | null>(null);

  // Local scanning statuses
  const [scanStatus, setScanStatus] = useState("");
  const [scanProgress, setScanProgress] = useState(0);

  // Pointer dragging handler for coordinates overlay
  const handlePointerDown = (e: PointerEvent<HTMLDivElement>, ingId: string) => {
    e.preventDefault();
    const viewport = viewportRef.current;
    if (!viewport) return;

    const rect = viewport.getBoundingClientRect();
    const currentIng = ingredients.find(i => i.id === ingId);
    if (!currentIng) return;

    const startX = e.clientX;
    const startY = e.clientY;
    const initialPercentX = currentIng.x ?? 0;
    const initialPercentY = currentIng.y ?? 0;

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      // Convert delta in pixels to percent of viewport width/height
      const deltaPercentX = (deltaX / rect.width) * 100;
      const deltaPercentY = (deltaY / rect.height) * 100;

      // New coordinates clamped to stay inside [0, 100 - size] boundaries
      const newX = Math.max(0, Math.min(100 - (currentIng.w ?? 22), initialPercentX + deltaPercentX));
      const newY = Math.max(0, Math.min(100 - (currentIng.h ?? 20), initialPercentY + deltaPercentY));

      onUpdateIngredientCoords(ingId, Math.round(newX), Math.round(newY));
    };

    const handlePointerUp = () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerUp);
    };

    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerup", handlePointerUp);
  };

  // Initialize camera stream when tab changes to camera
  useEffect(() => {
    if (activeTab === "camera") {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [activeTab]);

  const startCamera = async () => {
    setCameraError(null);
    setCapturedFrame(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment", width: { ideal: 640 }, height: { ideal: 480 } } 
      });
      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err: any) {
      console.error("Camera access failed", err);
      setCameraError("Camera access denied or unavailable. Please use upload or choose standard preset fridge images below.");
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg");
        setCapturedFrame(dataUrl);
        stopCamera();
      }
    }
  };

  const handleDrag = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      processUploadedFile(file);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processUploadedFile(e.target.files[0]);
    }
  };

  const processUploadedFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setUploadedImage(event.target.result as string);
        onResetScan();
      }
    };
    reader.readAsDataURL(file);
  };

  // Run simulated AI Scan progress bars & overlays
  const triggerAIScan = () => {
    setLoading(true);
    setScanProgress(0);
    setScanStatus("Initializing high-fidelity scanner ray...");
    
    // Simulate smart progressive load states
    const states = [
      { prg: 20, txt: "Scanning image canvas dimensions..." },
      { prg: 45, txt: "Executing localized visual bounding box analysis..." },
      { prg: 70, txt: "Estimating absolute volume quantities & units..." },
      { prg: 90, txt: "Running calibration against Nutriful recipe vectors..." },
      { prg: 100, txt: "Finalizing nutritional intelligence profile..." }
    ];

    states.forEach((item, index) => {
      setTimeout(() => {
        setScanProgress(item.prg);
        setScanStatus(item.txt);
        if (item.prg === 100) {
          setTimeout(() => {
            setLoading(false);
            
            // Output detected items based on scene selection
            if (activeTab === "preset") {
              onScanComplete(selectedScene.preloadedIngredients, selectedScene.url);
            } else if (activeTab === "upload") {
              // Create randomized realistic ingredients from custom uploads
              const customIngredients: Ingredient[] = [
                { id: "cust_1", name: "Chicken Breast", category: "Protein", estimatedQty: 280, unit: "g", confidence: 94, checked: true, x: 20, y: 30, w: 30, h: 25 },
                { id: "cust_2", name: "Eggs", category: "Protein", estimatedQty: 3, unit: "pcs", confidence: 91, checked: true, x: 55, y: 15, w: 20, h: 20 },
                { id: "cust_3", name: "Spinach", category: "Vegetable", estimatedQty: 2, unit: "cups", confidence: 88, checked: true, x: 45, y: 45, w: 35, h: 30 },
                { id: "cust_4", name: "Cheese", category: "Dairy", estimatedQty: 150, unit: "g", confidence: 85, checked: false, x: 15, y: 65, w: 20, h: 20 }
              ];
              onScanComplete(customIngredients, uploadedImage || "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=600&auto=format&fit=crop");
            } else {
              // Camera frame
              const cameraIngredients: Ingredient[] = [
                { id: "cam_1", name: "Eggs", category: "Protein", estimatedQty: 4, unit: "pcs", confidence: 96, checked: true, x: 15, y: 25, w: 25, h: 20 },
                { id: "cam_2", name: "Tomatoes", category: "Vegetable", estimatedQty: 150, unit: "g", confidence: 94, checked: true, x: 45, y: 20, w: 20, h: 20 },
                { id: "cam_3", name: "Spinach", category: "Vegetable", estimatedQty: 3, unit: "cups", confidence: 91, checked: true, x: 30, y: 45, w: 35, h: 32 }
              ];
              onScanComplete(cameraIngredients, capturedFrame || "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=600&auto=format&fit=crop");
            }
          }, 600);
        }
      }, (index + 1) * 550);
    });
  };

  return (
    <div id="scanner" className="bg-white border border-light-gray-green rounded-3xl p-6 sm:p-8 shadow-sm glow-subtle">
      
      {/* Mini Tag */}
      <div className="flex items-center gap-1.5 justify-center sm:justify-start mb-2">
        <span className="w-2 h-2 rounded-full bg-fresh-green" />
        <span className="text-[11px] font-mono tracking-wider text-sage font-extrabold uppercase">
          AI Optical Interface
        </span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-4 border-b border-light-gray-green/60">
        <div>
          <h2 className="font-display font-extrabold text-2xl tracking-tight text-charcoal">
            Fridge Vision Scan
          </h2>
          <p className="text-sm text-muted-gray mt-1">
            Choose a visual scenario, upload an image, or simulate a live capture to scan.
          </p>
        </div>

        {/* Console Tab Selector */}
        <div className="inline-flex bg-off-white p-1 rounded-xl self-start">
          <button 
            onClick={() => { setActiveTab("preset"); onResetScan(); }}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold tracking-tight transition-all cursor-pointer ${
              activeTab === "preset" ? "bg-white text-charcoal shadow-xs" : "text-muted-gray hover:text-charcoal"
            }`}
          >
            Presets
          </button>
          <button 
            onClick={() => { setActiveTab("upload"); onResetScan(); }}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold tracking-tight transition-all cursor-pointer ${
              activeTab === "upload" ? "bg-white text-charcoal shadow-xs" : "text-muted-gray hover:text-charcoal"
            }`}
          >
            Upload Photo
          </button>
          <button 
            onClick={() => { setActiveTab("camera"); onResetScan(); }}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold tracking-tight transition-all cursor-pointer ${
              activeTab === "camera" ? "bg-white text-charcoal shadow-xs" : "text-muted-gray hover:text-charcoal"
            }`}
          >
            Live Camera
          </button>
        </div>
      </div>

      {/* Main Console Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Visualizer Display Panel (Left Card) */}
        <div className="lg:col-span-7 flex flex-col">
          <div ref={viewportRef} className="relative aspect-4/3 rounded-2xl overflow-hidden bg-charcoal/95 border border-light-gray-green flex flex-col items-center justify-center select-none">
            
            {/* Viewport Rendering */}
            {activeTab === "preset" && (
              <div className="relative w-full h-full">
                <img 
                  src={selectedScene.url} 
                  alt={selectedScene.name} 
                  className="w-full h-full object-cover select-none"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}

            {activeTab === "upload" && (
              <div className="w-full h-full flex items-center justify-center">
                {uploadedImage ? (
                  <div className="relative w-full h-full">
                    <img src={uploadedImage} alt="User Upload" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                ) : (
                  <div 
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`w-full h-full border-4 border-dashed rounded-2xl m-4 flex flex-col items-center justify-center p-8 text-center transition-all cursor-pointer ${
                      dragActive ? "border-sage bg-sage/5 scale-[0.99]" : "border-light-gray-green/80 bg-off-white/40 hover:bg-off-white"
                    }`}
                  >
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileChange} 
                      className="hidden" 
                      accept="image/*" 
                    />
                    <div className="w-14 h-14 bg-mint flex items-center justify-center text-sage rounded-full mb-4">
                      <Upload className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-bold text-base text-charcoal">Drag and drop your fridge photo here</h3>
                    <p className="text-xs text-muted-gray max-w-xs mt-1">Supports high-res JPG, PNG, or camera output files directly</p>
                    <button className="mt-4 bg-sage text-white font-semibold text-xs px-4 py-2 rounded-lg cursor-pointer">
                      Browse Local Files
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === "camera" && (
              <div className="relative w-full h-full flex items-center justify-center">
                {cameraError ? (
                  <div className="p-6 text-center max-w-sm">
                    <AlertCircle className="w-10 h-10 text-warm-orange mx-auto mb-3" />
                    <p className="text-xs font-semibold text-white">{cameraError}</p>
                  </div>
                ) : capturedFrame ? (
                  <div className="relative w-full h-full">
                    <img src={capturedFrame} alt="Captured focus" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    
                    {/* Drag overlays under viewport container handle this dynamically */}
                  </div>
                ) : (
                  <div className="relative w-full h-full flex flex-col items-center justify-center">
                    <video 
                      ref={videoRef} 
                      autoPlay 
                      playsInline 
                      className="w-full h-full object-cover opacity-90"
                    />
                    
                    {/* Camera Control overlay button */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                      <button 
                        onClick={capturePhoto}
                        className="bg-fresh-green hover:bg-emerald-600 active:scale-95 text-white flex items-center gap-2 px-5 py-2.5 rounded-full shadow-lg border-2 border-white/65 text-xs font-bold cursor-pointer"
                      >
                        <Camera className="w-4 h-4" />
                        <span>Instant Capture Frame</span>
                      </button>
                      <button 
                        onClick={startCamera}
                        className="bg-charcoal/80 text-white rounded-full p-2.5 border border-white/30 cursor-pointer"
                        title="Restart stream"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Simulated Live Scan Overlay Bar (Laser Scan) */}
            {loading && (
              <div className="absolute inset-0 pointer-events-none flex flex-col justify-between">
                <div className="w-full h-2 bg-gradient-to-r from-sage/10 via-sage to-sage/10 scanner-ray animate-scan-line" />
                <div className="absolute inset-0 bg-charcoal/40 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-12 h-12 rounded-full border-4 border-sage border-t-transparent animate-spin mb-4" />
                  <p className="text-white font-display font-bold text-base tracking-wide animate-pulse">
                    {scanStatus}
                  </p>
                  
                  {/* Slim sleek progress meter */}
                  <div className="w-56 h-1.5 bg-white/20 rounded-full overflow-hidden mt-3 max-w-xs">
                    <div 
                      className="h-full bg-sage transition-all duration-300"
                      style={{ width: `${scanProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Unified Removable and Draggable Overlays */}
            {hasScanned && !loading && ingredients.map((ing) => (
              ing.x !== undefined && (
                <div
                  key={ing.id}
                  className={`absolute border-2 rounded-lg flex flex-col justify-between p-1 cursor-move group hover:bg-sage/20 transition-all select-none touch-none ${
                    ing.checked ? "border-sage bg-sage/5" : "border-muted-gray/30 bg-black/15"
                  }`}
                  style={{
                    left: `${ing.x}%`,
                    top: `${ing.y}%`,
                    width: `${ing.w ?? 22}%`,
                    height: `${ing.h ?? 20}%`,
                    touchAction: "none"
                  }}
                  onPointerDown={(e) => handlePointerDown(e, ing.id)}
                >
                  <div className="flex justify-between items-start gap-1 w-full pointer-events-auto">
                    <span className={`text-[9px] font-bold font-mono px-1 rounded uppercase truncate max-w-[70%] leading-normal ${
                      ing.checked ? "bg-sage text-white" : "bg-muted-gray/80 text-white/90"
                    }`}>
                      {ing.name}
                    </span>
                    <button
                      onPointerDown={(e) => {
                        e.stopPropagation();
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveIngredient(ing.id);
                      }}
                      className="w-4.5 h-4.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center text-[11px] font-bold cursor-pointer transition-colors shadow-sm ml-auto select-none"
                      title="Remove bounding box"
                    >
                      ×
                    </button>
                  </div>
                  
                  <span className="text-[10px] font-mono font-extrabold text-white self-start drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)] pointer-events-none select-none">
                    {ing.estimatedQty}{ing.unit}
                  </span>
                </div>
              )
            ))}

          </div>

          <div className="mt-4 flex flex-wrap gap-2 items-center justify-between">
            {activeTab === "preset" && (
              <p className="text-xs text-muted-gray italic">
                💡 Select and swap different fridge presets to explore mock scanning capabilities.
              </p>
            )}
            {activeTab === "upload" && uploadedImage && (
              <button 
                onClick={() => { setUploadedImage(null); onResetScan(); }}
                className="text-xs font-semibold text-rose-500 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" /> Remove current photo
              </button>
            )}
            {activeTab === "camera" && capturedFrame && (
              <button 
                onClick={() => { setCapturedFrame(null); onResetScan(); startCamera(); }}
                className="text-xs font-semibold text-sage hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Take a new capture
              </button>
            )}

            {/* Run Vision analysis CTA */}
            {(!hasScanned && !loading && (activeTab !== "upload" || uploadedImage) && (activeTab !== "camera" || capturedFrame)) && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={triggerAIScan}
                className="bg-sage text-white text-xs font-bold px-6 py-3 rounded-xl flex items-center gap-2 group cursor-pointer shadow-sm ml-auto"
              >
                <Play className="w-3.5 h-3.5 text-white" />
                <span>Trigger AI Ingredient Scan</span>
              </motion.button>
            )}
          </div>
        </div>

        {/* Preset list selector (Right Area of Grid) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          
          {activeTab === "preset" ? (
            <div className="space-y-4">
              <span className="text-xs font-bold font-mono text-muted-gray uppercase tracking-wider block">
                Select Healthy Scenario
              </span>

              <div className="space-y-3">
                {FRIDGE_SCENES.map((scene) => (
                  <button
                    key={scene.id}
                    onClick={() => {
                      setSelectedScene(scene);
                      onResetScan();
                    }}
                    className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex gap-4 ${
                      selectedScene.id === scene.id
                        ? "border-sage bg-mint/20 shadow-xs"
                        : "border-light-gray-green/60 bg-off-white/40 hover:bg-off-white"
                    }`}
                  >
                    <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-charcoal">
                      <img src={scene.url} alt={scene.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display font-extrabold text-sm text-charcoal">{scene.name}</span>
                        {selectedScene.id === scene.id && <Check className="w-3.5 h-3.5 text-sage" />}
                      </div>
                      <p className="text-xs font-mono text-sage font-medium mt-0.5">{scene.label}</p>
                      <p className="text-[11px] text-muted-gray leading-tight mt-1 line-clamp-1">{scene.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-mint/40 rounded-2xl p-5 border border-sage/20 space-y-4">
              <h4 className="font-display font-bold text-sm text-emerald-950 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-sage" /> Intelligent Neural Simulator
              </h4>
              <p className="text-xs text-muted-gray leading-relaxed">
                When you stream a custom photo from local folders, the engine detects standard nutrients:
              </p>
              
              <ul className="space-y-2 text-xs font-mono text-emerald-950">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage" />
                  <strong>Proteins</strong> (Chicken Breasts, Farm Eggs)
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-fresh-green" />
                  <strong>Micro greens</strong> (Organic Spinach)
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <strong>Dairy fats</strong> (Cheddar, Milk)
                </li>
              </ul>

              <div className="text-[11px] text-muted-gray italic bg-white/50 p-2.5 rounded-lg border border-light-gray-green/60">
                You can fully add, delete, and adjust weights and grams of detected components on the fly once analyzed to dynamically alter nutrition macros.
              </div>
            </div>
          )}

          {/* Trigger Scan Summary */}
          <div className="border-t border-light-gray-green/60 pt-6 mt-6">
            <div className="bg-charcoal text-white rounded-2xl p-5 space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-sage/10 rounded-full blur-xl pointer-events-none" />
              
              <p className="text-[10px] font-mono tracking-widest text-mint uppercase font-semibold">
                Nutriful Diagnostic Engine
              </p>
              <h4 className="text-sm font-display font-medium leading-relaxed">
                Empowered with advanced localized segmentation, our tool translates static pixels into high-fidelity nutrient targets.
              </h4>

              <div className="flex items-center gap-3 pt-1 text-[11px] font-mono text-white/80">
                <span>⏱ Ready to solve</span>
                <span>•</span>
                <span>🔥 Zero Waste</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
