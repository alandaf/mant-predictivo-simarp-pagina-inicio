import React from 'react';
import { 
  XOctagon, Clock, ShieldX, HardDrive, Cpu, Radio, HelpCircle, ArrowRight, ShieldCheck, Zap, Layers, Network
} from 'lucide-react';
import { motion } from 'motion/react';

export default function ProblemAndSolution() {
  return (
    <div className="space-y-28">
      
      {/* 1. SECCIÓN DEL PROBLEMA */}
      <section id="problema" className="relative">
        {/* Background ambient highlights */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-950/15 rounded-full blur-3xl pointer-events-none z-0" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-rose-950/10 rounded-full blur-3xl pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content (Col 5) */}
            <div className="lg:col-span-5 space-y-5 lg:space-y-7">
              <span className="text-rose-400 font-mono text-xs uppercase tracking-[0.15em] font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <XOctagon className="w-4 h-4 text-rose-400" /> El Desafío del Mantenimiento Marítimo
              </span>
              <h2 className="font-display text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                El mantenimiento preventivo ya no es suficiente.
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Cambiar piezas mecánicas basándose únicamente en horas de uso acumuladas es ineficiente y costoso. Por otro lado, esperar a que suene una alarma en la cabina significa que la falla catastrófica ya ocurrió.
              </p>
              <div className="p-4 bg-slate-900/40 rounded-lg border border-slate-800 border-l-4 border-l-rose-500/80 text-xs text-slate-300 leading-relaxed font-mono">
                "En remolcadores ASD y buques mercantes, un motor detenido en maniobra portuaria crítica no solo cuesta miles de dólares en multas por minuto: pone en riesgo la seguridad de la tripulación."
              </div>
            </div>

            {/* Right Contrast Area (Col 7) */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Problem Card 1 */}
              <motion.div 
                whileHover={{ y: -4 }}
                className="bg-slate-900/35 p-6 rounded-lg border border-slate-800 space-y-4 backdrop-blur-sm"
              >
                <div className="bg-rose-500/10 p-2.5 rounded-sm text-rose-400 w-fit border border-rose-500/20">
                  <Clock className="w-5 h-5" />
                </div>
                <h4 className="font-display font-bold text-slate-100 text-base">
                  Reemplazos Prematuros
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Desechar componentes marinos caros siguiendo rígidamente pautas fijas. Estudios demuestran que se desperdicia hasta un 35% de la vida útil real de cojinetes y camisas debido a sobre-mantenimiento.
                </p>
              </motion.div>

              {/* Problem Card 2 */}
              <motion.div 
                whileHover={{ y: -4 }}
                className="bg-slate-900/35 p-6 rounded-lg border border-slate-800 space-y-4 backdrop-blur-sm"
              >
                <div className="bg-rose-500/10 p-2.5 rounded-sm text-rose-400 w-fit border border-rose-500/20">
                  <ShieldX className="w-5 h-5" />
                </div>
                <h4 className="font-display font-bold text-slate-100 text-base">
                  Alarmas Tardías (Post Mortem)
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Los sensores J1939 de cabina alertan cuando los valores sobrepasan umbrales críticos de seguridad. Para entonces, el desgaste térmico o la pérdida de caudal de aceite ya causaron daño interno.
                </p>
              </motion.div>

              {/* Problem Card 3 */}
              <motion.div 
                whileHover={{ y: -4 }}
                className="bg-slate-900/35 p-6 rounded-lg border border-slate-800 space-y-4 backdrop-blur-sm"
              >
                <div className="bg-rose-500/10 p-2.5 rounded-sm text-rose-400 w-fit border border-rose-500/20">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <h4 className="font-display font-bold text-slate-100 text-base">
                  Pérdida de Historial en Viaje
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Operación a ciegas fuera de cobertura. Sin bitácoras digitales continuas de presión, vibración y NOx, los ingenieros marítimos en tierra solo detectan fallas acumuladas al atracar en puerto.
                </p>
              </motion.div>

              {/* Contrast Quote banner */}
              <a 
                href="#ecosistema"
                className="bg-gradient-to-br from-cyan-950/20 to-slate-950 p-6 rounded-lg border border-cyan-500/10 flex flex-col justify-between group hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-950/10 transition-all duration-300 cursor-pointer text-left block"
              >
                <div>
                  <span className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase block font-semibold">Nuestra Filosofía</span>
                  <p className="text-xs text-slate-300 font-semibold italic mt-3 leading-relaxed">
                    "El objetivo no es alarmar cuando el motor se detiene, sino modelar la degradación para programar la reparación en puerto seguro."
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-cyan-400 font-mono font-bold mt-5 group-hover:text-cyan-300 transition-colors">
                  <span>Conoce el Ecosistema Simarp</span>
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>

            </div>

          </div>
        </div>
      </section>

      {/* 2. SECCIÓN DE LA SOLUCIÓN */}
      <section id="solucion" className="relative pt-6">
        {/* Subtle geometric background accent */}
        <div className="absolute top-0 right-10 w-96 h-96 bg-cyan-600/5 rounded-full blur-3xl pointer-events-none z-0" />
        <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-indigo-950/10 rounded-full blur-3xl pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
          
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-cyan-400 font-mono text-[11px] uppercase tracking-[0.2em] font-bold px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-sm">
              ARQUITECTURA INTEGRAL DE DIAGNÓSTICO
            </span>
            <h2 className="font-display text-3xl lg:text-5xl font-extrabold text-white tracking-tight">
              Flujo de Telemetría: De la Sala de Máquinas a tu Pantalla
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed max-w-2xl mx-auto font-sans">
              Capturamos de forma no intrusiva los datos de la ECU y sensores de vibración, procesándolos mediante modelos de IA para centralizar el monitoreo operativo de tu flota en la nube.
            </p>
          </div>

          {/* Architecture Diagram */}
          <div className="relative py-4">
            {/* Connecting pipe background (desktop only) */}
            <div className="hidden lg:block absolute top-1/2 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-cyan-500/40 via-slate-600/40 to-emerald-500/40 -translate-y-1/2 z-0" />
            <div className="hidden lg:block absolute top-1/2 left-[33.3%] w-3 h-3 bg-cyan-400 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse z-30" />
            <div className="hidden lg:block absolute top-1/2 left-[66.6%] w-3 h-3 bg-emerald-400 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse z-30" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 relative z-20">
              {/* Node 1: Edge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-slate-900/60 border border-cyan-800/30 rounded-sm p-4 md:p-5 backdrop-blur-sm group hover:border-cyan-500/40 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-cyan-950/50 p-2 rounded-sm text-cyan-400 border border-cyan-800/30">
                    <Radio className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-widest block">EDGE — Nodo Simarp</span>
                    <span className="text-[9px] text-slate-500 font-mono">Adquisición No Intrusiva</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-300 font-mono">
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />ECU del Motor (J1939)</span>
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60" />CAN-Bus</span>
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60" />Sensores Vibración *</span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-800/50 text-[10px] text-slate-500 font-mono">
                  <span className="text-cyan-400 font-bold">+50 PGNs</span> monitoreados por nodo
                </div>
              </motion.div>

              {/* Arrow (mobile) - hidden on md+ since we use the line */}
              <div className="flex justify-center md:hidden">
                <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>

              {/* Node 2: IA Core */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="bg-slate-900/60 border border-orange-800/30 rounded-sm p-4 md:p-5 backdrop-blur-sm group hover:border-orange-500/40 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-orange-950/50 p-2 rounded-sm text-orange-400 border border-orange-800/30">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-orange-400 font-bold uppercase tracking-widest block">IA CORE — Streamlit</span>
                    <span className="text-[9px] text-slate-500 font-mono">Modelos Predictivos</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-300 font-mono">
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-orange-400" />RUL (Vida Útil Restante)</span>
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-orange-400/60" />Anomalías Inyectores</span>
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-orange-400/60" />Degradación Lubricante</span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-800/50 text-[10px] text-slate-500 font-mono">
                  <span className="text-orange-400 font-bold">90%</span> de fallas prevenidas
                </div>
              </motion.div>

              {/* Arrow (mobile) */}
              <div className="flex justify-center md:hidden">
                <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>

              {/* Node 3: Cloud */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="bg-slate-900/60 border border-emerald-800/30 rounded-sm p-4 md:p-5 backdrop-blur-sm group hover:border-emerald-500/40 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-emerald-950/50 p-2 rounded-sm text-emerald-400 border border-emerald-800/30">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest block">CLOUD — Grafana</span>
                    <span className="text-[9px] text-slate-500 font-mono">Monitoreo 24/7</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-300 font-mono">
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />Dashboards en Tiempo Real</span>
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400/60" />Alertas WhatsApp / Email</span>
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400/60" />Historial Auditoría</span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-800/50 text-[10px] text-slate-500 font-mono">
                  <span className="text-emerald-400 font-bold">-22%</span> costo de mantenimiento anual
                </div>
              </motion.div>
            </div>

            {/* Bottom legend */}
            <div className="mt-4 text-center">
              <span className="text-[9px] font-mono text-slate-600 tracking-widest uppercase">
                * Sensores de vibración integrables según requerimiento del cliente
              </span>
            </div>
          </div>

          {/* Pipeline Visual Flow (3 columns with directional indicators) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
            
            {/* Step 1: Telemetría Edge / Simulador J1939 */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="bg-slate-900/40 border border-slate-800 p-6 lg:p-8 rounded-lg relative backdrop-blur-md flex flex-col justify-between h-full group hover:border-cyan-500/30 transition-all duration-300"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="bg-gradient-to-br from-cyan-950 to-slate-950 p-3 rounded-sm text-cyan-400 border border-cyan-500/15">
                    <HardDrive className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono bg-cyan-950/40 text-cyan-400 px-2 py-0.5 rounded border border-cyan-900/30">PASO 01 - EDGE</span>
                </div>
                
                <h3 className="font-display text-lg font-bold text-white">
                  Captura de Datos J1939 (ASD)
                </h3>
                
                <p className="text-slate-400 text-xs mt-3 leading-relaxed font-sans">
                  Emulamos la telemetría CAN-Bus en este portal para demostraciones interactivas, pero nuestro dispositivo físico está diseñado para capturar los datos entregados por la ECU del motor. Adicionalmente, el sistema permite integrar sensores de vibración externos si así es requerido.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-950 text-[10.5px] font-mono text-slate-500 flex items-center justify-between">
                <span>Protocolo: CAN-Bus J1939</span>
                <span className="text-cyan-400 font-bold uppercase tracking-wide">Física del Motor</span>
              </div>
            </motion.div>

            {/* Step 2: Algoritmos de IA Predictiva (Streamlit) */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="bg-slate-900/40 border border-slate-800 p-6 lg:p-8 rounded-lg relative backdrop-blur-md flex flex-col justify-between h-full group hover:border-orange-500/30 transition-all duration-300"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="bg-gradient-to-br from-orange-950/40 to-slate-950 p-3 rounded-sm text-orange-400 border border-orange-500/15">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono bg-orange-950/40 text-orange-400 px-2 py-0.5 rounded border border-orange-900/30">PASO 02 - IA CORE</span>
                </div>
                
                <h3 className="font-display text-lg font-bold text-white">
                  Modelado Neuronal & RUL
                </h3>
                
                <p className="text-slate-400 text-xs mt-3 leading-relaxed font-sans">
                  Los datos se procesan mediante modelos predictivos en Streamlit. Evaluamos la Vida Útil Restante (RUL), las anomalías en inyectores (como la pérdida de compresión en el cilindro #8) y regresiones lineales de degradación del lubricante para anticipar saturaciones de filtros.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-950 text-[10.5px] font-mono text-slate-500 flex items-center justify-between">
                <span>Modelos: Regresión & RUL</span>
                <span className="text-orange-400 font-bold uppercase tracking-wide">Streamlit AI</span>
              </div>
            </motion.div>

            {/* Step 3: Monitoreo Online y Reportes (Grafana) */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="bg-slate-900/40 border border-slate-800 p-6 lg:p-8 rounded-lg relative backdrop-blur-md flex flex-col justify-between h-full group hover:border-emerald-500/30 transition-all duration-300"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="bg-gradient-to-br from-emerald-950/40 to-slate-950 p-3 rounded-sm text-emerald-400 border border-emerald-500/15">
                    <Layers className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono bg-emerald-950/40 text-emerald-400 px-2 py-0.5 rounded border border-emerald-900/30">PASO 03 - CLOUD</span>
                </div>
                
                <h3 className="font-display text-lg font-bold text-white">
                  Monitoreo Online en Grafana
                </h3>
                
                <p className="text-slate-400 text-xs mt-3 leading-relaxed font-sans">
                  Consolidación de métricas de flota en dashboards dinámicos. Visualización 3D del estado operativo del remolcador, reportes de eficiencia térmica e históricos de telemetría disponibles en la nube para auditores, armadores y superintendentes en tierra.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-950 text-[10.5px] font-mono text-slate-500 flex items-center justify-between">
                <span>Visualización: Grafana Cloud</span>
                <span className="text-emerald-400 font-bold uppercase tracking-wide">Monitoreo 3D</span>
              </div>
            </motion.div>

          </div>

          {/* Lower trust anchor banner */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 via-slate-900 to-slate-950 p-5 rounded-lg border border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <div className="flex gap-3 items-center text-left">
              <div className="bg-cyan-500/15 p-2 rounded-sm text-cyan-400 hidden sm:block border border-cyan-500/20">
                <Network className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">Integración de Extremo a Extremo</p>
                <p className="text-slate-400 text-xs font-sans">Desde el sensor físico CAN-Bus a bordo hasta los informes predictivos del comportamiento térmico.</p>
              </div>
            </div>
            <div className="flex gap-2 items-center text-xs text-slate-200 font-mono bg-slate-950 px-4 py-2 rounded-sm border border-slate-800">
              <ShieldCheck className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="uppercase tracking-widest font-bold text-[10px] text-cyan-400">TELEMETRÍA 100% AUDITABLE</span>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
