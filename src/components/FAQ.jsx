import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const questions = [
    {
      q: "Bagaimana cara kerja Algoritma KNN dalam aplikasi ini?",
      a: "Sistem membandingkan fitur warna apel yang diunggah dengan dataset yang sudah ada menggunakan perhitungan jarak Euclidean untuk menentukan klasifikasi terdekat."
    },
    {
      q: "Fitur warna apa saja yang diekstraksi dari citra apel?",
      a: "Sistem fokus pada ekstraksi nilai rata-rata RGB dan konversi ke ruang warna HSV untuk mendeteksi perubahan pigmen pada kulit apel yang rusak."
    },
    {
      q: "Mengapa menggunakan ruang warna HSV selain RGB?",
      a: "HSV lebih stabil terhadap perubahan intensitas cahaya, memudahkan sistem membedakan antara bayangan dan kerusakan nyata pada buah."
    },
    {
      q: "Berapa nilai K yang optimal untuk klasifikasi ini?",
      a: "Berdasarkan pengujian, nilai K=3 sering digunakan untuk menghindari noise namun tetap memberikan akurasi klasifikasi yang stabil."
    },
    {
      q: "Apakah sistem bisa mendeteksi jenis apel selain Apel Merah?",
      a: "Saat ini sistem dioptimalkan untuk varietas apel merah, namun dapat dikembangkan lebih lanjut dengan penambahan dataset varietas lain."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-[#E31E24] px-6 lg:px-24 overflow-hidden">
      <div className="container mx-auto max-w-5xl">
        
        {/* Header Minimalis */}
        <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl">
            <h2 className="text-[10px] font-black tracking-[0.5em] text-white/40 uppercase mb-6 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-white/20"></span>
              Support & Inquiries
            </h2>
            <h3 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-[0.9]">
              Common <br />
              <span className="text-white/20 italic font-serif">Questions.</span>
            </h3>
          </div>
          <p className="text-white/40 text-xs max-w-[200px] font-light leading-relaxed italic border-l border-white/10 pl-6">
            Informasi teknis mengenai sistem klasifikasi AppleScan berbasis KNN.
          </p>
        </div>

        {/* List Accordion Tipis */}
        <div className="border-t border-white/10">
          {questions.map((item, index) => (
            <div key={index} className="border-b border-white/10">
              <button 
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full py-10 flex items-center justify-between text-left group"
              >
                <span className="text-lg md:text-xl font-bold text-white tracking-tight group-hover:pl-4 transition-all duration-500">
                  {item.q}
                </span>
                <motion.div 
                  animate={{ rotate: activeIndex === index ? 45 : 0 }}
                  className="text-white/20 group-hover:text-white transition-colors"
                >
                  <Plus size={24} strokeWidth={1.5} />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-10 pl-0 md:pl-4 max-w-2xl">
                      <p className="text-white/60 text-sm leading-relaxed font-light italic">
                        {item.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQ;