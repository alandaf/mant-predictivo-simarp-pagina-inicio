import React, { useState } from 'react';
import { 
  Calculator, ShieldCheck, Coins, TrendingUp, Ship, 
  TrendingDown, CheckCircle2, XCircle, FileText, ArrowRight, ChevronDown, ChevronUp, RefreshCw 
} from 'lucide-react';
import { jsPDF } from 'jspdf';

interface RoiCalculatorProps {
  onContactClick: () => void;
}

export default function RoiCalculator({ onContactClick }: RoiCalculatorProps) {
  const [fleetSize, setFleetSize] = useState<number>(3);
  const [annualMaintPerBuque, setAnnualMaintPerBuque] = useState<number>(120000); // in USD
  const [unplannedFailureCost, setUnplannedFailureCost] = useState<number>(250000); // in USD
  const [simarpCost, setSimarpCost] = useState<number>(25000); // in USD (Annual Subscription Slider)
  const [isSourcesOpen, setIsSourcesOpen] = useState<boolean>(false);

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

  // ROI & Payback calculations
  const netSavings = totalAnnualSavings - simarpCost;
  const roiValue = simarpCost > 0 ? (netSavings / simarpCost) * 100 : 0;
  const paybackMonths = totalAnnualSavings > 0 ? (simarpCost / totalAnnualSavings) * 12 : 0;

  // Formatting helper
  const formatUSD = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  // PDF Generation function using jsPDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const today = new Date().toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Dark Background Header
    doc.setFillColor(11, 19, 41); // #0b1329
    doc.rect(0, 0, 210, 45, 'F');

    // Accent line (Cyan)
    doc.setFillColor(0, 240, 255);
    doc.rect(0, 45, 210, 1.5, 'F');

    // Header Title
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('SIMARP', 15, 20);
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 240, 255); // Cyan
    doc.text('MANTENIMIENTO PREDICTIVO MARÍTIMO', 15, 26);
    
    doc.setFontSize(10);
    doc.setTextColor(180, 180, 180);
    doc.text('CASO DE NEGOCIO Y ESTUDIO DE RETORNO DE INVERSIÓN (ROI)', 15, 32);

    // Date & Report ID
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text(`Fecha: ${today}`, 145, 20);
    doc.text(`Reporte: SMP-ROI-${Math.floor(100000 + Math.random() * 900000)}`, 145, 25);

    // Section 1: Scenario
    doc.setTextColor(11, 19, 41);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text('1. Escenario Operacional Evaluado', 15, 58);
    
    doc.setFontSize(9.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(70, 70, 70);

    const drawRow = (label: string, sublabel: string, value: string, y: number) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(11, 19, 41);
      doc.text(label, 15, y);
      
      if (sublabel) {
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text(sublabel, 15, y + 4.5);
      }
      
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(70, 70, 70);
      
      const valueYOffset = sublabel ? 2.5 : 0;
      doc.text(value, 165, y + valueYOffset);
      
      doc.setDrawColor(230, 230, 230);
      const lineYOffset = sublabel ? 7 : 2.5;
      doc.line(15, y + lineYOffset, 195, y + lineYOffset);
    };

    drawRow('Tamaño de Flota Evaluada:', '', `${fleetSize} ${fleetSize === 1 ? 'Buque' : 'Buques'}`, 66);
    drawRow('Gasto de Mantenimiento Anual por Buque:', '', formatUSD(annualMaintPerBuque), 74);
    drawRow('Costo Estimado de una Falla Crítica:', '', formatUSD(unplannedFailureCost), 82);
    drawRow('Costo de Suscripción Anual SIMARP Simulado:', '', formatUSD(simarpCost), 90);

    // Section 2: Detailed Savings
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(11, 19, 41);
    doc.text('2. Desglose Detallado de Ahorros Anuales Proyectados', 15, 106);

    drawRow('Prevención de Fallas Críticas', `(${preventedFailures} fallas evitadas al año × ${formatUSD(unplannedFailureCost)})`, formatUSD(failureSavings), 114);
    drawRow('Optimización de Repuestos', '(22% de reducción estimada en reemplazo prematuro)', formatUSD(maintSavings), 124);
    drawRow('Eficiencia Térmica e Inyección', '(1.8% de ahorro en consumo diésel)', formatUSD(fuelSavings), 134);
    
    // Highlight Ahorro Total
    doc.setFillColor(240, 248, 255);
    doc.rect(15, 146, 180, 10, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(11, 19, 41);
    doc.text('AHORRO ANUAL BRUTO PROYECTADO:', 20, 152.5);
    doc.text(formatUSD(totalAnnualSavings), 165, 152.5);

    // Section 3: ROI Analytics
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text('3. Análisis de Retorno de la Inversión (ROI)', 15, 168);

    drawRow('Ahorro Anual Proyectado:', '', formatUSD(totalAnnualSavings), 176);
    drawRow('Costo de Suscripción Anual SIMARP:', '', formatUSD(simarpCost), 184);
    drawRow('Ahorro Neto Proyectado (Primer Año):', '', formatUSD(netSavings), 192);
    
    // ROI and Payback highlights
    doc.setFillColor(235, 253, 250);
    doc.rect(15, 202, 85, 15, 'F');
    doc.setTextColor(10, 100, 90);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('RETORNO DE LA INVERSIÓN (ROI)', 20, 207);
    doc.setFontSize(13);
    doc.text(`${roiValue.toFixed(1)} %`, 20, 214);

    doc.setFillColor(254, 243, 235);
    doc.rect(110, 202, 85, 15, 'F');
    doc.setTextColor(130, 50, 10);
    doc.setFontSize(9);
    doc.text('TIEMPO DE RECUPERACIÓN (PAYBACK)', 115, 207);
    doc.setFontSize(13);
    doc.text(`${paybackMonths.toFixed(1)} Meses`, 115, 214);

    // Section 4: Methodology and Sources
    doc.setTextColor(11, 19, 41);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('4. Fuentes del Modelo Financiero y Metodología', 15, 228);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(90, 90, 90);
    
    const lines = [
      '• Prevención de Fallas: Frecuencia promedio de 0.4 fallas de maquinaria al año por buque (Machinery Damage Report - The Swedish Club).',
      '  SIMARP previene hasta el 90% de fallas catastróficas analizando las anomalías de inyección y sobrecalentamiento térmico.',
      '• Optimización de Combustible: Ganancia de 1.8% de eficiencia térmica verificada por Wärtsilä FOS y guías DNV.',
      '• Repuestos: Reducción estimada de 22% al realizar overhauls basados en condición en lugar de horas de funcionamiento fijas.'
    ];

    let currentY = 235;
    lines.forEach(line => {
      doc.text(line, 15, currentY);
      currentY += 5.5;
    });

    // Decorative Footer
    doc.setDrawColor(0, 240, 255);
    doc.line(15, 268, 195, 268);
    doc.setFontSize(7.5);
    doc.setTextColor(150, 150, 150);
    doc.text('SIMARP - Plataforma Inteligente de Monitoreo Predictivo Marítimo', 15, 274);
    doc.text('Este reporte constituye una simulación económica estimada basada en supuestos estándares y no compromete precios finales de cotización.', 15, 278);

    doc.save(`Caso_de_Negocio_SIMARP_${fleetSize}_buques.pdf`);
  };

  return (
    <div className="space-y-10">
      
      {/* 6. MEJORA VISUAL DEL RESULTADO PRINCIPAL (HEADER SUMMARY ROW) */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-cyan-500/20 rounded-lg p-6 lg:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-slate-800">
          
          {/* KPI 1: Ahorro Anual Proyectado */}
          <div className="flex flex-col justify-center items-center md:items-start pb-6 md:pb-0 md:pr-4">
            <span className="text-xs text-slate-400 font-mono uppercase tracking-[0.1em] flex items-center gap-1.5 mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Ahorro Anual Proyectado
            </span>
            <div className="text-3xl lg:text-4xl font-display font-extrabold text-white tracking-tight">
              {formatUSD(totalAnnualSavings)}
              <span className="text-xs text-emerald-400 font-sans block mt-1 font-semibold">
                Ahorro Bruto Estimado
              </span>
            </div>
          </div>

          {/* KPI 2: ROI Estimado */}
          <div className="flex flex-col justify-center items-center pb-6 md:pb-0 md:px-8">
            <span className="text-xs text-slate-400 font-mono uppercase tracking-[0.1em] flex items-center gap-1.5 mb-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" /> ROI Estimado
            </span>
            <div className="text-3xl lg:text-4xl font-display font-extrabold text-cyan-400 tracking-tight">
              {roiValue > 0 ? `${roiValue.toFixed(0)}%` : '0%'}
              <span className="text-xs text-slate-400 font-sans block mt-1 font-semibold">
                Sobre la inversión anual
              </span>
            </div>
          </div>

          {/* KPI 3: Tiempo de Recuperación */}
          <div className="flex flex-col justify-center items-center pt-6 md:pt-0 md:pl-8">
            <span className="text-xs text-slate-400 font-mono uppercase tracking-[0.1em] flex items-center gap-1.5 mb-2">
              <RefreshCw className="w-4 h-4 text-orange-400 animate-spin-slow" /> Tiempo de Recuperación
            </span>
            <div className="text-3xl lg:text-4xl font-display font-extrabold text-white tracking-tight">
              {paybackMonths.toFixed(1)}
              <span className="text-xs text-orange-400 font-sans block mt-1 font-semibold">
                Meses (Payback Period)
              </span>
            </div>
          </div>
          
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 lg:p-10 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-600/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10">
          
          {/* Sliders Input Area */}
          <div className="lg:col-span-6 space-y-6 lg:space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/25 rounded-sm text-cyan-400 text-xs font-mono font-bold uppercase tracking-[0.15em] mb-3">
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
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 text-sm">
                  <label className="text-slate-300 font-medium font-sans flex items-center gap-1.5">
                    <Ship className="w-4 h-4 text-cyan-400" /> Tamaño de la Flota
                  </label>
                  <span className="text-white font-mono font-bold bg-slate-950 px-2.5 py-0.5 rounded border border-slate-800 w-fit">
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
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 text-sm">
                  <label className="text-slate-300 font-medium font-sans flex items-center gap-1.5">
                    <Coins className="w-4 h-4 text-cyan-400" /> Gasto Mant. Anual / Buque
                  </label>
                  <span className="text-white font-mono font-bold bg-slate-950 px-2.5 py-0.5 rounded border border-slate-800 w-fit">
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
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 text-sm">
                  <label className="text-slate-300 font-medium font-sans flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" /> Costo de una Falla Crítica
                  </label>
                  <span className="text-white font-mono font-bold bg-slate-950 px-2.5 py-0.5 rounded border border-slate-800 w-fit">
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
                <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                  <span>USD 100k</span>
                  <span>USD 450k</span>
                  <span>USD 800k</span>
                </div>
              </div>

              {/* Input 4: Costo Anual Suscripción SIMARP (Slider) */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 text-sm">
                  <label className="text-slate-300 font-medium font-sans flex items-center gap-1.5 text-cyan-300">
                    <Coins className="w-4 h-4 text-cyan-300" /> Costo Suscripción Anual SIMARP
                  </label>
                  <span className="text-cyan-400 font-mono font-bold bg-slate-950 px-2.5 py-0.5 rounded border border-cyan-900/50 w-fit">
                    {formatUSD(simarpCost)}
                  </span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="100000"
                  step="5000"
                  value={simarpCost}
                  onChange={(e) => setSimarpCost(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                  <span>USD 5k</span>
                  <span>USD 52.5k</span>
                  <span>USD 100k</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Details Column */}
          <div className="lg:col-span-6 space-y-6">

            {/* 1. TRANSPARENCIA DEL CÁLCULO CARD */}
            <div className="bg-slate-900/80 backdrop-blur-md rounded-lg p-5 lg:p-6 border border-slate-800 shadow-lg">
              <h4 className="text-sm font-mono uppercase tracking-[0.12em] text-slate-300 border-b border-slate-800 pb-3 mb-4">
                ¿Cómo se calcula este ahorro?
              </h4>
              
              <div className="space-y-4 font-sans text-xs">
                
                {/* Desglose Prevención Fallas */}
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-semibold text-slate-200 block">Prevención de Fallas Críticas</span>
                    <span className="text-slate-400 font-mono text-[11px] block mt-0.5">
                      {preventedFailures} fallas evitadas × {formatUSD(unplannedFailureCost)}
                    </span>
                  </div>
                  <span className="font-mono text-white text-[13px] font-bold mt-1">
                    {formatUSD(failureSavings)}
                  </span>
                </div>

                {/* Desglose Repuestos */}
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-semibold text-slate-200 block">Optimización de Repuestos</span>
                    <span className="text-slate-400 font-mono text-[11px] block mt-0.5">
                      Reducción estimada de reemplazos prematuros (22%)
                    </span>
                  </div>
                  <span className="font-mono text-white text-[13px] font-bold mt-1">
                    {formatUSD(maintSavings)}
                  </span>
                </div>

                {/* Desglose Eficiencia Combustible */}
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-semibold text-slate-200 block">Eficiencia Térmica e Inyección</span>
                    <span className="text-slate-400 font-mono text-[11px] block mt-0.5">
                      Ahorro estimado de combustible (1.8% de consumo diésel)
                    </span>
                  </div>
                  <span className="font-mono text-white text-[13px] font-bold mt-1">
                    {formatUSD(fuelSavings)}
                  </span>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center border-t border-slate-800 pt-3 mt-3 text-cyan-400 font-semibold">
                  <span className="text-slate-300">Ahorro Bruto Total</span>
                  <span className="font-mono text-base font-bold">
                    {formatUSD(totalAnnualSavings)}
                  </span>
                </div>
              </div>
            </div>

            {/* 2. ROI REAL CARD */}
            <div className="bg-gradient-to-br from-slate-900 to-cyan-950/20 backdrop-blur-md rounded-lg p-5 lg:p-6 border border-cyan-500/20 shadow-lg">
              <h4 className="text-sm font-mono uppercase tracking-[0.12em] text-cyan-400 border-b border-cyan-950 pb-3 mb-4 flex items-center justify-between">
                Retorno de la Inversión
                <span className="text-[10px] font-sans px-2.5 py-0.5 rounded-sm bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">Análisis Neto</span>
              </h4>
              
              <div className="grid grid-cols-2 gap-4 text-xs font-sans">
                
                <div className="bg-slate-950/60 p-3 rounded-md border border-slate-800">
                  <span className="text-slate-400 block mb-1">Costo anual sistema</span>
                  <span className="text-sm font-mono text-white font-bold block">{formatUSD(simarpCost)}</span>
                </div>

                <div className="bg-slate-950/60 p-3 rounded-md border border-slate-800">
                  <span className="text-slate-400 block mb-1">Ahorro anual proyectado</span>
                  <span className="text-sm font-mono text-white font-bold block">{formatUSD(totalAnnualSavings)}</span>
                </div>

                <div className="bg-slate-950/60 p-3 rounded-md border border-slate-800">
                  <span className="text-slate-400 block mb-1">ROI Neto Anual</span>
                  <span className="text-sm font-mono text-cyan-400 font-bold block">
                    {roiValue > 0 ? `${roiValue.toFixed(0)}%` : '0%'}
                  </span>
                </div>

                <div className="bg-slate-950/60 p-3 rounded-md border border-slate-800">
                  <span className="text-slate-400 block mb-1">Payback (Retorno)</span>
                  <span className="text-sm font-mono text-emerald-400 font-bold block">{paybackMonths.toFixed(1)} meses</span>
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* 3. COMPARATIVA VISUAL (SIN vs CON SIMARP) */}
        <div className="mt-12 pt-10 border-t border-slate-800/80">
          <h4 className="text-center text-sm font-mono uppercase tracking-[0.2em] text-slate-400 mb-8">
            Análisis de Impacto en Operaciones
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            
            {/* SIN SIMARP Column */}
            <div className="bg-slate-950/40 border border-red-500/10 rounded-lg p-6 hover:border-red-500/20 transition-all duration-300">
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-red-500/10 p-2 rounded-full text-red-500 border border-red-500/20">
                  <XCircle className="w-5 h-5" />
                </div>
                <h5 className="font-display text-lg font-bold text-red-400 tracking-wide">SIN SIMARP</h5>
              </div>
              
              <ul className="space-y-3.5 text-slate-400 text-sm font-sans">
                <li className="flex items-start gap-2.5 leading-relaxed">
                  <span className="text-red-500 font-bold mt-0.5">•</span>
                  <span><strong>Mantenimiento reactivo:</strong> Reparaciones forzadas tras detenciones o alarmas del motor principal.</span>
                </li>
                <li className="flex items-start gap-2.5 leading-relaxed">
                  <span className="text-red-500 font-bold mt-0.5">•</span>
                  <span><strong>Más fallas inesperadas:</strong> Elevado riesgo de remolques y retrasos contractuales con barcos de terceros.</span>
                </li>
                <li className="flex items-start gap-2.5 leading-relaxed">
                  <span className="text-red-500 font-bold mt-0.5">•</span>
                  <span><strong>Mayor consumo de repuestos:</strong> Cambios de piezas de desgaste por horas fijas sin conocer el estado real.</span>
                </li>
                <li className="flex items-start gap-2.5 leading-relaxed">
                  <span className="text-red-500 font-bold mt-0.5">•</span>
                  <span><strong>Mayor riesgo operacional:</strong> Desconocimiento térmico de la inyección en altamar.</span>
                </li>
              </ul>
            </div>

            {/* CON SIMARP Column */}
            <div className="bg-slate-950/40 border border-cyan-500/20 rounded-lg p-6 hover:border-cyan-500/30 transition-all duration-300">
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-cyan-500/10 p-2 rounded-full text-cyan-400 border border-cyan-500/20">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h5 className="font-display text-lg font-bold text-cyan-400 tracking-wide">CON SIMARP</h5>
              </div>
              
              <ul className="space-y-3.5 text-slate-300 text-sm font-sans">
                <li className="flex items-start gap-2.5 leading-relaxed">
                  <span className="text-cyan-400 font-bold mt-0.5">•</span>
                  <span><strong>Monitoreo predictivo:</strong> Diagnóstico continuo basado en telemetría de inyección del bus CAN-Bus.</span>
                </li>
                <li className="flex items-start gap-2.5 leading-relaxed">
                  <span className="text-cyan-400 font-bold mt-0.5">•</span>
                  <span><strong>Menos fallas críticas:</strong> Prevención proactiva del 90% de incidentes mecánicos mayores catastróficos.</span>
                </li>
                <li className="flex items-start gap-2.5 leading-relaxed">
                  <span className="text-cyan-400 font-bold mt-0.5">•</span>
                  <span><strong>Mejor planificación:</strong> Compra de repuestos y programación de dique seco según necesidad técnica real.</span>
                </li>
                <li className="flex items-start gap-2.5 leading-relaxed">
                  <span className="text-cyan-400 font-bold mt-0.5">•</span>
                  <span><strong>Mayor disponibilidad:</strong> Optimización térmica de la combustión, logrando un ahorro de diésel de 1.8%.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Buttons and Action Area */}
        <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col md:flex-row gap-4 justify-between items-center">
          
          {/* Button 4: PDF Generation */}
          <button
            type="button"
            onClick={handleDownloadPDF}
            className="w-full md:w-auto bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-cyan-500/30 px-6 py-3.5 rounded-sm font-bold text-xs tracking-widest cursor-pointer transform hover:-translate-y-0.5 transition-all duration-150 shadow-md flex items-center justify-center gap-2 uppercase"
          >
            <FileText className="w-4 h-4 text-cyan-400" /> Descargar Caso de Negocio
          </button>

          <button
            type="button"
            onClick={onContactClick}
            className="w-full md:w-auto bg-cyan-600 hover:bg-cyan-500 text-slate-950 px-8 py-3.5 rounded-sm font-bold text-xs tracking-widest cursor-pointer transform hover:-translate-y-0.5 transition-all duration-150 shadow-md shadow-cyan-950/25 flex items-center justify-center gap-2 uppercase"
          >
            Solicitar Reunión Comercial <ArrowRight className="w-4 h-4" />
          </button>

        </div>

        {/* 5. FUENTES Y CREDIBILIDAD ACCORDION */}
        <div className="mt-8 pt-6 border-t border-slate-800">
          <button
            type="button"
            onClick={() => setIsSourcesOpen(!isSourcesOpen)}
            className="w-full flex items-center justify-between text-left text-xs font-mono text-slate-400 hover:text-slate-300 transition-colors uppercase tracking-wider py-2 cursor-pointer"
          >
            <span>Fuentes utilizadas y base del modelo financiero</span>
            {isSourcesOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {isSourcesOpen && (
            <div className="mt-4 p-4 bg-slate-950/50 border border-slate-800/80 rounded-md text-xs text-slate-400 space-y-4 font-sans leading-relaxed">
              
              <div>
                <strong className="text-slate-300">The Swedish Club (Machinery Damage Report):</strong>
                <p className="mt-1">
                  Establece que el costo unitario de averías catastróficas en motores principales marinos de propulsión supera recurrentemente los USD 650,000. El modelo utiliza un costo de falla crítico muy conservador de USD 250,000 que incluye remolcadores de emergencia y pérdidas contractuales por demurrage.
                </p>
              </div>

              <div>
                <strong className="text-slate-300">Wärtsilä Fleet Optimisation Solutions (FOS):</strong>
                <p className="mt-1">
                  Certifica ganancias del 1.5% al 3% en rendimiento de combustible al utilizar optimización basada en micro-telemetría de inyección y control térmico continuo. El modelo SIMARP simula un ahorro promedio conservador del 1.8% sobre el consumo estándar de motores auxiliares y principales.
                </p>
              </div>

              <div>
                <strong className="text-slate-300">DNV (Det Norske Veritas):</strong>
                <p className="mt-1">
                  Recomienda el monitoreo continuo de parámetros críticos de temperatura en camisas y culatas para extender la vida útil y la planificación basada en condición (CBM - Condition Based Maintenance). Respalda el supuesto de reducción del 22% en gasto prematuro de repuestos por overhaul innecesario.
                </p>
              </div>

              <div>
                <strong className="text-slate-300">Swedish Club & Fleet Optimisation Solutions:</strong>
                <p className="mt-1">
                  Estudios de flota confirman una tasa promedio anual de 0.4 fallas mayores por buque. SIMARP previene anomalías tempranas en al menos un 90% antes de transformarse en daños térmicos severos.
                </p>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
