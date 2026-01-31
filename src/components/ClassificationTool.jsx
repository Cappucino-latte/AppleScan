import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, Scan, PieChart, Database, 
  CheckCircle2, AlertTriangle, RefreshCw, 
  Info, BarChart3, Binary, Camera, X, CameraIcon
} from 'lucide-react';

const ClassificationTool = () => {
  // --- STATE MANAGEMENT ---
  const [image, setImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [features, setFeatures] = useState({ r: 0, g: 0, b: 0, h: 0, s: 0, v: 0 });
  const [knnResults, setKnnResults] = useState(null);
  const [logs, setLogs] = useState([]);
  
  const canvasRef = useRef(null);
  const videoRef = useRef(null);

  // --- MOCK DATASET ---
  const appleDataset = [
    { id: 1, label: 'Sehat', r: 210, g: 45, b: 50, h: 358, s: 78, v: 82 },
    { id: 2, label: 'Sehat', r: 195, g: 30, b: 40, h: 356, s: 85, v: 76 },
    { id: 3, label: 'Busuk', r: 110, g: 70, b: 45, h: 23, s: 59, v: 43 },
    { id: 4, label: 'Busuk', r: 95, g: 60, b: 35, h: 25, s: 63, v: 37 },
    { id: 5, label: 'Sehat', r: 220, g: 60, b: 70, h: 356, s: 73, v: 86 },
  ];

  // --- LOGIC: CAMERA ACCESS ---
  const startCamera = async () => {
    setIsCameraActive(true);
    setImage(null);
    setLogs(prev => ["Mengakses kamera...", ...prev]);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      setLogs(prev => ["Gagal akses kamera: " + err.message, ...prev]);
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      setIsCameraActive(false);
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL('image/png');
    setImage(dataUrl);
    processImage(dataUrl);
    stopCamera();
  };

  // --- LOGIC: IMAGE PROCESSING ---
  const rgbToHsv = (r, g, b) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, v = max;
    const d = max - min;
    s = max === 0 ? 0 : d / max;
    if (max === min) {
      h = 0;
    } else {
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        default: break;
      }
      h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), v: Math.round(v * 100) };
  };

  const processImage = (imgSrc) => {
    setIsProcessing(true);
    setLogs(prev => ["Memulai ekstraksi fitur...", ...prev]);
    const img = new Image();
    img.src = imgSrc;
    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, 100, 100);
      const imageData = ctx.getImageData(0, 0, 100, 100).data;
      
      let r = 0, g = 0, b = 0;
      for (let i = 0; i < imageData.length; i += 4) {
        r += imageData[i]; g += imageData[i+1]; b += imageData[i+2];
      }
      
      const avgR = Math.round(r / 10000);
      const avgG = Math.round(g / 10000);
      const avgB = Math.round(b / 10000);
      const hsv = rgbToHsv(avgR, avgG, avgB);

      setFeatures({ r: avgR, g: avgG, b: avgB, ...hsv });
      setLogs(prev => ["Ekstraksi fitur warna selesai.", ...prev]);
      setIsProcessing(false);
      setCurrentStep(1);
    };
  };

  const runKNN = () => {
    setLogs(prev => ["Menghitung Euclidean Distance...", ...prev]);
    setIsProcessing(true);
    setTimeout(() => {
      const distances = appleDataset.map(data => {
        const dist = Math.sqrt(
          Math.pow(features.h - data.h, 2) + 
          Math.pow(features.s - data.s, 2) + 
          Math.pow(features.v - data.v, 2)
        );
        return { ...data, distance: dist.toFixed(2) };
      }).sort((a, b) => a.distance - b.distance);

      const kNearest = distances.slice(0, 3);
      const healthyCount = kNearest.filter(n => n.label === 'Sehat').length;
      
      setKnnResults({
        label: healthyCount >= 2 ? 'Sehat' : 'Busuk',
        neighbors: kNearest,
        accuracy: (healthyCount >= 2 ? (healthyCount/3)*100 : ((3-healthyCount)/3)*100).toFixed(1)
      });

      setLogs(prev => ["Hasil klasifikasi: " + (healthyCount >= 2 ? 'Sehat' : 'Busuk'), ...prev]);
      setIsProcessing(false);
      setCurrentStep(2);
    }, 1500);
  };

  return (
    <section id="classification-tool" className="py-24 bg-gray-50 px-6 lg:px-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="text-left">
             <h2 className="text-[10px] font-black tracking-[0.6em] text-[#E31E24] uppercase mb-4">Laboratory Engine</h2>
             <h3 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter leading-none italic">
               Apple <span className="text-[#E31E24]">Scan</span> Analyzer.
             </h3>
          </div>
          <p className="text-gray-400 text-xs max-w-[280px] font-light italic leading-relaxed">
            "Sistem deteksi otomatis menggunakan algoritma K-Nearest Neighbor untuk analisis kualitas pangan."
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: INPUT AREA */}
          <div className="lg:col-span-4 space-y-6">
            <div className={`relative min-h-[400px] rounded-[3rem] bg-white border border-gray-100 shadow-xl p-8 flex flex-col items-center justify-center overflow-hidden transition-all duration-500`}>
              
              {isCameraActive ? (
                <div className="relative w-full h-full rounded-3xl overflow-hidden bg-black">
                  <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                  <div className="absolute bottom-6 left-0 w-full flex justify-center gap-4">
                     <button onClick={capturePhoto} className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all">
                        <CameraIcon className="text-[#E31E24]" />
                     </button>
                     <button onClick={stopCamera} className="w-14 h-14 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                        <X />
                     </button>
                  </div>
                </div>
              ) : image ? (
                <div className="w-full h-full animate-in fade-in zoom-in duration-500">
                  <div className="relative aspect-square rounded-[2rem] overflow-hidden shadow-2xl mb-6">
                    <img src={image} className="w-full h-full object-cover" alt="Source" />
                    {isProcessing && (
                      <motion.div animate={{ top: ['0%', '100%', '0%'] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="absolute left-0 w-full h-1 bg-[#E31E24] shadow-[0_0_20px_red] z-20" />
                    )}
                  </div>
                  <div className="flex gap-4">
                     <button onClick={() => {setImage(null); setCurrentStep(0); setKnnResults(null);}} className="flex-1 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all">Reset</button>
                     <button onClick={startCamera} className="flex-1 py-4 text-[10px] font-black uppercase tracking-widest text-white bg-gray-900 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-gray-200"><Camera size={14}/> Kamera</button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center">
                  <div className="flex gap-6 mb-8">
                     <label className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center text-[#E31E24] cursor-pointer hover:bg-[#E31E24] hover:text-white transition-all duration-500 group">
                        <Upload size={24} className="group-hover:scale-110 transition-transform" />
                        <input type="file" className="hidden" onChange={(e) => {
                           const file = e.target.files[0];
                           if(file) {
                              const reader = new FileReader();
                              reader.onload = (ev) => { setImage(ev.target.result); processImage(ev.target.result); };
                              reader.readAsDataURL(file);
                           }
                        }} />
                     </label>
                     <button onClick={startCamera} className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-500 group">
                        <Camera size={24} className="group-hover:scale-110 transition-transform" />
                     </button>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300">Input Citra Apel</span>
                </div>
              )}
            </div>

            {/* System Logs Area */}
            <div className="bg-gray-900 rounded-[2.5rem] p-6 text-white shadow-2xl">
               <div className="flex items-center gap-3 mb-4 opacity-50">
                  <Binary size={14} className="text-[#E31E24]" />
                  <span className="text-[9px] font-black uppercase tracking-widest">Process Monitoring</span>
               </div>
               <div className="space-y-2 h-24 overflow-y-auto font-mono text-[10px] scrollbar-hide">
                  {logs.map((log, i) => (
                    <div key={i} className="flex gap-2 text-white/50"><span className="text-[#E31E24]">→</span> {log}</div>
                  ))}
               </div>
            </div>
          </div>

          {/* MIDDLE: FEATURES */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-[3rem] border border-gray-100 p-8 shadow-xl h-full flex flex-col">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-xl font-black italic tracking-tight">Feature <span className="text-[#E31E24]">Extraction.</span></h3>
                <BarChart3 size={20} className="text-gray-200" />
              </div>

              {currentStep >= 1 ? (
                <div className="space-y-8 flex-1 flex flex-col">
                  <div className="space-y-5">
                    <FeatureBar label="Red" value={features.r} color="bg-[#E31E24]" max={255} />
                    <FeatureBar label="Green" value={features.g} color="bg-green-500" max={255} />
                    <FeatureBar label="Blue" value={features.b} color="bg-blue-500" max={255} />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <HsvCard label="Hue" value={features.h} unit="°" />
                    <HsvCard label="Sat" value={features.s} unit="%" />
                    <HsvCard label="Val" value={features.v} unit="%" />
                  </div>
                  <div className="mt-auto pt-8">
                     <button onClick={runKNN} disabled={isProcessing} className="w-full bg-gray-900 text-white py-5 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.4em] hover:bg-[#E31E24] transition-all flex items-center justify-center gap-3 shadow-2xl shadow-gray-200">
                        {isProcessing ? <RefreshCw className="animate-spin" size={16} /> : <Scan size={16} />}
                        Run Classification
                     </button>
                  </div>
                </div>
              ) : (
                <EmptyState msg="Ekstraksi vektor warna otomatis akan muncul setelah input citra." />
              )}
            </div>
          </div>

          {/* RIGHT: RESULTS */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-[3rem] border border-gray-100 p-8 shadow-xl h-full flex flex-col overflow-hidden relative">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-xl font-black italic tracking-tight">Output <span className="text-[#E31E24]">Results.</span></h3>
                <Binary size={20} className="text-gray-200" />
              </div>

              {currentStep === 2 ? (
                <div className="space-y-8 flex-1 relative z-10">
                  <div className={`p-8 rounded-[3rem] border flex flex-col items-center justify-center text-center ${knnResults.label === 'Sehat' ? 'border-green-100 bg-green-50/50 text-green-700' : 'border-red-100 bg-red-50/50 text-[#E31E24]'}`}>
                    {knnResults.label === 'Sehat' ? <CheckCircle2 size={56} className="mb-4" /> : <AlertTriangle size={56} className="mb-4" />}
                    <div className="text-[9px] font-black uppercase tracking-[0.2em] opacity-50 mb-1">Classification Status</div>
                    <div className="text-5xl font-black tracking-tighter mb-4">{knnResults.label}</div>
                    <div className="text-[10px] font-bold px-4 py-2 bg-white rounded-full shadow-sm">Confidence: {knnResults.accuracy}%</div>
                  </div>

                  <div className="pt-4">
                    <div className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-300 mb-6">Euclidean Neighbors (K=3)</div>
                    <div className="space-y-3">
                      {knnResults.neighbors.map((n, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${n.label === 'Sehat' ? 'bg-green-500' : 'bg-[#E31E24]'}`} />
                            <span className="text-[11px] font-black uppercase text-gray-700">{n.label}</span>
                          </div>
                          <span className="text-[10px] font-mono text-gray-400">D={n.distance}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <EmptyState msg="Lakukan analisis KNN untuk melihat hasil identifikasi kualitas." />
              )}
              <div className="absolute bottom-[-5%] right-[-5%] opacity-[0.03] rotate-12 pointer-events-none"><Database size={240} /></div>
            </div>
          </div>
        </div>
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </section>
  );
};

// --- SUB-COMPONENTS ---
const FeatureBar = ({ label, value, color, max }) => (
  <div>
    <div className="flex justify-between text-[9px] font-black uppercase tracking-widest mb-2 text-gray-400">
      <span>{label}</span>
      <span className="text-gray-900">{value}</span>
    </div>
    <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100">
      <motion.div initial={{ width: 0 }} animate={{ width: `${(value/max)*100}%` }} className={`h-full ${color} shadow-lg`} />
    </div>
  </div>
);

const HsvCard = ({ label, value, unit }) => (
  <div className="bg-gray-50 p-4 rounded-3xl border border-gray-100 text-center flex flex-col gap-1">
    <div className="text-[8px] font-black uppercase tracking-widest text-gray-300">{label}</div>
    <div className="text-base font-black text-gray-900 tracking-tighter">{value}{unit}</div>
  </div>
);

const EmptyState = ({ msg }) => (
  <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-6"><Info className="text-gray-200" size={32} /></div>
    <p className="text-xs font-medium italic text-gray-300 leading-relaxed max-w-[180px]">{msg}</p>
  </div>
);

export default ClassificationTool;