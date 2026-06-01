import React, { useState, useEffect, useRef } from 'react';
import { 
  Cpu, AlertTriangle, CheckCircle, Activity, Gauge, Thermometer, Radio, RefreshCw, 
  Layers, Anchor, ShieldAlert, Compass, Settings, CornerDownRight, Zap, Play, Square,
  Wrench, Droplets, MapPin, Wind, Heart, Brain
} from 'lucide-react';
import { TelemetryData } from '../types';

interface MaintenanceLog {
  time: string;
  event: string;
  status: string;
}

interface ASDState {
  running: boolean;
  rpm: number;
  temp: number;
  oil: number;
  fuel: number;
  load: number;
  exhaust: number;
  efficiency: number;
  vibration: number;
  state: string;
  power_lever: string;
  clutch_state: string;
  azimuth_angle: number;
  propeller_rpm: number;
  bollard_pull: number;
  thrust_longitudinal: number;
  thrust_transverse: number;
  thrust_total: number;
  gearbox_oil_temp: number;
  gearbox_oil_pressure: number;
  boost_pressure: number;
  seawater_temp: number;
  raw_water_pressure: number;
  heat_exchanger_delta_t: number;
  lat: number;
  lon: number;
  sog: number;
  cog: number;
  pitch: number;
  roll: number;
  engine_hours: number;
  battery_voltage: number;
  cylinders: number[];
  health_score: number;
  ai_message: string;
  ai_severity: string;
  specific_consumption: number;
  maintenance_logs: MaintenanceLog[];
  filter_clog: number;
  coolant_offset: number;
  break_injector: boolean;
  resistance_factor: number;
  eco_status: string;
  eco_advice: string;
  nox_raw: number;
  nox_reduced: number;
  def_level: number;
  def_consumption: number;
  ia_prediction: string;
  health_status: string;
  analyzing: boolean;
  is_rpi_live: boolean;
}

export default function TelemetrySimulator() {
  const [state, setState] = useState<ASDState>({
    running: false,
    rpm: 0.0,
    temp: 24.5,
    oil: 25.0,
    fuel: 0.0,
    load: 0.0,
    exhaust: 45.0,
    efficiency: 0.003,
    vibration: 0.25,
    state: "DETENIDO",
    power_lever: "STOP",
    clutch_state: "NEUTRAL",
    azimuth_angle: 0.0,
    propeller_rpm: 0.0,
    bollard_pull: 0.0,
    thrust_longitudinal: 0.0,
    thrust_transverse: 0.0,
    thrust_total: 0.0,
    gearbox_oil_temp: 40.0,
    gearbox_oil_pressure: 38.5,
    boost_pressure: 0.0,
    seawater_temp: 11.2,
    raw_water_pressure: 0.0,
    heat_exchanger_delta_t: 5.5,
    lat: -33.139,
    lon: -71.566,
    sog: 0.0,
    cog: 180.0,
    pitch: 0.4,
    roll: -1.2,
    engine_hours: 1450.7,
    battery_voltage: 24.2,
    cylinders: Array(16).fill(22),
    health_score: 100,
    ai_message: "Monitoreo Predictivo Activo • Sin anomalías estructurales.",
    ai_severity: "ok",
    specific_consumption: 0.0,
    maintenance_logs: [
      { time: "09:30:15", event: "Autodiagnóstico inicial", status: "OK" },
      { time: "09:30:16", event: "Enlace CAN-Bus J1939 Sincronizado", status: "OK" }
    ],
    filter_clog: 0.0,
    coolant_offset: 0.0,
    break_injector: false,
    resistance_factor: 1.0,
    eco_status: "NORMAL",
    eco_advice: "🔹 Motor parado de forma segura. Consumo basal nulo.",
    nox_raw: 0.0,
    nox_reduced: 0.0,
    def_level: 95.5,
    def_consumption: 0.0,
    ia_prediction: "SISTEMA APAGADO",
    health_status: "PARADA",
    analyzing: false,
    is_rpi_live: false
  });

  const [connected, setConnected] = useState(false);
  const azimuthSvgRef = useRef<SVGSVGElement>(null);
  const terminalLogsRef = useRef<HTMLDivElement>(null);
  
  // Refs to store simulation targets in client-side fallback mode
  const targetRpmRef = useRef(0);
  const targetAzimuthAngleRef = useRef(0);

  // Establish live secure WebSocket connection to backend
  useEffect(() => {
    let ws: WebSocket | null = null;
    let timer: NodeJS.Timeout;

    function connect() {
      const proto = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${proto}//${window.location.host}/ws`;
      console.log('Connecting front-end to state-bridge:', wsUrl);
      
      ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log('Front-end successfully connected to telemetry WS bridge!');
        setConnected(true);
      };

      ws.onmessage = (event) => {
        try {
          const receivedData = JSON.parse(event.data);
          setState(receivedData);
          // Sync client targets with current live data
          targetRpmRef.current = receivedData.rpm;
          targetAzimuthAngleRef.current = receivedData.azimuth_angle;
        } catch (e) {
          console.error('Error parsing telemetry frame:', e);
        }
      };

      ws.onclose = () => {
        setConnected(false);
        console.warn('Telemetry WS bridge lost. Reconnecting in 3 seconds...');
        timer = setTimeout(connect, 3000);
      };

      ws.onerror = (err) => {
        console.error('WebSocket bridge error:', err);
        setConnected(false);
      };
    }

    connect();

    return () => {
      if (ws) ws.close();
      clearTimeout(timer);
    };
  }, []);

  // Client-side physics simulation fallback loop (runs when connected is false)
  useEffect(() => {
    if (connected) return;

    const interval = setInterval(() => {
      setState(prev => {
        if (connected) return prev; // Avoid overwriting server data if it connects
        
        const newState = { ...prev };
        newState.is_rpi_live = false;
        newState.analyzing = true; // Simarp Edge is always active modeling the digital twin

        // 1. Ignition and RPM Dynamics
        let targetRpm = 0;
        if (newState.running) {
          newState.state = newState.power_lever === 'STOP' ? 'RALENTÍ' : 'EN MARCHA';
          newState.health_status = 'OPERANDO';
          newState.battery_voltage = parseFloat((26.4 + (Math.random() - 0.5) * 0.1).toFixed(1));
          newState.engine_hours += 0.0003; // accum hours

          // Determine target RPM from power lever positions
          switch (newState.power_lever) {
            case 'FULL': targetRpm = 2100; break;
            case 'HALF': targetRpm = 1450; break;
            case 'SLOW': targetRpm = 1050; break;
            case 'DEAD_SLOW': targetRpm = 750; break;
            case 'STOP':
            default:
              targetRpm = 600; break;
          }
        } else {
          newState.state = 'DETENIDO';
          newState.health_status = 'PARADA';
          targetRpm = 0;
          newState.battery_voltage = parseFloat((24.2 + (Math.random() - 0.5) * 0.05).toFixed(1));
        }

        // Smoothly interpolate RPM (inertia representation)
        const rpmInterpSpeed = newState.running ? 150 : 350; // Faster decelerations
        const rpmDiff = targetRpm - newState.rpm;
        if (Math.abs(rpmDiff) > 5) {
          newState.rpm = Math.round(newState.rpm + Math.sign(rpmDiff) * Math.min(Math.abs(rpmDiff), rpmInterpSpeed));
        } else {
          newState.rpm = targetRpm;
        }

        // Add random motor jitter
        if (newState.rpm > 0) {
          newState.rpm += Math.round((Math.random() - 0.5) * 6);
        }

        // 2. Load and Efficiency Calculations
        if (newState.rpm > 0) {
          const basePct = (newState.rpm / 2100);
          newState.load = parseFloat((basePct * 94 * newState.resistance_factor).toFixed(1));
          if (newState.load > 100) newState.load = 100;
        } else {
          newState.load = 0;
        }

        // 3. Torque & Propulsion - Azimuthing propulsion (ASD)
        newState.propeller_rpm = parseFloat((newState.rpm * 0.38).toFixed(1));

        // Interpolate azimuth angle
        const angleDiff = targetAzimuthAngleRef.current - newState.azimuth_angle;
        if (Math.abs(angleDiff) > 0.5) {
          newState.azimuth_angle = parseFloat(((newState.azimuth_angle + Math.sign(angleDiff) * Math.min(Math.abs(angleDiff), 25)) % 360).toFixed(1));
        } else {
          newState.azimuth_angle = targetAzimuthAngleRef.current;
        }

        // Bollard pull (tons)
        if (newState.rpm > 0) {
          const pullRatio = newState.rpm / 2100;
          newState.bollard_pull = parseFloat((Math.pow(pullRatio, 2.1) * 70 * newState.resistance_factor).toFixed(1));
        } else {
          newState.bollard_pull = 0;
        }

        // Thrust Vector computations (max pull 70t * 9.81 = 686 kN)
        const maxThrustKN = 686;
        const currThrustKN = (newState.bollard_pull / 70) * maxThrustKN;
        newState.thrust_total = currThrustKN;

        // Longitudinal & transverse vectors based on azimuth angle rotation
        const rad = ((newState.azimuth_angle - 90) * Math.PI) / 180;
        newState.thrust_longitudinal = parseFloat((currThrustKN * Math.cos(rad) * -1).toFixed(1));
        newState.thrust_transverse = parseFloat((currThrustKN * Math.sin(rad) * -1).toFixed(1));

        // 4. Auxiliary system metrics (Cooling, Oil, Fuel, Air)
        if (newState.rpm > 0) {
          // Boiler / cooling jacket water temp
          const activeHeat = newState.load * 0.45;
          const targetTemp = 60 + activeHeat + newState.coolant_offset;
          const tempDiff = targetTemp - newState.temp;
          newState.temp = parseFloat((newState.temp + Math.sign(tempDiff) * 0.8).toFixed(1));

          // Oil pressure
          const baseOil = 25 + (newState.rpm / 2100) * 45;
          const cloggingLoss = newState.filter_clog * 0.25;
          newState.oil = parseFloat((baseOil - cloggingLoss + (Math.random() - 0.5) * 0.8).toFixed(1));
          if (newState.oil < 10) newState.oil = 10;

          // Fuel Consumption L/Hr
          newState.fuel = parseFloat(((newState.rpm / 2100) * 395 * (0.3 + 0.7 * (newState.load / 100))).toFixed(1));

          // Specific Consumption
          newState.specific_consumption = parseFloat((newState.fuel / ((newState.rpm * 2.8) / 1000)).toFixed(3));

          // Turbo Boost
          newState.boost_pressure = parseFloat((Math.pow(newState.rpm / 2100, 1.8) * 32.5).toFixed(1));

          // Exhaust temp
          newState.exhaust = parseFloat((150 + (newState.rpm / 2100) * 330 + (newState.load * 0.4)).toFixed(1));

          // Gearbox
          newState.gearbox_oil_temp = parseFloat((40 + (newState.rpm / 2100) * 35).toFixed(1));
          newState.gearbox_oil_pressure = parseFloat((32 + (newState.rpm / 2100) * 15).toFixed(1));

          // Raw Water seawater delta
          newState.raw_water_pressure = parseFloat((1.2 + (newState.rpm / 2100) * 2.2).toFixed(1));
          newState.heat_exchanger_delta_t = parseFloat((40 + (newState.load * 0.35)).toFixed(1));
        } else {
          // Engine stopped - cooling down slowly
          const coolRate = 0.15;
          if (newState.temp > 22) newState.temp = parseFloat((newState.temp - coolRate).toFixed(1));
          if (newState.gearbox_oil_temp > 25) newState.gearbox_oil_temp = parseFloat((newState.gearbox_oil_temp - coolRate).toFixed(1));
          newState.oil = parseFloat((25.0 + (Math.random() - 0.5) * 0.2).toFixed(1));
          newState.fuel = 0.0;
          newState.specific_consumption = 0.0;
          newState.boost_pressure = 0.0;
          newState.exhaust = parseFloat((newState.exhaust > 45 ? newState.exhaust - 3.0 : 45.0).toFixed(1));
          newState.gearbox_oil_pressure = parseFloat((38.5 + (Math.random() - 0.5) * 0.1).toFixed(1));
          newState.raw_water_pressure = 0.0;
          newState.heat_exchanger_delta_t = parseFloat((newState.heat_exchanger_delta_t > 5 ? newState.heat_exchanger_delta_t - 0.5 : 5.0).toFixed(1));
        }

        // 5. Vibration Spectral analysis
        let baseVibe = 0.2;
        if (newState.rpm > 0) {
          baseVibe = 0.6 + (newState.rpm / 2100) * 1.8;
        }
        if (newState.break_injector) {
          baseVibe += 1.85;
        }
        newState.vibration = parseFloat((baseVibe + (Math.random() - 0.5) * 0.05).toFixed(2));

        // 6. Navigation GPS coordinates simulation
        if (newState.rpm > 0 && newState.power_lever !== 'STOP') {
          newState.sog = parseFloat(((newState.rpm / 2100) * 13.8 * (1 - (newState.resistance_factor - 1) * 0.25)).toFixed(2));
          newState.cog = newState.azimuth_angle;
          newState.pitch = parseFloat((0.2 + Math.sin(Date.now() / 3000) * 0.4 + (newState.sog * 0.05)).toFixed(2));
          newState.roll = parseFloat((Math.cos(Date.now() / 4200) * 1.5 + (newState.thrust_transverse * 0.02)).toFixed(2));

          const speedKnotsFactor = newState.sog * 0.000001;
          const moveRad = (newState.cog * Math.PI) / 180;
          newState.lat += speedKnotsFactor * Math.cos(moveRad);
          newState.lon += speedKnotsFactor * Math.sin(moveRad);
        } else {
          newState.sog = parseFloat((Math.max(0, newState.sog - 0.1)).toFixed(3));
          newState.pitch = parseFloat((Math.sin(Date.now() / 4500) * 0.15).toFixed(2));
          newState.roll = parseFloat((Math.cos(Date.now() / 5500) * 0.4).toFixed(2));
        }

        // 7. Cylinders Heatmap Array (16 cylinders)
        const activeCylinderCount = 16;
        if (newState.rpm > 0) {
          newState.cylinders = Array.from({ length: activeCylinderCount }).map((_, index) => {
            let cTemp = newState.temp * 4.2 + (Math.sin(index * 0.8) * 14.5) + (Math.random() - 0.5) * 8;
            if (newState.break_injector && index === 7) {
              cTemp = newState.temp * 1.2 + (Math.random() - 0.5) * 3; // Malfunctioning injector
            }
            return parseFloat(cTemp.toFixed(1));
          });
        } else {
          newState.cylinders = Array.from({ length: activeCylinderCount }).map(() => parseFloat((newState.temp + (Math.random() - 0.5) * 0.5).toFixed(1)));
        }

        // 8. Eco advisor rules
        if (!newState.running) {
          newState.eco_status = "NORMAL";
          newState.eco_advice = "🔹 Motor apagado. Simarp Edge en modo standby de datos.";
          newState.nox_raw = 0.0;
          newState.nox_reduced = 0.0;
          newState.def_consumption = 0.0;
        } else {
          newState.def_consumption = parseFloat(((newState.fuel * 0.045)).toFixed(2));
          newState.def_level = Math.max(0, newState.def_level - (newState.def_consumption / 3600));

          newState.nox_raw = parseFloat(((newState.rpm / 2100) * 1250).toFixed(1));
          newState.nox_reduced = parseFloat((newState.nox_raw * 0.12).toFixed(1)); // 88% reduction

          if (newState.power_lever === 'FULL' && newState.resistance_factor > 1.8) {
            newState.eco_status = "ALTO_CONSUMO";
            newState.eco_advice = "🚨 CARGA EXTREMA: Torque crítico y alta fricción. Reduzca telemandante a 80%.";
          } else if (newState.power_lever === 'HALF') {
            newState.eco_status = "ECO";
            newState.eco_advice = "✅ PUNTO DE OPERACIÓN ECONÓMICO: Propulsión de paso fino optimizada por AI.";
          } else {
            newState.eco_status = "NORMAL";
            newState.eco_advice = "🔹 Consumo de torque balanceado. Desgaste dentro del límite nominal.";
          }
        }

        // 9. AI Copilot Diagnostics
        let baseScore = 100;
        let severity = "ok";
        let message = "Motor Principal (4T): " + Math.round(newState.propeller_rpm) + " RPM | Empuje: " + newState.thrust_total.toFixed(1) + " kN";
        let prediction = "ESTABLE (RUL: 98.7% - Streamlit)";

        if (!newState.running) {
          prediction = "MOTOR DETENIDO (SINC.)";
          message = "Sistema Listo • Monitoreo de Motor Principal calibrado";
        } else {
          if (newState.break_injector) {
            baseScore -= 66;
            severity = "danger";
            message = "❌ ALERTA ROJA (Motor Principal): Falla de encendido (Misfire) cilindro #8. Pérdida de compresión por soplado.";
            prediction = "CRÍTICO: Umbral Blow-by superado en Analítica Streamlit. Requiere Overhaul.";
          } else if (newState.filter_clog > 40) {
            const clogFactor = newState.filter_clog;
            baseScore -= Math.round(clogFactor * 0.4);
            if (newState.filter_clog > 70) {
              severity = "danger";
              message = `⚠️ ADVERTENCIA (Falla de Caudal): Presión de aceite baja por filtro obstruido (${clogFactor.toFixed(0)}%).`;
              prediction = "URGENTE: Degradación severa según regresión de desgaste de cojinetes.";
            } else {
              severity = "warning";
              message = `⚠️ Anomalía de Lubricación: Filtro saturado al ${clogFactor.toFixed(0)}%. Resistencia detectada en modelo predictivo.`;
              prediction = "ALERTA TEMPRANA: Desviación de curva nominal en Streamlit.";
            }
          } else if (newState.temp > 95) {
            baseScore -= 20;
            severity = "warning";
            message = "⚠️ Gradiente crítico en camisa de refrigeración de cilindros de fuerza.";
            prediction = "PREVENTIVO: Monitoree flujo según curvas de eficiencia térmica.";
          }
        }

        newState.health_score = baseScore;
        newState.ai_severity = severity;
        newState.ai_message = message;
        newState.ia_prediction = prediction;

        return newState;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [connected]);

  // Sync scroll on diagnostic terminal logs
  useEffect(() => {
    if (terminalLogsRef.current) {
      terminalLogsRef.current.scrollTop = terminalLogsRef.current.scrollHeight;
    }
  }, [state.maintenance_logs, state.ai_message]);

  // Action Triggers - proxy request to backend or execute locally if disconnected
  const triggerAction = async (endpoint: string, bodyObj: any = {}) => {
    if (connected) {
      try {
        const response = await fetch(`/api/engine/${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bodyObj)
        });
        const data = await response.json();
        console.log(`Action triggered on backend: /api/engine/${endpoint}`, data);
      } catch (err) {
        console.error(`Failed to invoke backend action ${endpoint}, falling back locally:`, err);
        handleLocalAction(endpoint, bodyObj);
      }
    } else {
      handleLocalAction(endpoint, bodyObj);
    }
  };

  // Process actions locally in fallback simulation mode
  const handleLocalAction = (endpoint: string, bodyObj: any) => {
    setState(prev => {
      const newState = { ...prev };
      
      if (endpoint === 'start') {
        newState.running = true;
        newState.maintenance_logs = [
          {
            time: new Date().toLocaleTimeString('es-CL'),
            event: "Arranque Motor local (Simulador Cliente)",
            status: "OK"
          },
          ...newState.maintenance_logs
        ];
      } else if (endpoint === 'stop') {
        newState.running = false;
        newState.rpm = 0;
        newState.maintenance_logs = [
          {
            time: new Date().toLocaleTimeString('es-CL'),
            event: "Apagado de Motor local (Simulador Cliente)",
            status: "OK"
          },
          ...newState.maintenance_logs
        ];
      } else if (endpoint === 'power') {
        newState.power_lever = bodyObj.lever;
      } else if (endpoint === 'azimuth') {
        targetAzimuthAngleRef.current = bodyObj.angle;
      } else if (endpoint === 'control') {
        if (bodyObj.resistance_factor !== undefined) newState.resistance_factor = bodyObj.resistance_factor;
        if (bodyObj.def_level !== undefined) {
          newState.def_level = bodyObj.def_level;
          newState.maintenance_logs = [
            {
              time: new Date().toLocaleTimeString('es-CL'),
              event: "Urea (DEF) Recargada al 100%",
              status: "OK"
            },
            ...newState.maintenance_logs
          ];
        }
      } else if (endpoint === 'faults') {
        if (bodyObj.coolant_offset !== undefined) newState.coolant_offset = bodyObj.coolant_offset;
        if (bodyObj.filter_clog !== undefined) newState.filter_clog = bodyObj.filter_clog;
        if (bodyObj.break_injector !== undefined) newState.break_injector = bodyObj.break_injector;
      } else if (endpoint === 'maintenance') {
        if (bodyObj.component === 'oil_filter') {
          newState.filter_clog = 0.0;
          newState.maintenance_logs = [
            {
              time: new Date().toLocaleTimeString('es-CL'),
              event: "Filtro de Aceite Reemplazado (Local)",
              status: "OK"
            },
            ...newState.maintenance_logs
          ];
        }
        if (bodyObj.component === 'injector_8' || bodyObj.component === 'injector') {
          newState.break_injector = false;
          newState.maintenance_logs = [
            {
              time: new Date().toLocaleTimeString('es-CL'),
              event: "Inyector #8 Reemplazado (Local)",
              status: "OK"
            },
            ...newState.maintenance_logs
          ];
        }
      }
      
      return newState;
    });
  };

  // Azimuth drag handler inside SVG
  const handleAzimuthInteraction = (e: React.MouseEvent<SVGSVGElement> | React.TouchEvent<SVGSVGElement>) => {
    if (!azimuthSvgRef.current) return;
    const rect = azimuthSvgRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    // Relative coordinates to SVG center (75, 75)
    const x = clientX - rect.left - 75;
    const y = clientY - rect.top - 75;
    
    // Compute angle in degrees
    let angleRad = Math.atan2(y, x);
    let angleDeg = Math.round((angleRad * 180) / Math.PI) + 90;
    if (angleDeg < 0) angleDeg += 360;
    
    triggerAction('azimuth', { angle: angleDeg });
  };

  // Render SVG Dials (highly efficient, zero layout flutters, pixel-perfect design)
  const drawCircularGauge = (
    value: number, 
    max: number, 
    title: string, 
    unit: string, 
    colorClass: string, 
    glowClass: string,
    alertThreshold?: number
  ) => {
    const radius = 55;
    const circumference = 2 * Math.PI * radius;
    // We only display a 3/4 circle (270 degrees arc)
    const strokeDashoffset = circumference - (Math.min(value, max) / max) * circumference * 0.75;
    
    const isAlerting = alertThreshold !== undefined && value >= alertThreshold;

    return (
      <div className="bg-slate-950 p-4 rounded-sm border border-slate-900 flex flex-col items-center relative overflow-hidden group">
        <svg width="130" height="130" className="transform -rotate-135">
          {/* Background track circle */}
          <circle
            cx="65"
            cy="65"
            r={radius}
            className="stroke-slate-900"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * 0.25}
          />
          {/* Active value indicator arc */}
          <circle
            cx="65"
            cy="65"
            r={radius}
            className={`transition-all duration-300 ease-out ${isAlerting ? 'stroke-rose-500' : colorClass}`}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        {/* Central numerical values */}
        <div className="absolute top-[42px] text-center flex flex-col items-center">
          <span className={`text-xl font-mono font-bold leading-none ${isAlerting ? 'text-rose-400 animate-pulse' : 'text-white'}`}>
            {Math.round(value)}
          </span>
          <span className="text-[9px] uppercase font-mono tracking-widest text-slate-500 mt-1">
            {unit}
          </span>
        </div>

        {/* Bottom Label card */}
        <span className="text-[10px] font-sans font-bold text-slate-400 mt-2 uppercase tracking-wide">
          {title}
        </span>
      </div>
    );
  };

  return (
    <div className="bg-slate-900 border border-slate-850 rounded-sm p-4 lg:p-6 shadow-2xl relative">
      
      {/* Background decoration grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] bg-[size:16px_16px] opacity-15 pointer-events-none" />

      {/* Main Grid Header */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 pb-5 border-b border-slate-800/80 mb-6 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            {/* Live Server Indicator LED */}
            {state.is_rpi_live ? (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-cyan-900/40 border border-cyan-500/30 rounded-sm text-cyan-400 text-[10px] font-mono font-bold uppercase tracking-wider animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                Sincronizado • RPi Valparaíso (En Vivo)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-slate-950 border border-slate-800 rounded-sm text-slate-400 text-[10px] font-mono font-semibold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                Gemelo Digital • Simulador Local
              </span>
            )}
            
            {connected ? (
              <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                <Radio className="w-3.5 h-3.5 animate-pulse" /> Enlace OK
              </span>
            ) : (
              <span className="text-[10px] text-rose-450 font-mono flex items-center gap-1">
                <RefreshCw className="w-3 h-3 animate-spin" /> Conectando...
              </span>
            )}
          </div>

          <h3 className="font-display text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Anchor className="w-6 h-6 text-cyan-400" /> SmartProp ASD
          </h3>
          <p className="text-xs text-slate-400 mt-1 font-sans">
            Consola centralizada de telemando de propulsión y análisis predictivo en tiempo real con IA.
          </p>
        </div>

        {/* Quick specs pill */}
        <div className="flex flex-row flex-wrap items-center gap-3 text-xs bg-slate-950 p-2 rounded-sm border border-slate-850/90 font-mono text-slate-350">
          <div>Hrs Motor: <span className="text-white font-bold">{state.engine_hours.toFixed(2)} Hrs</span></div>
          <div className="text-slate-750">|</div>
          <div>Batería: <span className="text-cyan-450 font-bold">{state.battery_voltage.toFixed(1)}V</span></div>
          <div className="text-slate-750">|</div>
          <div>Carga: <span className="text-cyan-400 font-bold">{state.load.toFixed(0)}%</span></div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap border-b border-slate-800/60 mb-6 relative z-10 gap-1 sm:gap-0">
        <button
          className="flex items-center gap-2 px-4 py-2.5 font-display text-xs font-bold uppercase tracking-wider border-b-2 border-cyan-500 text-cyan-400 bg-cyan-950/20 -mb-[1px] transition-all cursor-default"
        >
          <Activity className="w-4 h-4 text-cyan-400" /> Consola Telemando J1939 & IA
        </button>
        <a
          href="https://andreslandaf.grafana.net/public-dashboards/bab4d26135b64fbead4bf47cefdc7ddc"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 font-display text-xs font-bold uppercase tracking-wider border-b-2 border-transparent text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all cursor-pointer"
        >
          <Layers className="w-4 h-4 text-cyan-400" /> Gemelo Digital Grafana <span className="text-[10px] bg-cyan-950/50 border border-cyan-800/40 text-cyan-400 px-1.5 py-0.5 rounded-sm font-mono font-bold tracking-normal">↗</span>
        </a>
        <a
          href="https://datosmotorcat.streamlit.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 font-display text-xs font-bold uppercase tracking-wider border-b-2 border-transparent text-slate-400 hover:text-orange-400 hover:border-orange-500/50 transition-all cursor-pointer"
        >
          <Brain className="w-4 h-4 text-orange-400 animate-pulse" /> Modelos Analítica IA (Streamlit) <span className="text-[10px] bg-orange-950/50 border border-orange-850/40 text-orange-400 px-1.5 py-0.5 rounded-sm font-mono font-bold tracking-normal">↗</span>
        </a>
      </div>

      {/* Main Core Section: 3-column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 relative z-10">
        
        {/* COLUMN 1: Propulsion controls and levers (Col 4) */}
        <div className="lg:col-span-4 bg-slate-950/45 border border-slate-900 rounded-sm p-4 space-y-5 flex flex-col justify-between">
          <div>
            <h4 className="text-slate-200 font-display text-xs font-bold flex items-center gap-1.5 uppercase tracking-widest border-b border-slate-900 pb-2 mb-3.5">
              <Layers className="w-4 h-4 text-slate-400" /> Telecomandos ASD
            </h4>

            {/* Ignition sub-panel */}
            <div className="space-y-2">
              <span className="block text-[9px] uppercase font-mono tracking-widest text-slate-500">
                Sistema de Activación de Ignición
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => triggerAction('start')}
                  className={`py-3.5 px-3 border rounded-sm font-bold text-[10px] tracking-wider uppercase transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer ${
                    state.running 
                      ? 'bg-cyan-950/20 text-cyan-400 border-cyan-800/40 shadow shadow-cyan-950/40'
                      : 'bg-slate-900/50 text-slate-500 border-slate-900 hover:bg-slate-900 hover:text-cyan-400 hover:border-cyan-500/20'
                  }`}
                >
                  <Play className="w-3 h-3 text-cyan-400 fill-current" /> Arrancar Motor
                </button>
                <button
                  onClick={() => triggerAction('stop')}
                  className={`py-3.5 px-3 border rounded-sm font-bold text-[10px] tracking-wider uppercase transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer ${
                    !state.running
                      ? 'bg-rose-950/25 text-rose-450 border-rose-900/40 shadow'
                      : 'bg-slate-900/50 text-slate-500 border-slate-900 hover:bg-slate-900 hover:text-rose-450 hover:border-rose-500/20'
                  }`}
                >
                  <Square className="w-3 h-3 text-rose-500 fill-current" /> Apagar Motor
                </button>
              </div>
            </div>

            {/* Telegraph Telegraph levers */}
            <div className="space-y-2.5 mt-4">
              <span className="block text-[9px] uppercase font-mono tracking-widest text-slate-500">
                Telemando de Velocidad (Palanca J1939)
              </span>
              <div className="grid grid-cols-2 gap-2">
                {(['FULL', 'HALF', 'SLOW', 'DEAD_SLOW'] as const).map((pos) => {
                  const labelMap = { FULL: 'PLENA carga', HALF: 'MEDIA carga', SLOW: 'DESPACIO', DEAD_SLOW: 'MUY DESPACIO' };
                  const active = state.power_lever === pos && state.running;
                  return (
                    <button
                      key={pos}
                      onClick={() => triggerAction('power', { lever: pos })}
                      className={`p-3 rounded-sm text-center text-[10px] font-bold uppercase border transition-colors cursor-pointer ${
                        active 
                          ? 'bg-cyan-600 text-slate-950 border-cyan-500 font-black' 
                          : 'bg-slate-900 border-slate-850 text-slate-400 hover:text-white hover:border-slate-800'
                      }`}
                    >
                      {labelMap[pos]}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => triggerAction('power', { lever: 'STOP' })}
                className={`w-full py-3 rounded-sm font-display font-black text-center text-xs uppercase cursor-pointer border transition-colors ${
                  state.power_lever === 'STOP' && state.running
                    ? 'bg-amber-500 text-slate-950 border-amber-400'
                    : 'bg-slate-900 border-slate-850 text-slate-400 hover:text-white hover:border-slate-800'
                }`}
              >
                ⬛ PARADA / RALENTÍ
              </button>
            </div>
          </div>

          {/* Azimuth Rotator Dial controller */}
          <div className="bg-slate-950 border border-slate-900/90 p-3 rounded-sm space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-cyan-400">
                Dirección Propulsor Azimutal (ASD)
              </span>
              <span className="text-xs text-white font-mono font-bold bg-slate-900 px-1.5 py-0.5 border border-slate-850">
                {state.azimuth_angle.toFixed(0)}°
              </span>
            </div>

            <div className="flex flex-col items-center">
              <svg 
                ref={azimuthSvgRef}
                width="135" 
                height="135" 
                className="cursor-pointer select-none"
                onClick={handleAzimuthInteraction}
                onMouseMove={(e) => e.buttons === 1 && handleAzimuthInteraction(e)}
                onTouchMove={handleAzimuthInteraction}
              >
                {/* Background Ring */}
                <circle cx="67.5" cy="67.5" r="62" fill="#0c101d" stroke="#101726" strokeWidth="3" />
                <circle cx="67.5" cy="67.5" r="54" fill="transparent" stroke="#1f2d3d" strokeWidth="1" strokeDasharray="3 3" />
                
                {/* Fixed compass markings */}
                <text x="67.5" y="16" fill="#64748b" className="text-[8px] font-mono font-black" textAnchor="middle">N (0° PROA)</text>
                <text x="122" y="70" fill="#64748b" className="text-[8px] font-mono font-black" textAnchor="middle">E (90°)</text>
                <text x="67.5" y="125" fill="#64748b" className="text-[8px] font-mono font-black" textAnchor="middle">S (180°)</text>
                <text x="14" y="70" fill="#64748b" className="text-[8px] font-mono font-black" textAnchor="middle">W (270°)</text>

                {/* Simulated Propeller Azimut line (Thruster blade representation) */}
                {(() => {
                  const radLine = ((state.azimuth_angle - 90) * Math.PI) / 180;
                  const xEnd = 67.5 + 45 * Math.cos(radLine);
                  const yEnd = 67.5 + 45 * Math.sin(radLine);
                  
                  return (
                    <>
                      {/* Heavy engine drive shaft mockup */}
                      <line x1="67.5" y1="67.5" x2={xEnd} y2={yEnd} stroke="#00d2ff" strokeWidth="4" strokeLinecap="round" />
                      {/* Arrowhead / Nozzle prop hull */}
                      <circle cx={xEnd} cy={yEnd} r="7" fill="#00d2ff" className="animate-pulse" />
                    </>
                  );
                })()}

                {/* Central Bearing hub */}
                <circle cx="67.5" cy="67.5" r="9" fill="#151b2b" stroke="#1e2c3d" strokeWidth="2.5" />
              </svg>

              {/* Angle Preset hotkeys */}
              <div className="grid grid-cols-4 gap-1 w-full mt-3">
                {[
                  { deg: 0, label: 'PROA' },
                  { deg: 90, label: 'ESTB' },
                  { deg: 180, label: 'POPA' },
                  { deg: 270, label: 'BABR' }
                ].map((val) => (
                  <button
                    key={val.deg}
                    onClick={() => triggerAction('azimuth', { angle: val.deg })}
                    className="py-1 px-0.5 rounded-sm bg-slate-900 hover:bg-slate-800 text-[9px] font-bold font-mono text-slate-400 hover:text-white border border-slate-850/80 cursor-pointer"
                  >
                    {val.deg}° {val.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* COLUMN 2: Instrumental dials and interactive vectors (Col 4) */}
        <div className="lg:col-span-4 bg-slate-950/20 border border-slate-900 rounded-sm p-4 space-y-4">
          <h4 className="text-slate-200 font-display text-xs font-bold flex items-center gap-1.5 uppercase tracking-widest border-b border-slate-900 pb-2">
            <Compass className="w-4 h-4 text-slate-400" /> Instrumental Principal J1939
          </h4>

          {/* Core SVG Circular meters */}
          <div className="grid grid-cols-2 gap-3">
            {drawCircularGauge(state.rpm, 2500, 'RPM Motor', 'RPM', 'stroke-cyan-500', 'shadow-cyan', 1900)}
            {drawCircularGauge(state.oil, 100, 'Presión Aceite', 'PSI', 'stroke-emerald-400', 'shadow-emerald', 25)}
            {drawCircularGauge(state.temp, 120, 'Temperatura Camisa', '°C', 'stroke-sky-400', 'shadow-sky', 95)}
            {drawCircularGauge(state.boost_pressure, 40, 'Presión Turbo', 'PSI', 'stroke-indigo-400', 'shadow-indigo')}
          </div>

          {/* Bollard Pull indicators (Dynamic towing stress tester) */}
          <div className="bg-slate-950/80 p-3 rounded-sm border border-orange-500/10 box-shadow-[inset_0_0_15px_rgba(249,115,22,0.05)]">
            <div className="flex justify-between items-center text-[10px] font-bold font-sans">
              <span className="text-orange-500 uppercase tracking-widest">Bollard Pull Efectivo</span>
              <span className="text-slate-500 font-mono font-medium">Tiro Máx: 70 t</span>
            </div>

            <div className="text-center py-2 relative">
              <span className="font-mono text-3xl font-extrabold text-orange-400 drop-shadow-[0_0_10px_rgba(249,115,22,0.3)]">
                {state.bollard_pull.toFixed(1)} <span className="text-sm font-sans text-slate-500">t</span>
              </span>
            </div>

            {/* Dynamic Pull level bar */}
            <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-emerald-500 via-orange-500 to-rose-500 h-full transition-all duration-300"
                style={{ width: `${Math.min(100, (state.bollard_pull / 70) * 100)}%` }}
              />
            </div>
          </div>

          {/* Thrust vectors panel */}
          <div className="bg-slate-950 p-3 rounded-sm border border-slate-900 font-mono text-[10px]">
            <span className="block font-sans font-bold text-[9px] text-slate-500 uppercase tracking-widest mb-2">
              Vectores Bidireccionales de Empuje
            </span>
            
            <div className="space-y-3.5">
              {/* Longitudinal vector bar */}
              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>POPA ◀</span>
                  <span className="text-white font-bold">{state.thrust_longitudinal.toFixed(1)} kN</span>
                  <span>▶ PROA</span>
                </div>
                <div className="w-full bg-slate-900 h-3 rounded-sm relative overflow-hidden">
                  <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-slate-700 z-10" />
                  {state.thrust_longitudinal >= 0 ? (
                    <div 
                      className="absolute top-0 bottom-0 left-1/2 bg-cyan-500/80 transition-all"
                      style={{ width: `${Math.min(50, (state.thrust_longitudinal / 686) * 50)}%` }}
                    />
                  ) : (
                    <div 
                      className="absolute top-0 bottom-0 bg-yellow-500/80 transition-all"
                      style={{ 
                        left: `${Math.max(0, 50 - Math.min(50, (Math.abs(state.thrust_longitudinal) / 686) * 50))}%`,
                        width: `${Math.min(50, (Math.abs(state.thrust_longitudinal) / 686) * 50)}%` 
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Transverse vector bar */}
              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>BABOR ◀</span>
                  <span className="text-white font-bold">{state.thrust_transverse.toFixed(1)} kN</span>
                  <span>▶ ESTRIBOR</span>
                </div>
                <div className="w-full bg-slate-900 h-3 rounded-sm relative overflow-hidden">
                  <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-slate-700 z-10" />
                  {state.thrust_transverse >= 0 ? (
                    <div 
                      className="absolute top-0 bottom-0 left-1/2 bg-cyan-500/80 transition-all"
                      style={{ width: `${Math.min(50, (state.thrust_transverse / 686) * 50)}%` }}
                    />
                  ) : (
                    <div 
                      className="absolute top-0 bottom-0 bg-yellow-500/80 transition-all"
                      style={{ 
                        left: `${Math.max(0, 50 - Math.min(50, (Math.abs(state.thrust_transverse) / 686) * 50))}%`,
                        width: `${Math.min(50, (Math.abs(state.thrust_transverse) / 686) * 50)}%` 
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMN 3: AI diagnostics co-pilot and 16-cylinder matrix heat (Col 4) */}
        <div className="lg:col-span-4 bg-slate-950/30 border border-slate-900 rounded-sm p-4 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-slate-900 pb-2">
              <h4 className="text-slate-200 font-display text-xs font-bold flex items-center gap-1.5 uppercase tracking-widest">
                <Cpu className="w-4 h-4 text-cyan-400" /> Copiloto Neuronal Simarp
              </h4>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-orange-950/30 border border-orange-500/20 text-orange-400 rounded-sm text-[8px] font-mono font-bold uppercase">
                Streamlit ML Connected
              </span>
            </div>

            {/* AI Diagnostics Banner */}
            <div className={`p-3.5 rounded-sm border ${
              state.ai_severity === 'danger'
                ? 'bg-rose-500/10 border-rose-500/30'
                : state.ai_severity === 'warning'
                  ? 'bg-amber-500/10 border-amber-500/30'
                  : 'bg-cyan-500/5 border-cyan-500/15'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <div className={`p-1 rounded-sm ${
                  state.ai_severity === 'danger' ? 'text-rose-455 bg-rose-500/10' : 'text-cyan-400 bg-cyan-500/10'
                }`}>
                  <Brain className="w-4 h-4 text-orange-400" />
                </div>
                <div>
                  <span className="block text-[8px] font-mono uppercase text-slate-500 tracking-wider">Pronóstico & Analítica de Motores</span>
                  <span className="block text-[11px] font-bold text-white uppercase tracking-wide">Simarp-Edge Neural Core</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-sans mb-3">
                {state.ai_message}
              </p>

              <div className="bg-slate-950 p-2 rounded-sm border border-slate-900/80 font-mono text-[10px] text-slate-400 flex justify-between mb-3.5">
                <div>RUL Predictivo: <span className={`font-bold ${state.health_score < 70 ? 'text-rose-400' : 'text-cyan-400'}`}>{state.health_score}%</span></div>
                <div>Tendencia: <span className="text-white font-semibold uppercase">{state.ia_prediction}</span></div>
              </div>

              {/* Seamless integration callback to Streamlit Models */}
              <div className="bg-orange-950/20 border border-orange-900/60 rounded-sm p-2.5 space-y-2">
                <span className="block text-[8px] font-mono uppercase font-bold text-orange-400 tracking-wider">
                  Algoritmos de Desgaste (Streamlit)
                </span>
                <p className="text-[10px] text-slate-350 leading-relaxed font-sans">
                  Las correlaciones de temperatura, presión de lubricación y NOx están calibradas bajo el modelo predictivo del motor.
                </p>
                <a 
                  href="https://datosmotorcat.streamlit.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center bg-orange-600/90 hover:bg-orange-500 text-slate-950 text-[10.5px] font-bold py-1.5 px-2 rounded-sm cursor-pointer transition-colors flex items-center justify-center gap-1.5 uppercase tracking-wide"
                >
                  <span>Analizar Regresión en Streamlit</span>
                  <CornerDownRight className="w-3.5 h-3.5 text-slate-950" />
                </a>
              </div>
            </div>

            {/* 16 Cylinders sleeves matrix layout */}
            <div className="bg-slate-950 p-3 rounded-sm border border-slate-900">
              <div className="flex justify-between items-center mb-2.5">
                <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-slate-500">Mapeo Térmico Camisas (16 Cilindros)</span>
                <span className="text-[10px] text-slate-400 font-mono">{state.running ? 'CALIENTE' : 'FRÍO'}</span>
              </div>

              <div className="grid grid-cols-8 gap-1.5 pt-1">
                {state.cylinders.map((cylTemp, idx) => {
                  const maxPossibleSleeveTemp = 480;
                  const ratio = Math.min(100, (cylTemp / maxPossibleSleeveTemp) * 100);
                  
                  // Highlight cylinder #8 specifically if injector failure is triggered
                  const isCylinder8Misfire = state.break_injector && idx === 7;

                  return (
                    <div key={idx} className="flex flex-col items-center">
                      <div className="w-full bg-slate-900 rounded-sm h-14 border border-slate-800/80 flex items-end relative overflow-hidden">
                        
                        {/* Dynamic fluid height */}
                        <div 
                          className={`w-full transition-all duration-700 ease-out ${
                            isCylinder8Misfire 
                              ? 'bg-rose-950/20' 
                              : state.running 
                                ? cylTemp > 310 
                                  ? 'bg-orange-500' 
                                  : 'bg-cyan-500' 
                                : 'bg-slate-800'
                          }`}
                          style={{ height: `${state.running ? ratio : 15}%` }}
                        />

                        {/* Central value overlay */}
                        <span className="absolute top-1 left-0 right-0 text-[8px] font-mono font-bold text-center text-slate-500">
                          {idx + 1}
                        </span>
                        
                        <span className={`absolute bottom-1 left-0 right-0 text-[8px] font-mono text-center leading-none ${
                          isCylinder8Misfire ? 'text-rose-455 font-bold animate-pulse' : 'text-white'
                        }`}>
                          {state.running ? Math.round(cylTemp) : '24'}°
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Connected terminal engine logs */}
          <div className="space-y-1 mt-3">
            <span className="block text-[8px] font-mono uppercase tracking-widest text-slate-500">
              CAN-Bus J1939 Telemetry Logging Feed
            </span>
            <div 
              ref={terminalLogsRef}
              className="bg-slate-950/90 border border-slate-900 p-2.5 h-[100px] overflow-y-auto font-mono text-[10px] text-slate-400 rounded-sm space-y-2"
            >
              <div className="text-slate-600">[{new Date().toLocaleTimeString('es-CL')}] Escuchando tramas de puerto CAN-Bus en red marina local...</div>
              {state.maintenance_logs.map((log, index) => (
                <div key={index} className="leading-normal">
                  <span className="text-slate-650">[{log.time}]</span>{' '}
                  <span className="text-cyan-405 font-medium">{log.event}</span>{' '}
                  <span className="text-slate-500">• {log.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Advanced ECO environmental monitoring banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5 p-3.5 bg-slate-950 border border-slate-900 rounded-sm relative z-10 font-mono text-[11px] text-slate-400">
        <div className="space-y-1">
          <span className="block text-[9px] font-sans font-bold text-slate-500 uppercase tracking-widest">Consejo Energético (ECO-Advisor)</span>
          <div className="flex items-start gap-1.5 mt-1">
            <span className={`px-1.5 py-0.5 rounded text-[8px] font-mono font-bold ${
              state.eco_status === 'ECO' 
                ? 'bg-emerald-950/30 text-emerald-400' 
                : state.eco_status === 'ALTO_CONSUMO' 
                  ? 'bg-rose-950/30 text-rose-455' 
                  : 'bg-slate-900 text-slate-350'
            }`}>
              {state.eco_status}
            </span>
            <p className="text-slate-300 text-[10px] leading-relaxed font-sans">{state.eco_advice}</p>
          </div>
        </div>

        <div className="space-y-1.5 border-t md:border-t-0 md:border-l border-slate-900 pt-2.5 md:pt-0 md:pl-4">
          <span className="block text-[9px] font-sans font-bold text-slate-500 uppercase tracking-widest">Monitoreo de Emisiones NOx y Urea</span>
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            <div>NOx Bruto: <span className="text-orange-455 font-bold">{state.nox_raw.toFixed(0)} ppm</span></div>
            <div>NOx Reducido SCR: <span className="text-emerald-400 font-bold">{state.nox_reduced.toFixed(0)} ppm</span></div>
            <div>Urea: <span className="text-cyan-400 font-bold">{state.def_level.toFixed(1)}%</span></div>
            <div>Consumo: <span className="text-slate-200">{state.def_consumption.toFixed(2)} L/H</span></div>
          </div>
        </div>

        <div className="space-y-1.5 border-t md:border-t-0 md:border-l border-slate-900 pt-2.5 md:pt-0 md:pl-4">
          <span className="block text-[9px] font-sans font-bold text-slate-500 uppercase tracking-widest">Opex & Rendimiento Auxiliar</span>
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            <div>Consumo Comb.: <span className="text-white font-bold">{state.fuel.toFixed(1)} L/H</span></div>
            <div>Exhaust Temp: <span className="text-white font-bold">{state.exhaust.toFixed(1)} °C</span></div>
            <div>Consumo Espec.: <span className="text-white font-bold">{state.specific_consumption.toFixed(3)} L/kWh</span></div>
            <div>Delta T C-Interc: <span className="text-white font-bold">{state.heat_exchanger_delta_t.toFixed(1)} °C</span></div>
          </div>
        </div>
      </div>

      {/* SECTION 4: LAB FAILURE INJECTION & OPERATOR PANEL */}
      <div className="mt-5 pt-4 border-t border-slate-800/80 relative z-10">
        <span className="block text-[10px] font-mono uppercase tracking-[0.25em] text-cyan-400 font-bold mb-3.5">
          👨‍💻 LABORATORIO DE DIAGNÓSTICO INTEGRADO (Inyección de Fallas CAN-Bus)
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          
          {/* Fault Sliders */}
          <div className="bg-slate-950 border border-slate-900 rounded-sm p-3.5 space-y-4">
            <h5 className="text-[10px] font-bold font-sans text-slate-450 uppercase tracking-wider">Fallas de Simulación</h5>
            
            {/* Coolant overheated */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-slate-400">Estrés Térmico Camisa</span>
                <span className="text-rose-455 font-bold">+{state.coolant_offset} °C</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="30" 
                value={state.coolant_offset}
                onChange={(e) => triggerAction('faults', { coolant_offset: parseInt(e.target.value) })}
                className="w-full accent-cyan-500 h-1 bg-slate-900 rounded-sm cursor-pointer"
              />
              <span className="block text-[9px] text-slate-500">Aumenta la resistividad térmica del circuito cerrado de enfriamiento.</span>
            </div>

            {/* Oil Filter restricter */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-slate-400">Obstrucción Filtro Lubricante</span>
                <span className="text-yellow-400 font-bold">{state.filter_clog}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={state.filter_clog}
                onChange={(e) => triggerAction('faults', { filter_clog: parseInt(e.target.value) })}
                className="w-full accent-cyan-500 h-1 bg-slate-900 rounded-sm cursor-pointer"
              />
              <span className="block text-[9px] text-slate-500">Modula lodo hidráulico. Disminuye presión basal del colector secundario.</span>
            </div>
          </div>

          {/* Injector misfire button & trailer resistance slider */}
          <div className="bg-slate-950 border border-slate-900 rounded-sm p-3.5 space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <h5 className="text-[10px] font-bold font-sans text-slate-450 uppercase tracking-wider">Severidad e Inyector #8</h5>
              
              <div className="flex justify-between items-center bg-slate-900/60 p-2.5 rounded-sm border border-slate-900">
                <div>
                  <span className="block text-[11px] font-mono font-semibold text-slate-300">Romper Inyector #8 (Falla)</span>
                  <span className="block text-[9px] text-slate-500 mt-0.5">Simula corte de suministro en el cilindro 8.</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={state.break_injector} 
                    onChange={(e) => triggerAction('faults', { break_injector: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-rose-600 peer-checked:after:bg-white" />
                </label>
              </div>
            </div>

            {/* Towing load multiplier drag */}
            <div className="space-y-2 pt-1 border-t border-slate-900/90">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-orange-400 font-bold uppercase tracking-wide">Carga de Remolque Resuelto</span>
                <span className="text-white font-bold">x{state.resistance_factor.toFixed(1)}</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="35" 
                value={state.resistance_factor * 10}
                onChange={(e) => triggerAction('control', { resistance_factor: parseFloat((parseInt(e.target.value) / 10).toFixed(1)) })}
                className="w-full accent-orange-500 h-1 bg-slate-900 rounded-sm cursor-pointer"
              />
              <div className="flex justify-between text-[8px] text-slate-500">
                <span>LIBRE</span>
                <span>REMOLQUE PESADO</span>
              </div>
            </div>
          </div>

          {/* Maintenance Actions (Operator center) */}
          <div className="bg-slate-950 border border-slate-900 rounded-sm p-3.5 space-y-2.5 flex flex-col justify-between">
            <div>
              <h5 className="text-[10px] font-bold font-sans text-slate-450 uppercase tracking-wider mb-2.5">Acciones de Mantenimiento Correctivo</h5>
              <p className="text-[9px] text-slate-500 leading-normal mb-3">
                Sustituye componentes desgastados o rellena fluidos para restablecer parámetros basales seguros e incrementar el RUL.
              </p>
            </div>

            <div className="space-y-2">
              <button 
                onClick={() => triggerAction('maintenance', { component: 'oil_filter' })}
                className="w-full py-2 px-3 bg-slate-900 hover:bg-slate-800 border border-slate-850 hover:border-slate-800 text-slate-300 hover:text-white rounded-sm text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <Wrench className="w-3.5 h-3.5 text-orange-400" /> Reemplazar Filtro Aceite
              </button>
              
              <button 
                onClick={() => triggerAction('maintenance', { component: 'injector_8' })}
                className="w-full py-2 px-3 bg-slate-900 hover:bg-slate-800 border border-slate-850 hover:border-slate-800 text-slate-300 hover:text-white rounded-sm text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <Zap className="w-3.5 h-3.5 text-cyan-400" /> Reemplazar Inyector #8
              </button>

              <button 
                onClick={() => triggerAction('control', { def_level: 99.9 })}
                className="w-full py-2 px-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-850 text-slate-400 hover:text-cyan-400 rounded-sm text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <Droplets className="w-3.5 h-3.5 text-cyan-500 animate-pulse" /> Recargar Urea (DEF)
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
