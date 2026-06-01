import React from 'react';
import { 
  MessageSquare, LayoutGrid, Droplets, ArrowUpRight, Anchor, ShieldCheck, Cpu, HardDriveDownload
} from 'lucide-react';

interface BenefitsProps {
  onContactClick: () => void;
}

export default function Benefits({ onContactClick }: BenefitsProps) {
  const benefitsList = [
    {
      title: 'Alertas Tempranas Multicanal',
      description: 'Notificaciones instantáneas vía WhatsApp y Email para jefes de máquinas en altamar y superintendentes de mantenimiento en tierra, con diagnósticos claros y estimación de tiempo operacional seguro.',
      accent: 'WhatsApp & Email',
      icon: MessageSquare,
      color: 'text-cyan-450',
      bg: 'bg-cyan-500/15'
    },
    {
      title: 'Gemelo Digital y Dashboard Web 24/7',
      description: 'Acceso total en tiempo real desde cualquier dispositivo de escritorio o móvil a la telemetría de toda tu flota. Sigue las tendencias térmicas de cada cilindro e inspecciona informes históricos generados por IA.',
      accent: 'Vista Global de Flota',
      icon: LayoutGrid,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10'
    },
    {
      title: 'Optimización de Combustible y Emisiones',
      description: 'Control de la eficiencia térmica de la combustión. Pequeños desajustes en la inyección aumentan el consumo de combustible hasta un 3.5%; Simarp alinea la inyección previniendo sobregasto y emisión de hollín.',
      accent: 'Ahorro Diésel del 1.8%',
      icon: Droplets,
      color: 'text-cyan-350',
      bg: 'bg-cyan-500/10'
    }
  ];

  return (
    <div className="space-y-24">
      
      {/* 1. BENEFICIOS DETALLADOS */}
      <section id="beneficios" className="relative">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Header */}
          <div className="max-w-3xl">
            <span className="text-cyan-400 font-mono text-xs uppercase tracking-[0.2em] font-bold block mb-2">
              VENTAJAS OPERATIVAS Y FINANCIERAS
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
              Diseñado exclusivamente para el rigor y la complejidad de la navegación marítima.
            </h2>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {benefitsList.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div 
                  key={index} 
                  className="bg-slate-900 border border-slate-800 rounded-sm p-6 lg:p-8 flex flex-col justify-between group hover:border-cyan-500/30 transition-all duration-200"
                >
                  <div className="space-y-5">
                    {/* Icon & Label */}
                    <div className="flex justify-between items-center">
                      <div className={`${benefit.bg} ${benefit.color} p-3 rounded-sm border border-slate-850`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider bg-slate-950 px-2.5 py-1 rounded-sm border border-slate-900">
                        {benefit.accent}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-slate-100 mt-2">
                      {benefit.title}
                    </h3>
                    
                    <p className="text-slate-400 text-xs leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-950 flex items-center gap-1 text-slate-350 font-mono text-xs group-hover:text-cyan-400 transition-colors duration-150 cursor-pointer font-bold uppercase tracking-wider" onClick={onContactClick}>
                    <span>Ver Demo del Dashboard</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 2. CIERRE DE VALORES Y AUTORIDAD DE LA MARINA */}
      <section id="valores" className="relative bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 rounded-sm border border-slate-800 p-6 lg:p-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Text block (Col 7) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-cyan-500/15 p-1.5 rounded-sm text-cyan-400 border border-slate-800">
                <Anchor className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="text-cyan-400 font-mono text-xs font-bold uppercase tracking-[0.2em]">
                Ingeniería Naval de Alta Precisión
              </span>
            </div>

            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Ingeniería Informática aplicada al rigor del mar.
            </h2>

            <p className="text-slate-350 text-sm leading-relaxed">
              Más de 10 años integrando soluciones en la marina mercante. Entendemos cómo vibra un barco, cómo trabaja el personal a bordo, y hablamos el lenguaje de la sala de máquinas.
            </p>

            {/* Bullets cred details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
              <div className="flex gap-2.5 items-start font-sans">
                <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-100">Cero Interferencias</p>
                  <p className="text-slate-400">Canales aislados de telemetría de lectura que evitan cualquier alteración en controles del buque.</p>
                </div>
              </div>

              <div className="flex gap-2.5 items-start font-sans">
                <Cpu className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-100">Hardware Grado Militar</p>
                  <p className="text-slate-400">Cajas de adquisición de acero inoxidable marino, antivibración y resistentes a condensación salina.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial / Credibility Stat Block (Col 5) */}
          <div className="lg:col-span-5 bg-slate-950/70 p-6 rounded-sm border border-slate-850 flex flex-col justify-between h-full space-y-6">
            <blockquote className="space-y-4">
              <span className="text-[36px] font-serif text-slate-600 block leading-none">“</span>
              <p className="text-xs text-slate-300 italic leading-relaxed font-sans -mt-4">
                "Haber implementado el nodo Simarp en nuestros cargueros nos evitó una varada crítica de motor Caterpillar en el Pacífico medio. El panel nos marcaba temperaturas aceptables, pero el algoritmo predijo la anomalía térmica del inyector con 4 días de anticipación. Volvimos a puerto seguros."
              </p>
              <footer className="pt-2">
                <cite className="block text-xs font-bold text-slate-200 not-italic">
                  Ing. Mario Contreras G.
                </cite>
                <span className="text-[11px] text-slate-500 font-mono block">
                  Superintendente de Flota, Naviera del Pacífico SL.
                </span>
              </footer>
            </blockquote>

            <div className="pt-4 border-t border-slate-900 flex justify-between items-center text-center">
              <div>
                <span className="block text-2xl font-mono font-extrabold text-white">10+</span>
                <span className="text-[9px] uppercase font-mono tracking-widest text-slate-500 block">Años de Integración</span>
              </div>
              <div className="border-r border-slate-900 h-8" />
              <div>
                <span className="block text-2xl font-mono font-extrabold text-cyan-400">92%</span>
                <span className="text-[9px] uppercase font-mono tracking-widest text-slate-500 block">Precisión Alertas</span>
              </div>
              <div className="border-r border-slate-900 h-8" />
              <div>
                <span className="block text-2xl font-mono font-extrabold text-white">24/7</span>
                <span className="text-[9px] uppercase font-mono tracking-widest text-slate-500 block">Soporte Satelital</span>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
