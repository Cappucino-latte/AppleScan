import React from 'react';
import { ArrowRight, Sparkles, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    /* Penambahan pt-24 (padding top) untuk memberi ruang bagi Navbar di mobile */
    <section id="home" className="relative min-h-screen w-full bg-[#E31E24] flex items-center overflow-hidden px-6 lg:px-24 pt-24 lg:pt-0">
      
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      <div className="absolute top-[-15%] left-[-5%] w-[55vw] h-[55vw] bg-white/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto z-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* SISI KIRI: Typography & CTA */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 text-left order-2 lg:order-1"
          >
            <div className="mb-6 lg:mb-10">
              {/* Label Teknis Smart Detection */}
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md px-4 py-1.5 rounded-full mb-6">
                <Sparkles size={11} className="text-white animate-pulse" />
                <h2 className="text-[9px] font-black tracking-[0.3em] uppercase text-white leading-none">
                  Smart Detection
                </h2>
              </div>
              
              {/* Penyesuaian ukuran teks mobile agar tidak terlalu rapat */}
              <h1 className="text-5xl sm:text-8xl lg:text-[8.5rem] font-black text-white tracking-tighter leading-[0.9] lg:leading-[0.8] relative">
                Apple<span className="text-white/20 italic font-serif">Scan</span>
              </h1>
            </div>

            {/* Description */}
            <div className="max-w-xl border-l-2 border-white/20 pl-6 lg:pl-8 mb-10 lg:mb-16">
              <p className="text-base md:text-xl text-white/70 font-light leading-relaxed italic">
                Sistem klasifikasi kerusakan buah berbasis <span className="text-white font-bold italic">K-Nearest Neighbor</span> yang mengoptimalkan akurasi sortasi digital.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-6 lg:gap-8">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-4 bg-white text-[#E31E24] px-10 py-4 lg:px-12 lg:py-5 rounded-full font-black text-[10px] lg:text-xs uppercase tracking-widest transition-all shadow-2xl"
              >
                Mulai Klasifikasi <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button 
                onClick={scrollToAbout}
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 text-white/50 hover:text-white transition-all text-[10px] lg:text-xs font-black uppercase tracking-widest group"
              >
                <Navigation size={16} fill="currentColor" className="rotate-90 opacity-40 group-hover:opacity-100" />
                Eksplorasi Fitur
              </motion.button>
            </div>
          </motion.div>

          {/* SISI KANAN: Visual Apple Group */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-5 relative flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/5 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="relative group scale-90 lg:scale-100">
              <motion.img 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                src="https://pngimg.com/uploads/apple/apple_PNG12439.png" 
                alt="Main Apple" 
                className="w-full max-w-[300px] lg:max-w-[420px] drop-shadow-[0_50px_80px_rgba(0,0,0,0.5)] z-30 relative"
              />
              <img 
                src="https://pngimg.com/uploads/apple/apple_PNG12439.png" 
                className="absolute -top-6 -left-10 w-24 h-24 lg:w-32 lg:h-32 opacity-30 blur-[2px] -rotate-12 pointer-events-none z-10 group-hover:scale-110 transition-transform duration-700"
                alt="deco"
              />
              <img 
                src="https://pngimg.com/uploads/apple/apple_PNG12439.png" 
                className="absolute bottom-5 -right-5 w-20 h-20 lg:w-28 lg:h-28 opacity-20 blur-[4px] rotate-45 pointer-events-none z-10 group-hover:scale-110 transition-transform duration-700"
                alt="deco"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;