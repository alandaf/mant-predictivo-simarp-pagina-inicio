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
      title: 'Monitores Online y Dashboard Web 24/7',
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
                Ingeniería Marítima de Alta Precisión
              </span>
            </div>

            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Ingeniería Informática aplicada al rigor del mar.
            </h2>

            <p className="text-slate-355 text-sm leading-relaxed">
              Desarrollamos soluciones enfocadas en modelar la física de la sala de máquinas. Analizamos las vibraciones, presiones y flujos térmicos para simular condiciones operativas reales y entrenar modelos de IA.
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
                  <p className="font-bold text-slate-100">Hardware Listo para Altamar</p>
                  <p className="text-slate-400">Emulamos la adquisición J1939 para demostraciones, pero nuestro dispositivo físico se conecta a la ECU del motor para capturar datos en vivo y permite integrar sensores de vibración si es requerido.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial / Credibility Stat Block (Col 5) */}
          <div className="lg:col-span-5 bg-slate-950/70 p-6 rounded-sm border border-slate-850 flex flex-col justify-between h-full space-y-6">
            <div className="space-y-4">
              <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold tracking-widest bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                Caso de Estudio Simulado
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-sans mt-2">
                En nuestro entorno de simulación, recreamos una anomalía térmica de inyector en el cilindro #8. Mientras el panel tradicional marca parámetros estables, el algoritmo predictivo detecta la anomalía de flujo y caída de RUL con 4 días de anticipación antes de la detención crítica del motor.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-900 flex justify-between items-center text-center">
              <div>
                <span className="block text-2xl font-mono font-extrabold text-white">92.5%</span>
                <span className="text-[9px] uppercase font-mono tracking-widest text-slate-500 block">Precisión Modelo</span>
              </div>
              <div className="border-r border-slate-900 h-8" />
              <div>
                <span className="block text-2xl font-mono font-extrabold text-cyan-400">J1939</span>
                <span className="text-[9px] uppercase font-mono tracking-widest text-slate-500 block">Estándar Emulación</span>
              </div>
              <div className="border-r border-slate-900 h-8" />
              <div>
                <span className="block text-2xl font-mono font-extrabold text-white">100%</span>
                <span className="text-[9px] uppercase font-mono tracking-widest text-slate-500 block">Datos Locales</span>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
