import React, { useState, useEffect } from 'react';
import { Menu, X, Apple, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ setPage, currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Deteksi scroll untuk transisi gaya navbar secara dinamis
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Klasifikasi', id: 'classify' },
    { name: 'Metodologi', id: 'methodology' },
    { name: 'Manfaat', id: 'benefits' },
  ];

  const isDarkNav = scrolled || currentPage !== 'home';

  // Fungsi navigasi yang menggabungkan setPage dan scroll
  const navigate = (id) => {
    setIsOpen(false);
    
    // Logika fungsi awal: klasifikasi berpindah halaman, lainnya scroll
    if (id === 'classify') {
      setPage('classify');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setPage('home');
      // Delay kecil untuk memastikan DOM sudah render jika baru pindah dari 'classify'
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 px-4 md:px-12 lg:px-24 ${
        isDarkNav
          ? 'bg-white/90 backdrop-blur-xl shadow-sm border-b border-gray-100 py-3 md:py-4' 
          : 'bg-transparent py-5 md:py-8'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        
        {/* LOGO: Ukuran adaptif untuk menjaga ruang visual mobile */}
        <div 
          onClick={() => navigate('home')}
          className={`flex items-center gap-1.5 cursor-pointer font-black text-lg md:text-2xl tracking-tighter transition-all active:scale-95 ${
            isDarkNav ? 'text-[#E31E24]' : 'text-white'
          }`}
        >
          <Apple size={scrolled ? 20 : 24} className="transition-all" fill={isDarkNav ? "#E31E24" : "white"} />
          <span>APPLE<span className="opacity-40 font-light text-base md:text-xl">SCAN</span></span>
        </div>

        {/* DESKTOP MENU: Responsif pada breakpoint md */}
        <div className="hidden md:flex items-center gap-8 lg:gap-12">
          <div className="flex gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => navigate(link.id)}
                className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all relative group ${
                  isDarkNav ? 'text-gray-500 hover:text-[#E31E24]' : 'text-white/60 hover:text-white'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-[1px] transition-all group-hover:w-full ${
                  isDarkNav ? 'bg-[#E31E24]' : 'bg-white'
                }`} />
              </button>
            ))}
          </div>
          
          <button 
            onClick={() => navigate('classify')}
            className={`flex items-center gap-2 px-8 py-3 rounded-full font-black text-[11px] uppercase tracking-widest transition-all transform active:scale-95 ${
              isDarkNav
                ? 'bg-[#E31E24] text-white shadow-xl shadow-red-100 hover:bg-red-700'
                : 'bg-white text-[#E31E24] hover:bg-gray-100'
            }`}
          >
            Coba AI <ArrowUpRight size={14} />
          </button>
        </div>

        {/* MOBILE TOGGLE: Ukuran tombol yang nyaman ditekan jari */}
        <button 
          className={`md:hidden p-2.5 rounded-xl transition-all active:scale-90 ${
            isDarkNav ? 'text-[#E31E24] bg-red-50' : 'text-white bg-white/10 backdrop-blur-md'
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* MOBILE MENU: Animasi dropdown yang ringkas agar tetap responsif */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-2xl border-b border-gray-100 shadow-xl overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => navigate(link.id)}
                  className="text-left font-bold text-lg text-gray-900 tracking-tight hover:text-[#E31E24] transition-colors py-3 border-b border-gray-50 last:border-0"
                >
                  {link.name}
                </button>
              ))}
              <button 
                onClick={() => navigate('classify')}
                className="w-full bg-[#E31E24] text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-red-100 mt-4"
              >
                Mulai Deteksi Sekarang
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;