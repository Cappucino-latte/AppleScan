import React from 'react';
import { Camera, Zap, BarChart3, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const Features = () => {
  const leftFeatures = [
    { 
      icon: <Zap className="w-5 h-5 md:w-7 md:h-7" />, 
      title: "Real-time", 
      desc: "Klasifikasi instan dalam hitungan detik.",
      align: "text-right",
      itemAlign: "items-end"
    },
    { 
      icon: <Camera className="w-5 h-5 md:w-7 md:h-7" />, 
      title: "Extraction", 
      desc: "Akurasi tinggi membaca fitur RGB.",
      align: "text-right",
      itemAlign: "items-end"
    }
  ];

  const rightFeatures = [
    { 
      icon: <BarChart3 className="w-5 h-5 md:w-7 md:h-7" />, 
      title: "Analytics", 
      desc: "Implementasi KNN untuk hasil presisi.",
      align: "text-left",
      itemAlign: "items-start"
    },
    { 
      icon: <ShieldCheck className="w-5 h-5 md:w-7 md:h-7" />, 
      title: "Quality", 
      desc: "Menjaga standar kualitas industri.",
      align: "text-left",
      itemAlign: "items-start"
    }
  ];

  return (
    <section id="features" className="py-20 md:py-32 px-4 md:px-6 bg-white overflow-hidden relative">
      {/* Background Decorative Text */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 opacity-[0.03] select-none pointer-events-none hidden md:block">
        <h2 className="text-[15vw] font-black leading-none uppercase tracking-tighter">AppleScan</h2>
      </div>

      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-20 relative z-10">
          <h2 className="text-[10px] font-black tracking-[0.5em] text-[#E31E24] uppercase mb-4">Core Feature</h2>
          <h3 className="text-3xl md:text-6xl font-black text-gray-900 tracking-tighter leading-tight">
            Advanced <span className="text-[#E31E24]">Capabilities</span>
          </h3>
        </div>

        {/* Layout Grid: Memaksa 3 kolom di semua ukuran layar */}
        <div className="grid grid-cols-3 gap-2 md:gap-12 items-center relative z-10">
          
          {/* SISI KIRI */}
          <div className="space-y-12 md:space-y-20">
            {leftFeatures.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className={`flex flex-col ${item.itemAlign} ${item.align}`}
              >
                <div className="w-10 h-10 md:w-16 md:h-16 bg-[#E31E24] text-white rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-6 shadow-lg shadow-red-100 transform -rotate-6">
                  {item.icon}
                </div>
                <h4 className="text-[10px] md:text-2xl font-black text-gray-900 mb-1 md:mb-3 uppercase tracking-tighter italic leading-none">{item.title}</h4>
                <p className="text-[8px] md:text-sm text-gray-400 leading-tight md:leading-relaxed max-w-[80px] md:max-w-[280px]">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* SISI TENGAH: APEL UTAMA */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative flex justify-center"
          >
            {/* Glow & Ring Decor */}
            <div className="absolute inset-0 bg-[#E31E24]/10 rounded-full blur-[40px] md:blur-[100px] scale-110 md:scale-75" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-dashed border-[#E31E24]/20 rounded-full animate-spin-slow" />
            
            <motion.img 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              src="https://pngimg.com/uploads/apple/apple_PNG12439.png" 
              className="relative w-full drop-shadow-[0_20px_30px_rgba(227,30,36,0.3)] md:drop-shadow-[0_50px_80px_rgba(227,30,36,0.4)] z-10" 
              alt="Central Focus" 
            />
          </motion.div>

          {/* SISI KANAN */}
          <div className="space-y-12 md:space-y-20">
            {rightFeatures.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className={`flex flex-col ${item.itemAlign} ${item.align}`}
              >
                <div className="w-10 h-10 md:w-16 md:h-16 bg-[#E31E24] text-white rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-6 shadow-lg shadow-red-100 transform rotate-6">
                  {item.icon}
                </div>
                <h4 className="text-[10px] md:text-2xl font-black text-gray-900 mb-1 md:mb-3 uppercase tracking-tighter italic leading-none">{item.title}</h4>
                <p className="text-[8px] md:text-sm text-gray-400 leading-tight md:leading-relaxed max-w-[80px] md:max-w-[280px]">{item.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Features;