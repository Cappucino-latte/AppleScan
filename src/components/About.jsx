import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-32 bg-white px-6 lg:px-24 overflow-hidden relative">
      {/* Ornamen Latar Belakang Subtle */}
      <div className="absolute top-1/2 left-[-5%] w-[30vw] h-[30vw] bg-[#E31E24]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* SISI KIRI: Visual Editorial (Pindah ke Kiri) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 relative order-2 lg:order-1"
          >
            <div className="relative group">
              {/* Bingkai Asimetris Modern */}
              <div className="relative aspect-[4/5] rounded-t-[10rem] rounded-b-[2rem] overflow-hidden shadow-2xl transition-all duration-700 hover:shadow-red-100">
                <img 
                  src="https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?auto=format&fit=crop&q=80&w=1000" 
                  alt="High Quality Apple" 
                  className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 grayscale hover:grayscale-0"
                />
                {/* Overlay Gradasi Halus */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Teks Dekoratif Melayang */}
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-8 -right-8 bg-[#E31E24] p-8 rounded-[2rem] shadow-2xl z-20 hidden md:block"
              >
                <div className="text-[10px] font-black tracking-[0.4em] text-white/50 uppercase mb-2">Quality</div>
                <div className="text-2xl font-black text-white italic font-serif tracking-tighter">Certified.</div>
              </motion.div>
            </div>
          </motion.div>

          {/* SISI KANAN: Headline & Deskripsi */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-7 order-1 lg:order-2"
          >
            <h2 className="text-[10px] font-black tracking-[0.6em] text-[#E31E24] uppercase mb-8 flex items-center gap-4">
              Scientific Vision
              <span className="w-12 h-[1px] bg-[#E31E24]/30"></span> 
            </h2>
            
            <h3 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter leading-[0.9] mb-12">
              Beyond the <br /> 
              <span className="text-gray-200 italic font-serif">Surface Analysis.</span>
            </h3>

            <div className="space-y-8">
              <p className="text-xl md:text-3xl text-gray-400 font-light leading-snug">
                Kami mendefinisikan ulang akurasi klasifikasi buah melalui integrasi 
                <span className="text-gray-900 font-medium"> Digital Image Analysis</span> dan 
                metode <span className="text-[#E31E24] font-bold italic underline decoration-red-100 underline-offset-8">K-Nearest Neighbor</span> yang presisi.
              </p>
              
              <p className="text-sm text-gray-500 leading-relaxed max-w-xl font-light">
                Penelitian ini berfokus pada deteksi kerusakan fisik apel secara non-invasif, 
                memungkinkan identifikasi dini tanpa merusak struktur buah asli.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;