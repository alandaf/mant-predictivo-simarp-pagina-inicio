import { 
  Layers, Brain, Compass, ArrowUpRight, Activity 
} from 'lucide-react';
import { motion } from 'motion/react';

export default function NavigationHub() {
  const platforms = [
    {
      title: 'Simulador SmartProp ASD',
      subtitle: 'CONSOLA DE CONTROL INTERACTIVA',
      description: 'Interactúa con los mandos de propulsión azimutal J1939, regula la carga del remolcador e inyecta fallas simuladas (como fallas en cilindro #8) para entrenamiento y calibración marítima.',
      icon: Compass,
      color: 'text-emerald-400',
      borderColor: 'group-hover:border-emerald-500/30',
      glowColor: 'from-emerald-500/10 to-transparent',
      link: 'http://remolcadores.sytes.net:8000/',
      isExternal: true,
      actionText: 'Iniciar Simulador'
    },
    {
      title: 'Monitoreo Online (Grafana)',
      subtitle: 'MÉTRICAS EN TIEMPO REAL',
      description: 'Visualización de telemetría CAN-Bus consolidada, históricos de presión/temperatura de cilindros de fuerza y dashboards interactivos optimizados para el monitoreo y auditoría de toda la flota.',
      icon: Layers,
      color: 'text-cyan-400',
      borderColor: 'group-hover:border-cyan-500/30',
      glowColor: 'from-cyan-500/10 to-transparent',
      link: 'https://andreslandaf.grafana.net/public-dashboards/bab4d26135b64fbead4bf47cefdc7ddc',
      isExternal: true,
      actionText: 'Inspeccionar Grafana'
    },
    {
      title: 'Analizador IA (Streamlit)',
      subtitle: 'APRENDIZAJE AUTOMÁTICO',
      description: 'Modelos predictivos de desgaste de camisas, regresiones lineales de lubricante y algoritmos de estimación de Vida Útil Restante (RUL). Detección de fallas térmicas y obstrucción de filtros.',
      icon: Brain,
      color: 'text-orange-400',
      borderColor: 'group-hover:border-orange-500/30',
      glowColor: 'from-orange-500/10 to-transparent',
      link: 'https://datosmotorcat.streamlit.app/',
      isExternal: true,
      actionText: 'Ejecutar Modelos IA'
    }
  ];

  return (
    <div className="py-12 relative z-10">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-950/30 border border-cyan-800/30 rounded-sm text-cyan-400 text-xs font-mono font-bold uppercase tracking-[0.15em]">
            <Activity className="w-3.5 h-3.5 animate-pulse" /> Ecosistema de Diagnóstico Simarp
          </div>
          <h2 className="font-display text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Acceso Directo a Nuestras Plataformas
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Explora las herramientas operativas de ingeniería y analítica predictiva desarrolladas para la optimización y protección de salas de máquinas en altamar.
          </p>
        </div>

        {/* Platforms Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 pt-4">
          {platforms.map((platform, index) => {
            const Icon = platform.icon;
            
            const cardContent = (
              <div className="h-full flex flex-col justify-between p-6 lg:p-8 bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-sm relative overflow-hidden group hover:border-cyan-500/20 hover:shadow-2xl hover:shadow-cyan-950/20 transition-all duration-300">
                {/* Glow Background effect */}
                <div className={`absolute -inset-px bg-gradient-to-br ${platform.glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
                
                <div className="space-y-5 relative z-10">
                  {/* Subtitle Badge & Icon */}
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-mono text-slate-500 font-bold uppercase tracking-widest bg-slate-950 px-2 py-0.5 rounded-sm border border-slate-900">
                      {platform.subtitle}
                    </span>
                    <div className={`p-2.5 bg-slate-950 border border-slate-800 rounded-sm ${platform.color} group-hover:scale-105 transition-transform duration-200`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="font-display text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {platform.title}
                    </h3>
                    <p className="text-slate-400 text-[12.5px] leading-relaxed">
                      {platform.description}
                    </p>
                  </div>
                </div>

                {/* Bottom CTA Button */}
                <div className="mt-8 pt-4 border-t border-slate-950/60 flex items-center justify-between text-slate-300 font-mono text-[11px] group-hover:text-cyan-400 transition-colors duration-200 font-bold uppercase tracking-wider relative z-10">
                  <span>{platform.actionText}</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </div>
            );

            return (
              <motion.a
                key={index}
                href={platform.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block cursor-pointer"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {cardContent}
              </motion.a>
            );
          })}
        </div>

      </div>
    </div>
  );
}
