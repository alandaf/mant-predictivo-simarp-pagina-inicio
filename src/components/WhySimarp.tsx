import React from 'react';
import { 
  ShieldCheck, Cpu, Radio, Zap, Globe, Ship, CheckCircle2, XCircle, ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';

const comparisons = [
  {
    feature: 'Protocolo nativo',
    simarp: 'SAE J1939 CAN-Bus — lee 50+ PGNs directo de la ECU del motor',
    generic: 'Solo acelerómetros de vibración genéricos',
    simarpIcon: Radio,
    genericIcon: Cpu,
  },
  {
    feature: 'Enfoque de industria',
    simarp: 'Exclusivamente marítimo (remolcadores ASD, buques mercantes)',
    generic: 'Industrial genérico (fábricas, minería, cemento)',
    simarpIcon: Ship,
    genericIcon: Globe,
  },
  {
    feature: 'Modelado',
    simarp: 'Física del motor + IA (RUL, regresiones lubricante, anomalías inyectores)',
    generic: 'Caja negra ML sobre datos de vibración',
    simarpIcon: Zap,
    genericIcon: Cpu,
  },
  {
    feature: 'Prueba sin riesgo',
    simarp: '30 días con nodo de prueba en tu buque bandera antes de comprar',
    generic: 'Demo software sin conexión a tu equipo real',
    simarpIcon: ShieldCheck,
    genericIcon: Globe,
  },
  {
    feature: 'Alertas',
    simarp: 'WhatsApp + Email + Dashboard 24/7',
    generic: 'Solo email o portal web',
    simarpIcon: Zap,
    genericIcon: Globe,
  },
  {
    feature: 'Hardware',
    simarp: 'IP67 Certified — diseñado para sala de máquinas',
    generic: 'Sensores industriales estándar sin certificación marina',
    simarpIcon: ShieldCheck,
    genericIcon: Cpu,
  },
];

export default function WhySimarp() {
  return (
    <section id="por-que-simarp" className="bg-slate-950 py-16 border-t border-slate-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-950/30 border border-cyan-800/30 rounded-sm text-cyan-400 text-xs font-mono font-bold uppercase tracking-[0.15em]">
            <Zap className="w-3.5 h-3.5" /> Diferenciación Clave
          </span>
          <h2 className="font-display text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
            ¿Por qué Simarp y no una solución genérica?
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Las soluciones de mantenimiento predictivo industrial no están diseñadas para salas de máquinas. 
            Simarp está construido desde cero para protocolos marinos, condiciones de altamar y motores de propulsión.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="max-w-5xl mx-auto space-y-3">
          {/* Header row */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2">
            <div className="col-span-3" />
            <div className="col-span-4 flex items-center gap-2 text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              Simarp
            </div>
            <div className="col-span-4 flex items-center gap-2 text-[11px] font-mono text-slate-500 font-bold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-slate-600" />
              Soluciones Genéricas
            </div>
          </div>

          {comparisons.map((item, index) => {
            const SimarpIcon = item.simarpIcon;
            const GenericIcon = item.genericIcon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 p-4 rounded-sm bg-slate-900/30 border border-slate-800/50 hover:border-cyan-900/30 transition-colors duration-200"
              >
                {/* Feature name */}
                <div className="md:col-span-3 flex items-center">
                  <span className="text-xs font-bold text-slate-200 font-display uppercase tracking-wider">
                    {item.feature}
                  </span>
                </div>

                {/* Simarp */}
                <div className="md:col-span-4 flex items-start gap-2.5 bg-cyan-950/20 p-2.5 rounded-sm border border-cyan-900/20">
                  <SimarpIcon className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                  <span className="text-[12px] text-slate-300 leading-relaxed">
                    {item.simarp}
                  </span>
                </div>

                {/* Generic */}
                <div className="md:col-span-4 flex items-start gap-2.5 bg-slate-950/40 p-2.5 rounded-sm border border-slate-800/30">
                  <XCircle className="w-4 h-4 text-slate-600 mt-0.5 shrink-0" />
                  <span className="text-[12px] text-slate-500 leading-relaxed">
                    {item.generic}
                  </span>
                </div>

                {/* Mobile-only divider */}
                <div className="md:hidden col-span-1 border-t border-slate-800/30 my-1" />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-slate-950 px-8 py-4 rounded-sm font-bold tracking-widest text-xs uppercase transition-all duration-150"
          >
            <span>Solicitar una reunión técnica</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
