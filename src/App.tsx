import React, { useState } from 'react';
import { 
  Ship, Cpu, ShieldCheck, ChevronRight, Waves, Send, Anchor, Compass, PhoneCall, HelpCircle, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import TelemetrySimulator from './components/TelemetrySimulator';
import NavigationHub from './components/NavigationHub';
import ProblemAndSolution from './components/ProblemAndSolution';
import RoiCalculator from './components/RoiCalculator';
import Benefits from './components/Benefits';
import ContactForm from './components/ContactForm';

export default function App() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);

  const openDemoModal = () => setIsDemoModalOpen(true);
  const closeDemoModal = () => setIsDemoModalOpen(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 overflow-x-hidden relative">
      {/* Technical Grid Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.25] pointer-events-none z-0" />
      
      {/* Ambient Glowing Orbs */}
      <div className="absolute top-0 right-10 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[400px] left-10 w-[600px] h-[600px] bg-indigo-900/5 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Wave decor backgrounds */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-cyan-950/20 via-slate-950/5 to-transparent blur-3xl pointer-events-none" />

      {/* Navigation */}
      <Navbar onContactClick={openDemoModal} />

      {/* HERO SECTION */}
      <header className="relative pt-28 pb-12 lg:pt-36 lg:pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Content (Col 7) */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6 text-left"
            >
              {/* Product Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-950/30 border border-cyan-800/30 rounded-sm text-cyan-400 text-xs font-mono font-bold uppercase tracking-[0.15em]">
                <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-pulse" /> Monitoreo Predictivo J1939
              </div>

              {/* H1 Main Title */}
              <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-none">
                Anticípate a la Falla.{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-cyan-200 bg-clip-text text-transparent underline decoration-cyan-500/20 underline-offset-4">
                  Telemetría Avanzada
                </span>{' '}
                y Análisis del Motor con IA.
              </h1>
              {/* Subtitle */}
              <p className="text-slate-300 text-sm sm:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl font-sans">
                Portal de demostración y modelado predictivo para salas de máquinas. Simulamos la telemetría J1939 de motores <strong className="text-slate-100 font-semibold">principales y auxiliares</strong> para analizar anomalías operativas y proyectar fallas de forma proactiva. Actualmente operamos sobre un simulador, pero el sistema está diseñado y construido para conectarse a motores reales en operación.
              </p>

              {/* Actions CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  type="button"
                  onClick={openDemoModal}
                  className="bg-cyan-600 hover:bg-cyan-500 text-slate-950 px-8 py-4 rounded-sm font-bold tracking-widest text-xs uppercase hover:shadow-lg hover:shadow-cyan-950/20 active:scale-98 transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Solicitar Reunión</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                
                <a
                  href="#problema"
                  className="bg-slate-900/60 hover:bg-slate-800/80 text-white border border-slate-800 px-6 py-4 rounded-sm font-semibold tracking-wide text-center flex items-center justify-center gap-2 cursor-pointer transition-all duration-150 text-sm"
                >
                  <span>Ver Especificaciones Técnicas</span>
                  <ArrowRight className="w-4 h-4 text-slate-500" />
                </a>
              </div>

              {/* Enterprise logos / Trust factors */}
              <div className="pt-6 border-t border-slate-900/60 space-y-2.5">
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest block font-medium">
                  MODELADO CONTEXTUAL Y PROTOCOLOS DE PRUEBA:
                </span>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-display text-[12px] sm:text-[15px] font-bold text-slate-400">
                  <span className="hover:text-slate-200 transition-colors">MOTORES DE ALTA VELOCIDAD</span>
                  <span className="text-slate-800 hidden sm:inline">•</span>
                  <span className="hover:text-slate-200 transition-colors">MOTORES DE MEDIA VELOCIDAD</span>
                  <span className="text-slate-800 hidden sm:inline">•</span>
                  <span className="hover:text-slate-200 transition-colors">SAE J1939 CAN BUS</span>
                </div>
              </div>
            </motion.div>

            {/* Right Hero Interactive Block (Col 5) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-5 relative"
            >
              {/* Shield Badge Decor */}
              <div className="absolute -top-4 -left-4 bg-slate-900 border border-slate-800 p-3 rounded-sm shadow-lg z-20 flex items-center gap-1.5 hidden sm:flex">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                <div>
                  <span className="block text-[10px] font-mono text-slate-400 uppercase leading-none">Entorno de Pruebas</span>
                  <span className="block text-[11px] text-white font-bold leading-tight font-display mt-0.5">Simulación J1939 ASD</span>
                </div>
              </div>

              {/* Graphic illustration representative of tugboat and telemetry node */}
              <motion.div 
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative rounded-lg overflow-hidden border border-cyan-500/15 shadow-2xl shadow-cyan-950/30 bg-slate-900/40 backdrop-blur-md p-4 group"
              >
                <div className="absolute -inset-px bg-gradient-to-tr from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="absolute inset-px bg-gradient-to-br from-cyan-950/10 via-transparent to-slate-950/25 pointer-events-none" />
                <img 
                  src="/harbor_tugboat.png" 
                  alt="Remolcador de puerto operando" 
                  width={500}
                  height={256}
                  loading="lazy"
                  className="w-full h-64 object-cover rounded-sm grayscale brightness-90 relative z-10 border border-slate-800"
                />
                
                <div className="pt-4 relative z-10">
                  <p className="font-mono text-[10px] text-cyan-400 uppercase tracking-[0.12em] font-bold flex items-center gap-1">
                    <Waves className="w-3.5 h-3.5 text-cyan-400 animate-pulse" /> Telemetría Activa en Remolcador
                  </p>
                  <p className="text-white font-display text-sm font-semibold mt-1">
                    Nodo Simarp-Edge transmitiendo datos J1939 en tiempo real.
                  </p>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </header>

      {/* CORE SIMULATOR SECTION */}
      <section className="bg-slate-950 pb-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <NavigationHub onOpenSimulator={() => setIsSimulatorOpen(true)} />
        </div>
      </section>

      {/* PROBLEM & SOLUTION */}
      <section className="bg-slate-950 py-16 border-t border-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProblemAndSolution />
        </div>
      </section>

      {/* ROI CALCULATOR SECTION */}
      <section id="calculadora" className="bg-slate-950 py-16 border-t border-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RoiCalculator onContactClick={openDemoModal} />
        </div>
      </section>

      {/* BENEFITS & CRITICAL SUPPORT SECTION */}
      <section className="bg-slate-950 py-16 border-t border-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Benefits onContactClick={openDemoModal} />
        </div>
      </section>

      {/* BOTTOM CONTACT SECTION */}
      <section id="contacto" className="bg-gradient-to-b from-slate-950 to-slate-900 py-16 border-t border-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left text column (Col 5) */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-cyan-400 font-mono text-xs uppercase tracking-[0.2em] block font-bold">
                ESTUDIO DE FACTIBILIDAD RADAR
              </span>
              <h2 className="font-display text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Prueba el portal de simulación interactivo.
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Evaluamos conceptualmente los diagramas de flujo de datos y la viabilidad técnica para la creación del modelo digital de tu planta propulsora.
              </p>

              <div className="space-y-3.5 text-xs text-slate-300 font-mono">
                <div className="flex gap-2 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>Entorno digital interactivo y libre de riesgos operacionales</span>
                </div>
                <div className="flex gap-2 items-center text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>Modelado conceptual compatible con protocolos industriales marinos</span>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>Pruebas de factibilidad técnica y simulación de fallas en vivo</span>
                </div>
              </div>
            </div>

            {/* Form Column (Col 7) */}
            <div className="lg:col-span-7 bg-slate-950 rounded-sm p-6 lg:p-8 border border-slate-800 shadow-xl">
              <ContactForm />
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-8 border-b border-slate-900/70">
            
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-white p-1 rounded-full h-10 w-10 flex items-center justify-center shadow-lg">
                <img 
                  src="https://simarp.net/wp-content/uploads/2024/02/logo_unificado_grises_opt-72x74.png" 
                  alt="Simarp Logo" 
                  className="h-8 w-auto object-contain rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="font-display text-lg font-bold tracking-tight text-white block">
                  SIMARP LIMITADA
                </span>
                <span className="block text-[9px] uppercase tracking-[0.12em] text-slate-500 font-mono -mt-1 font-bold">
                  Mantenimiento Predictivo Inteligente
                </span>
              </div>
            </div>

            {/* Quick links */}
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs font-sans">
              <a href="#problema" className="hover:text-white transition-colors">El Problema</a>
              <a href="#solucion" className="hover:text-white transition-colors">La Solución</a>
              <a href="#calculadora" className="hover:text-white transition-colors">Calculadora ROI</a>
              <a href="#beneficios" className="hover:text-white transition-colors">Beneficios</a>
              <a href="#valores" className="hover:text-white transition-colors">Ingeniería Marítima</a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 text-[10px] sm:text-xs text-slate-500 font-mono text-center md:text-left">
            <div>
              &copy; {new Date().getFullYear()} Simarp Limitada. Todos los derechos reservados.
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center">
              <span>IP67 Certified Hardware</span>
              <span className="hidden sm:inline">•</span>
              <span>ventas@simarp.net</span>
            </div>
          </div>
        </div>
      </footer>

      {/* OVERLAY DEMO MODAL */}
      <AnimatePresence>
        {isDemoModalOpen && (
          <ContactForm isModal onClose={closeDemoModal} />
        )}
      </AnimatePresence>

      {/* OVERLAY SIMULATOR MODAL */}
      <AnimatePresence>
        {isSimulatorOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm overflow-y-auto p-4 sm:p-6 md:p-10 flex items-center justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-7xl bg-slate-900 border border-slate-800 rounded-sm shadow-2xl relative p-1 max-h-[95vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsSimulatorOpen(false)}
                className="absolute top-4 right-4 bg-slate-950 hover:bg-slate-800 border border-slate-850 hover:border-slate-800 text-slate-400 hover:text-white px-3 py-1.5 rounded-sm cursor-pointer z-50 font-mono text-[10px] font-bold uppercase transition-colors"
              >
                ✕ Cerrar Consola
              </button>
              <div className="p-4 sm:p-6 mt-4">
                <TelemetrySimulator />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
