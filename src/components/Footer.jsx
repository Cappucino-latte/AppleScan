import React from 'react';
import { Apple, Github, Instagram, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#E31E24] pt-20 pb-10 px-6 lg:px-24 overflow-hidden">
      {/* Efek Gradasi ke Hitam untuk Kedalaman */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />

      <div className="container mx-auto relative z-10">
        {/* Menggunakan grid yang adaptif untuk mobile (1 kolom) ke desktop (12 kolom) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 mb-16">
          
          {/* Kolom 1: Brand & Bio - Center di mobile, Left di desktop */}
          <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 mb-6 group cursor-pointer" onClick={scrollToTop}>
              <Apple className="text-white" size={28} fill="white" />
              <span className="text-white font-black text-2xl md:text-3xl tracking-tighter">
                APPLE<span className="opacity-40">SCAN</span>
              </span>
            </div>
            <p className="text-white/60 leading-relaxed max-w-sm mb-8 font-light italic text-xs md:text-sm">
              "Mengintegrasikan kecerdasan buatan untuk meningkatkan standar kualitas pangan melalui klasifikasi citra digital yang objektif."
            </p>
            <div className="flex gap-4">
              {[Instagram, Github, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-[#E31E24] transition-all duration-300">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Kolom 2: Navigasi - Sembunyi atau Center di mobile */}
          <div className="md:col-span-3 flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="text-white font-black text-[10px] uppercase tracking-[0.3em] mb-6 opacity-50">Navigation</h4>
            <ul className="space-y-3 text-white/50 text-xs md:text-sm font-bold">
              {['Home', 'About', 'Methodology', 'Benefits'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors block py-1">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3: Identitas Akademik - Center di mobile, Right di desktop */}
          <div className="md:col-span-4 flex flex-col items-center md:items-end text-center md:text-right border-t border-white/5 pt-10 md:pt-0 md:border-0">
            <h4 className="text-white font-black text-[10px] uppercase tracking-[0.3em] mb-6 opacity-50">Affiliation</h4>
            <p className="text-white/80 text-xs md:text-sm leading-relaxed mb-1 font-black uppercase tracking-wider">
              Informatics Department
            </p>
            <p className="text-white/40 text-[10px] tracking-[0.2em] uppercase mb-8">
              UNU Yogyakarta
            </p>
            <button 
              onClick={scrollToTop}
              className="hidden md:inline-flex items-center gap-3 text-white/40 hover:text-white transition-colors group"
            >
              <span className="text-[9px] font-black uppercase tracking-widest">Back to Top</span>
              <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white transition-all">
                <ArrowUp size={14} />
              </div>
            </button>
          </div>
        </div>

        {/* Garis Bawah & Copyright - Selalu Center */}
        <div className="pt-10 border-t border-white/10 flex flex-col items-center gap-6">
          <div className="text-[9px] font-black text-white/20 uppercase tracking-[0.5em] text-center leading-loose">
            © 2026 AppleScan Project <br className="md:hidden" /> 
            <span className="hidden md:inline mx-4">|</span> 
            All Rights Reserved
          </div>
          
          {/* Tombol Back to Top Mobile */}
          <button 
            onClick={scrollToTop}
            className="md:hidden flex flex-col items-center gap-2 text-white/30 hover:text-white transition-colors active:scale-90"
          >
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center">
              <ArrowUp size={16} />
            </div>
            <span className="text-[8px] font-black uppercase tracking-[0.3em]">Scroll Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;