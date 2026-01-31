import React from 'react';
import { motion } from 'framer-motion';
import apelScan from '../assets/apel5.png'; 

const Methodology = () => {
  const steps = [
    { title: "Preprocessing", desc: "Pembersihan noise dan normalisasi." },
    { title: "Fitur Warna", desc: "Ekstraksi nilai rata-rata RGB." },
    { title: "Algoritma KNN", desc: "Komputasi jarak Euclidean." },
    { title: "Klasifikasi", desc: "Prediksi label Sehat/Busuk." }
  ];

  return (
    <section id="methodology" className="relative w-full bg-[#E31E24] overflow-hidden px-4 md:px-6 lg:px-24 py-20 md:py-32">
      
      {/* Ornamen Subtle Latar Belakang */}
      <div className="absolute top-[20%] right-[-10%] w-[35vw] h-[35vw] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto grid grid-cols-12 gap-4 md:gap-16 items-center relative z-20">
        
        {/* SISI KIRI: VISUALISASI SCAN (Mengambil 5 kolom dari 12) */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="col-span-5 lg:col-span-5 relative"
        >
          <div className="relative bg-white/5 backdrop-blur-md p-2 md:p-5 rounded-[1.5rem] md:rounded-[3rem] border border-white/10 shadow-2xl">
            <div className="relative overflow-hidden rounded-[1.2rem] md:rounded-[2.5rem] aspect-square w-full bg-black/20">
              <img 
                src={apelScan} 
                alt="Digital Sensing" 
                className="w-full h-full object-cover opacity-90 transition-transform duration-700"
              />
              {/* Efek Laser Scan Minimalis */}
              <motion.div 
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 w-full h-[1px] md:h-[2px] bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_10px_white] z-20"
              />
            </div>
          </div>
        </motion.div>

        {/* SISI KANAN: TEXT CONTENT (Mengambil 7 kolom dari 12) */}
        <div className="col-span-7 lg:col-span-7 text-white">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 md:mb-14"
          >
            <h2 className="text-[7px] md:text-[10px] font-black tracking-[0.3em] md:tracking-[0.5em] text-white/40 uppercase mb-2 md:mb-6 flex items-center gap-2 md:gap-4">
              <span className="w-4 md:w-8 h-[1px] bg-white/20"></span>
              Scientific Pipeline
            </h2>
            <h3 className="text-xl md:text-6xl font-black tracking-tighter leading-none md:leading-[0.9] mb-2 md:mb-6">
              Metodologi <br />
              <span className="text-white/30 italic font-serif">Workflow.</span>
            </h3>
            <p className="text-white/50 text-[8px] md:text-sm font-light max-w-md leading-tight md:leading-relaxed">
              Alur kerja sistematis untuk akurasi klasifikasi digital.
            </p>
          </motion.div>

          {/* Stepper Grid (Dibuat tetap 2 kolom di mobile) */}
          <div className="grid grid-cols-2 gap-2 md:gap-6">
            {steps.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-3 md:p-8 rounded-[1rem] md:rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
              >
                <div className="text-[8px] md:text-[10px] font-black text-[#E31E24] bg-white w-5 h-5 md:w-10 md:h-10 rounded-full flex items-center justify-center mb-2 md:mb-6">
                  0{index + 1}
                </div>
                <h4 className="text-[9px] md:text-xl font-bold mb-1 md:mb-3 tracking-tight leading-none">
                  {item.title}
                </h4>
                <p className="text-white/30 text-[7px] md:text-xs leading-tight font-light">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Methodology;