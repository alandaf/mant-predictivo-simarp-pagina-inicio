import React, { useState } from 'react';
import { Calculator, ShieldCheck, Coins, TrendingUp, Ship } from 'lucide-react';

interface RoiCalculatorProps {
  onContactClick: () => void;
}

export default function RoiCalculator({ onContactClick }: RoiCalculatorProps) {
  const [fleetSize, setFleetSize] = useState<number>(3);
  const [annualMaintPerBuque, setAnnualMaintPerBuque] = useState<number>(120000); // in USD
  const [unplannedFailureCost, setUnplannedFailureCost] = useState<number>(250000); // in USD

  // Calculations
  // 1. Maintenance spending optimization: 22% average reduction on parts changed prematurely
  const maintSavings = Math.round(fleetSize * annualMaintPerBuque * 0.22);
  
  // 2. Unplanned breakdown prevention: Probabilistic estimate depending on fleet size.
  // Average of 0.4 failures per ship per year, Simarp prevents 90% of them.
  const preventedFailures = Math.round(fleetSize * 0.4 * 0.9 * 10) / 10;
  const failureSavings = Math.round(preventedFailures * unplannedFailureCost);

  // 3. Fuel efficiency gains due to optimized combustion and thermal alignment: 1.8% fuel saving.
  // Standard medium marine vessel consumes roughly $500,000 USD of fuel annually.
  const fuelSavings = Math.round(fleetSize * 500000 * 0.018);

  const totalAnnualSavings = maintSavings + failureSavings + fuelSavings;

  // Formatting helper
  const formatUSD = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-sm p-6 lg:p-10 shadow-xl overflow-hidden relative">
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-600/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10">
        
        {/* Sliders Input Area */}
        <div className="lg:col-span-6 space-y-6 lg:space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/25 rounded-sm text-cyan-455 text-xs font-mono font-bold uppercase tracking-[0.15em] mb-3">
              <Calculator className="w-3.5 h-3.5 text-cyan-400" /> Simulador de Rendimiento Económico
            </div>
            <h3 className="font-display text-2xl lg:text-3xl font-bold text-white tracking-tight">
              Calcula el Retorno Financiero de tu Inversión
            </h3>
            <p className="text-sm text-slate-400 mt-2 leading-relaxed">
              El mantenimiento predictivo reduce el sobremantenimiento innecesario, optimiza la inyección para ahorrar combustible y evita remolques catastróficos.
            </p>
          </div>

          <div className="space-y-6">
            {/* Input 1: Fleet Size */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <label className="text-slate-300 font-medium font-sans flex items-center gap-1.5">
                  <Ship className="w-4 h-4 text-cyan-400" /> Tamaño de la Flota (Buques)
                </label>
                <span className="text-white font-mono font-bold bg-slate-950 px-2.5 py-0.5 rounded border border-slate-800">
                  {fleetSize} {fleetSize === 1 ? 'Buque' : 'Buques'}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={fleetSize}
                onChange={(e) => setFleetSize(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>1 Buque</span>
                <span>15 Buques</span>
                <span>30 Buques</span>
              </div>
            </div>

            {/* Input 2: Maintenance cost per vessel */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <label className="text-slate-300 font-medium font-sans flex items-center gap-1.5">
                  <Coins className="w-4 h-4 text-cyan-400" /> Gasto de Mant. Correctivo/Preventivo Anual por Buque
                </label>
                <span className="text-white font-mono font-bold bg-slate-950 px-2.5 py-0.5 rounded border border-slate-800">
                  {formatUSD(annualMaintPerBuque)}
                </span>
              </div>
              <input
                type="range"
                min="40000"
                max="300000"
                step="10000"
                value={annualMaintPerBuque}
                onChange={(e) => setAnnualMaintPerBuque(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>USD 40k</span>
                <span>USD 170k</span>
                <span>USD 300k</span>
              </div>
            </div>

            {/* Input 3: Unplanned Failure Cost */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <label className="text-slate-300 font-medium font-sans flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" /> Costo Estimado de una Sola Avería Crítica en Altamar
                </label>
                <span className="text-white font-mono font-bold bg-slate-950 px-2.5 py-0.5 rounded border border-slate-800">
                  {formatUSD(unplannedFailureCost)}
                </span>
              </div>
              <input
                type="range"
                min="100000"
                max="800000"
                step="25000"
                value={unplannedFailureCost}
                onChange={(e) => setUnplannedFailureCost(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <p className="text-[11px] text-slate-500 leading-normal">
                *Incluye días de inactividad comercial, fletes retrasados, repuestos de emergencia vía helicóptero/lancha y remolcadores.
              </p>
            </div>
          </div>
        </div>

        {/* Results Graph/Card Area */}
        <div className="lg:col-span-6 bg-slate-900/60 backdrop-blur-md rounded-sm p-6 lg:p-8 border border-cyan-500/10 shadow-xl shadow-cyan-950/20 flex flex-col justify-between">
          <div>
            <span className="text-xs text-cyan-400 font-mono uppercase tracking-[0.1em] block mb-1">
              Ahorros Anuales Totales Proyectados
            </span>
            <div className="text-3xl lg:text-5xl font-display font-extrabold text-white leading-none tracking-tight">
              {formatUSD(totalAnnualSavings)}{' '}
              <span className="text-lg text-cyan-405 font-sans font-semibold block sm:inline mt-1 sm:mt-0 text-cyan-400">
                USD / Año
              </span>
            </div>
            
            <div className="mt-6 pt-6 border-t border-slate-900/60 space-y-4">
              {/* Savings Breakdowns */}
              <div className="flex justify-between items-start">
                <div className="flex gap-2 items-start">
                  <div className="bg-cyan-500/10 p-1.5 rounded-sm text-cyan-400 mt-0.5 border border-cyan-500/15">
                    <TrendingUp className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <span className="text-[13px] text-slate-200 block font-semibold">
                      Prevención de Averías Críticas
                    </span>
                    <span className="text-xs text-slate-400">
                      Evitamos ≈{preventedFailures} fallas imprevistas mayores anuales.
                    </span>
                  </div>
                </div>
                <span className="font-mono text-white text-sm font-semibold mt-1">
                  {formatUSD(failureSavings)}
                </span>
              </div>

              <div className="flex justify-between items-start">
                <div className="flex gap-2 items-start">
                  <div className="bg-cyan-500/10 p-1.5 rounded-sm text-cyan-400 mt-0.5 border border-cyan-500/15">
                    <Coins className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <span className="text-[13px] text-slate-200 block font-semibold">
                      Planificación de Repuestos y Overhaul
                    </span>
                    <span className="text-xs text-slate-400">
                      Eliminación de cambios de repuesto preventivos prematuros.
                    </span>
                  </div>
                </div>
                <span className="font-mono text-white text-sm font-semibold mt-1">
                  {formatUSD(maintSavings)}
                </span>
              </div>

              <div className="flex justify-between items-start">
                <div className="flex gap-2 items-start">
                  <div className="bg-cyan-500/10 p-1.5 rounded-sm text-cyan-400 mt-0.5 border border-cyan-500/15">
                    <Ship className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <span className="text-[13px] text-slate-200 block font-semibold">
                      Eficiencia Térmica e Inyección
                    </span>
                    <span className="text-xs text-slate-400">
                      Reducción estimada del 1.8% en consumo de combustible diésel marino.
                    </span>
                  </div>
                </div>
                <span className="font-mono text-white text-sm font-semibold mt-1">
                  {formatUSD(fuelSavings)}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-900/60 mt-6 space-y-4">
            <div className="p-3.5 bg-cyan-950/20 rounded-sm border border-cyan-900/30 text-xs text-slate-350 leading-normal font-sans">
              🛡️ <strong>Integración de Datos No Intrusiva:</strong> El modelado predictivo de pruebas emula lecturas pasivas del bus CAN, garantizando cero interferencias con la electrónica y la garantía original de los equipos.
            </div>
            
            <button
              onClick={onContactClick}
              className="w-full bg-cyan-600 hover:bg-cyan-500 text-slate-950 py-3.5 rounded-sm font-bold text-xs tracking-widest cursor-pointer transform hover:-translate-y-0.5 transition-all duration-150 shadow-md shadow-cyan-950/25 flex items-center justify-center gap-2 uppercase"
            >
              Cotizar Integración para {fleetSize} Buques
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
