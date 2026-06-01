import React from 'react';
import { 
  XOctagon, Clock, ShieldX, HardDrive, Cpu, Radio, Network, HelpCircle, ArrowRight, ShieldCheck, Zap
} from 'lucide-react';

export default function ProblemAndSolution() {
  return (
    <div className="space-y-24">
      
      {/* 1. SECCIÓN DEL PROBLEMA */}
      <section id="problema" className="relative">
        {/* Background ambient highlights */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-red-950/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content (Col 5) */}
            <div className="lg:col-span-5 space-y-4 lg:space-y-6">
              <span className="text-red-400 font-mono text-xs uppercase tracking-widest font-bold flex items-center gap-1.5">
                <XOctagon className="w-4 h-4" /> El Desafío de Altamar
              </span>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
                El mantenimiento preventivo ya no es suficiente.
              </h2>
              <p className="text-slate-350 text-base leading-relaxed">
                Cambiar piezas solo por horas de uso es costoso. Esperar a que una alarma suene en el panel significa que la falla ya ocurrió.
              </p>
              <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-red-500/80 text-sm text-slate-300 leading-relaxed font-sans">
                "En la marina mercante, un motor inoperativo no es solo pérdida económica catastrófica de miles de dólares por día, es un grave riesgo de seguridad para el buque y su tripulación en condiciones de tormenta."
              </div>
            </div>

            {/* Right Contrast Area (Col 7) */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Problem Card 1 */}
              <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-850 space-y-3">
                <div className="bg-red-500/10 p-2 rounded-lg text-red-400 w-fit">
                  <Clock className="w-5 h-5" />
                </div>
                <h4 className="font-display font-bold text-slate-100 text-base">
                  Reemplazos Prematuros
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Tirar repuestos caros basándose estrictamente en "horas de manual". Se desecha hasta un 35% de vida útil real debido a pautas ultra-conservadoras del fabricante.
                </p>
              </div>

              {/* Problem Card 2 */}
              <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-850 space-y-3">
                <div className="bg-red-500/10 p-2 rounded-lg text-red-400 w-fit">
                  <ShieldX className="w-5 h-5 animate-pulse" />
                </div>
                <h4 className="font-display font-bold text-slate-100 text-base">
                  Alarmas "Post Mortem"
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Los sensores tradicionales de cabina están programados con umbrales máximos toscos. Alertan solo cuando la temperatura o vibración es crítica, indicando una falla inminente o rotura física.
                </p>
              </div>

              {/* Problem Card 3 */}
              <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-850 space-y-3">
                <div className="bg-red-500/10 p-2 rounded-lg text-red-400 w-fit">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <h4 className="font-display font-bold text-slate-100 text-base">
                  La Caja Negra del Viaje
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Sin registros históricos en alta mar. Los inspectores y superintendentes en tierra solo ven el estado del motor cuando el buque llega a puerto, sin saber cómo se comportó en cruces críticos.
                </p>
              </div>

              {/* Contrast Quote banner */}
              <div className="bg-gradient-to-br from-indigo-950/20 to-slate-950 p-5 rounded-2xl border border-slate-850 flex flex-col justify-between">
                <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase block">Transición Clave</span>
                <p className="text-sm text-indigo-300 font-semibold italic mt-2 leading-relaxed">
                  "Necesitamos visibilidad sub-umbral en tiempo real."
                </p>
                <div className="flex items-center gap-1 text-xs text-slate-400 font-medium mt-4">
                  <span>Ver la solución Simarp</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 2. SECCIÓN DE LA SOLUCIÓN */}
      <section id="solucion" className="relative pt-6">
        {/* Subtle geometric grid background accent */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-cyan-400 font-mono text-xs uppercase tracking-[0.2em] font-bold px-3 py-1 bg-cyan-500/10 border border-cyan-500/25 rounded-sm">
              SISTEMA INTEGRAL DE MONITOREO
            </span>
            <h2 className="font-display text-3xl lg:text-5xl font-bold text-white tracking-tight">
              Inteligencia IA Conectada a tu Sala de Máquinas
            </h2>
            <p className="text-slate-450 text-sm leading-relaxed max-w-2xl mx-auto">
              Simarp fusiona hardware de grado marino con modelos predictivos avanzados para digitalizar y proteger la planta de fuerza de tu buque.
            </p>
          </div>

          {/* Solution Grid (3 columns) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Card 1: Extracción Edge */}
            <div className="bg-slate-900 border border-slate-800 p-6 lg:p-8 rounded-sm relative group hover:border-cyan-500/30 transition-colors duration-200">
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl" />
              <div className="bg-gradient-to-br from-cyan-950/40 to-slate-950 p-3.5 rounded-sm text-cyan-400 border border-slate-800 w-fit mb-6">
                <HardDrive className="w-6 h-6 text-cyan-400" />
              </div>
              
              <h3 className="font-display text-xl font-bold text-slate-100 flex items-center gap-2">
                Extracción Edge
              </h3>
              
              <p className="text-slate-400 text-sm mt-4 leading-relaxed">
                Nos conectamos al puerto <strong className="text-slate-200">CAN Bus / J1939</strong> mediante hardware industrial sellado IP67, leyendo frecuencia de inyección, presiones y acelerometría sin alterar la electrónica ni la garantía del buque.
              </p>

              <div className="mt-6 pt-4 border-t border-slate-950 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                <span>Protocolo: J1939 & Modbus</span>
                <span className="text-cyan-400 font-bold uppercase tracking-wider">Plug & Play</span>
              </div>
            </div>

            {/* Card 2: Transmisión Segura */}
            <div className="bg-slate-900 border border-slate-800 p-6 lg:p-8 rounded-sm relative group hover:border-cyan-500/30 transition-colors duration-200">
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl" />
              <div className="bg-gradient-to-br from-cyan-950/40 to-slate-950 p-3.5 rounded-sm text-cyan-400 border border-slate-800 w-fit mb-6">
                <Radio className="w-6 h-6 text-cyan-400" />
              </div>
              
              <h3 className="font-display text-xl font-bold text-slate-100 flex items-center gap-2">
                Transmisión Segura
              </h3>
              
              <p className="text-slate-400 text-sm mt-4 leading-relaxed">
                Sistema <strong className="text-slate-200">Store-and-Forward</strong> local de ultra-tolerancia. Si el buque pierde conexión satelital (FBB/VSAT) durante semanas, los datos se almacenan de forma local encriptada y se sincronizan al recuperar señal.
              </p>

              <div className="mt-6 pt-4 border-t border-slate-950 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                <span>Respaldo: Storage Encriptado</span>
                <span className="text-cyan-400 font-bold uppercase tracking-wider">Cero Pérdida</span>
              </div>
            </div>

            {/* Card 3: Análisis Predictivo */}
            <div className="bg-slate-900 border border-slate-800 p-6 lg:p-8 rounded-sm relative group hover:border-cyan-500/30 transition-colors duration-200">
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl" />
              <div className="bg-gradient-to-br from-cyan-950/40 to-slate-950 p-3.5 rounded-sm text-cyan-400 border border-slate-800 w-fit mb-6">
                <Cpu className="w-6 h-6 text-cyan-400" />
              </div>
              
              <h3 className="font-display text-xl font-bold text-slate-100 flex items-center gap-2">
                Análisis Predictivo
              </h3>
              
              <p className="text-slate-400 text-sm mt-4 leading-relaxed">
                Nuestros algoritmos analizan millones de datos correlacionados (presión, aceleraciones y calor de escape) para rastrear <strong className="text-slate-200">tendencias de degradación sub-umbral</strong>, proyectando fallas semanas antes de que ocurran.
              </p>

              <div className="mt-6 pt-4 border-t border-slate-950 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                <span>Core: Modelado Multivariable</span>
                <span className="text-cyan-400 font-bold uppercase tracking-wider">92.5% Certeza</span>
              </div>
            </div>

          </div>

          {/* Lower trust anchor banner */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-5 rounded-sm border border-slate-850 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <div className="flex gap-3 items-center text-left">
              <div className="bg-cyan-500/10 p-2 rounded-sm text-cyan-450 hidden sm:block">
                <Zap className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">Gemelo Digital en Tiempo Real</p>
                <p className="text-slate-400 text-xs font-sans">Monitoreamos el desgaste de cilindros, turbocompresores y cojinetes sin detener las máquinas.</p>
              </div>
            </div>
            <div className="flex gap-2 items-center text-xs text-slate-200 font-mono bg-slate-950 px-4 py-2 rounded-sm border border-slate-800">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span className="uppercase tracking-widest font-bold text-[10px]">RECOMENDADO POR MARINA MERCANTE</span>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
