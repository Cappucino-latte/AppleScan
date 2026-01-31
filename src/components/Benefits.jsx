import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Brain, Shield, Zap } from 'lucide-react';

const Benefits = () => {
  const benefitsData = [
    {
      icon: <Heart className="text-red-500" size={16} />,
      title: "Jantung",
      desc: "Serat larut bantu kolesterol.",
      // Koordinat responsif (Mobile: % | Desktop: % )
      pos: "top-[5%] left-[5%] lg:top-0 lg:left-0"
    },
    {
      icon: <Brain className="text-blue-500" size={16} />,
      title: "Otak",
      desc: "Proteksi sel oksidatif.",
      pos: "top-[5%] right-[5%] lg:top-0 lg:right-0"
    },
    {
      icon: <Shield className="text-green-500" size={16} />,
      title: "Imun",
      desc: "Vitamin C perkuat imun.",
      pos: "bottom-[5%] left-[5%] lg:bottom-0 lg:left-0"
    },
    {
      icon: <Zap className="text-yellow-500" size={16} />,
      title: "Energi",
      desc: "Gula alami dorong energi.",
      pos: "bottom-[5%] right-[5%] lg:bottom-0 lg:right-0"
    }
  ];

  return (
    <section id="benefits" className="py-20 lg:py-32 bg-gray-50 px-4 lg:px-24 overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* SISI KIRI: KONTEN TEKS EDITORIAL */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[10px] font-black tracking-[0.5em] text-[#E31E24] uppercase mb-6 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-[#E31E24]"></span>
              Apple's Value
            </h2>
            <h3 className="text-4xl md:text-7xl font-black text-gray-900 tracking-tighter leading-[0.9] mb-8">
              Mengapa <br />
              <span className="text-[#E31E24]">Apel</span> Sangat <br />
              Berharga?
            </h3>
            <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-sm italic mb-10">
              "Kualitas buah yang baik menentukan manfaat nutrisi yang maksimal bagi tubuh kita."
            </p>
            <button className="bg-[#E31E24] text-white px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-transform shadow-xl shadow-red-100">
              Pelajari Nutrisi
            </button>
          </motion.div>

          {/* SISI KANAN: VISUAL MELINGKAR (CENTRAL FOCUS) */}
          <div className="relative h-[450px] md:h-[600px] flex items-center justify-center mt-10 lg:mt-0">
            
            {/* Lingkaran Dekoratif di Belakang */}
            <div className="absolute w-[300px] h-[300px] md:w-[450px] md:h-[450px] border border-dashed border-[#E31E24]/20 rounded-full animate-spin-slow pointer-events-none" />
            <div className="absolute w-[200px] h-[200px] md:w-[350px] md:h-[350px] bg-[#E31E24]/5 rounded-full blur-3xl pointer-events-none" />

            {/* Gambar Apel Tengah */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 w-32 h-32 md:w-64 md:h-64"
            >
              <img 
                src="https://pngimg.com/uploads/apple/apple_PNG12439.png" 
                alt="Central Apple" 
                className="w-full h-full object-contain drop-shadow-[0_20px_30px_rgba(227,30,36,0.3)] md:drop-shadow-[0_35px_50px_rgba(227,30,36,0.3)]"
              />
            </motion.div>

            {/* Grid Manfaat Melingkar */}
            <div className="absolute inset-0 z-20">
              {benefitsData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`absolute p-3 md:p-6 bg-white/90 backdrop-blur-md rounded-[1.5rem] md:rounded-[2.5rem] border border-white shadow-xl max-w-[120px] md:max-w-[200px] group hover:bg-[#E31E24] transition-all duration-500 ${item.pos}`}
                >
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-lg md:rounded-xl shadow-sm flex items-center justify-center mb-2 md:mb-4 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h4 className="font-black text-gray-900 text-[10px] md:text-sm mb-1 md:mb-2 group-hover:text-white transition-colors leading-none">
                    {item.title}
                  </h4>
                  <p className="text-[7px] md:text-[10px] text-gray-400 leading-tight group-hover:text-white/70 transition-colors">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 25s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Benefits;