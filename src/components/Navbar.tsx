import React, { useState, useEffect } from 'react';
import { Ship, Menu, X, Shield, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onContactClick: () => void;
}

export default function Navbar({ onContactClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-900/55 shadow-lg shadow-slate-950/20 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center space-x-2.5 cursor-pointer group"
          >
            <div className="bg-cyan-500 h-9 w-9 rounded flex items-center justify-center font-bold text-slate-950 group-hover:scale-105 transition-all duration-200">
              <Ship className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <span className="font-display text-xl font-bold tracking-tighter text-white group-hover:text-cyan-400 transition-colors duration-200 uppercase italic">
                SIMARP <span className="text-cyan-500 font-sans not-italic">LIMITADA</span>
              </span>
              <span className="block text-[9px] uppercase tracking-[0.2em] text-slate-400 font-mono -mt-1 font-bold">
                MANTENIMIENTO PREDICTIVO
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('problema')}
              className="text-slate-350 hover:text-cyan-400 transition-colors duration-150 text-xs font-bold uppercase tracking-widest cursor-pointer"
            >
              El Problema
            </button>
            <button
              onClick={() => scrollToSection('solucion')}
              className="text-slate-350 hover:text-cyan-400 transition-colors duration-150 text-xs font-bold uppercase tracking-widest cursor-pointer"
            >
              La Solución
            </button>
            <button
              onClick={() => scrollToSection('calculadora')}
              className="text-slate-350 hover:text-cyan-400 transition-colors duration-150 text-xs font-bold uppercase tracking-widest cursor-pointer"
            >
              Calculadora ROI
            </button>
            <button
              onClick={() => scrollToSection('beneficios')}
              className="text-slate-350 hover:text-cyan-400 transition-colors duration-150 text-xs font-bold uppercase tracking-widest cursor-pointer"
            >
              Beneficios
            </button>
            <button
              onClick={() => scrollToSection('valores')}
              className="text-slate-200 hover:text-cyan-400 transition-colors duration-150 text-xs font-bold uppercase tracking-widest cursor-pointer flex items-center gap-1.5"
            >
              <Shield className="w-4 h-4 text-cyan-400" />
              Soporte 10+ Años
            </button>
          </div>

          {/* CTA & Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={onContactClick}
              className="bg-cyan-600 hover:bg-cyan-500 text-slate-950 px-5 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150"
            >
              Solicitar Demo Gratuita
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-white focus:outline-none p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-slate-950 border-b border-slate-900 px-4 pt-2 pb-6 space-y-3"
          >
            <button
              onClick={() => scrollToSection('problema')}
              className="block w-full text-left px-3 py-2.5 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-900"
            >
              El Problema
            </button>
            <button
              onClick={() => scrollToSection('solucion')}
              className="block w-full text-left px-3 py-2.5 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-900"
            >
              La Solución
            </button>
            <button
              onClick={() => scrollToSection('calculadora')}
              className="block w-full text-left px-3 py-2.5 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-900"
            >
              Calculadora ROI
            </button>
            <button
              onClick={() => scrollToSection('beneficios')}
              className="block w-full text-left px-3 py-2.5 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-900"
            >
              Beneficios
            </button>
            <button
              onClick={() => scrollToSection('valores')}
              className="block w-full text-left px-3 py-2.5 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-900"
            >
              Soporte Marítimo
            </button>
            <div className="pt-4 border-t border-slate-900">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onContactClick();
                }}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-4 py-3 rounded-lg text-center font-bold shadow-md shadow-emerald-950/20 block cursor-pointer transition-colors duration-150"
              >
                Solicitar una Demo Gratuita
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
