import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Methodology from './components/Methodology';
import ClassificationTool from './components/ClassificationTool';
import Benefits from './components/Benefits'; // Duplikasi baris ini tadi sudah dihapus
import About from './components/About';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import { ShieldCheck } from 'lucide-react';

function App() {
  const [page, setPage] = useState('home');

  return (
    <main className="bg-white min-h-screen">
      <Navbar setPage={setPage} currentPage={page} />
      
      {page === 'home' ? (
        <div className="flex flex-col">
          <Hero setPage={setPage} />
          <About/>
          <FAQ/>
          <Features />
          <Methodology />
          <Benefits />

          {/* Section 5: CTA */}
          <section className="py-32 px-6 bg-[#E31E24] text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-[-50%] left-[-20%] w-[100%] aspect-square bg-white rounded-full blur-[150px]"></div>
            </div>
            <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-10 shadow-2xl">
                <ShieldCheck className="text-[#E31E24]" size={40} />
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter uppercase leading-[0.9]">
                Siap Untuk <br /> Mencoba?
              </h2>
              <p className="text-white/80 text-lg mb-12 max-w-xl italic font-light">
                "Pastikan kualitas buah apel Anda terjaga dengan akurasi teknologi AI terkini berbasis K-Nearest Neighbor."
              </p>
              <button 
                onClick={() => setPage('classify')}
                className="bg-white text-[#E31E24] px-12 py-6 rounded-full font-black uppercase tracking-[0.2em] hover:scale-110 transition-all shadow-2xl"
              >
                Cek Apel Sekarang
              </button>
            </div>
          </section>
        </div>
      ) : (
        <div className="pt-20 pb-20 bg-gray-50 min-h-screen">
          <div className="max-w-4xl mx-auto px-6 mb-8">
            <button 
              onClick={() => setPage('home')}
              className="text-gray-400 hover:text-[#E31E24] font-bold text-sm flex items-center gap-2 transition-colors group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span> Kembali ke Beranda
            </button>
          </div>
          <ClassificationTool />
        </div>
      )}
      
      <Footer />
    </main>
  );
}

export default App;