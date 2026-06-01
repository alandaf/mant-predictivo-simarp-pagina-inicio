import express from 'express';
import http from 'http';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { WebSocketServer, WebSocket } from 'ws';

const PORT = 3000;
const RPI_HOST = 'remolcadores.sytes.net:8000';
const RPI_WS_URL = `ws://${RPI_HOST}/ws`;
const RPI_API_URL = `http://${RPI_HOST}/api/engine`;

interface MaintenanceLog {
  time: string;
  event: string;
  status: string;
}

interface TelemetryState {
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

// App configuration and in-memory simulated state
const app = express();
app.use(express.json());

const localState: TelemetryState = {
  running: false,
  rpm: 0.0,
  temp: 24.5,
  oil: 25.0,
  fuel: 0.0,
  load: 0.0,
  exhaust: 180.0,
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
  cylinders: Array(16).fill(0.1),
  health_score: 100,
  ai_message: "Fondeadero Seguro • Sin anomalías",
  ai_severity: "ok",
  specific_consumption: 0.0,
  maintenance_logs: [
    { time: `${new Date().toLocaleTimeString('es-CL')}`, event: "Sistema CAN-Bus Iniciado", status: "OK" },
    { time: `${new Date().toLocaleTimeString('es-CL')}`, event: "Nodos Simarp-Edge Sincronizados", status: "OK" }
  ],
  filter_clog: 0.0,
  coolant_offset: 0.0,
  break_injector: false,
  resistance_factor: 1.0,
  eco_status: "NORMAL",
  eco_advice: "🔹 Operación estándar del buque. Monitoreo predictivo activo.",
  nox_raw: 0.0,
  nox_reduced: 0.0,
  def_level: 94.5,
  def_consumption: 0.0,
  ia_prediction: "SISTEMA APAGADO",
  health_status: "PARADA",
  analyzing: false,
  is_rpi_live: false
};

// Target parameters for smooth interpolation in local simulation
let targetRpm = 0;
let targetAzimuthAngle = 0;

// State of the live connection to Raspberry Pi
let currentRpiData: Partial<TelemetryState> | null = null;
let isRpiConnected = false;
let rpiWsClient: WebSocket | null = null;

// Function to establish a WebSocket client connection to the RPi
function connectToRpi() {
  console.log(`Connecting to Raspberry Pi Telemetry: ${RPI_WS_URL}`);
  
  if (rpiWsClient) {
    try {
      rpiWsClient.terminate();
    } catch (e) {}
  }

  rpiWsClient = new WebSocket(RPI_WS_URL);

  rpiWsClient.on('open', () => {
    console.log('Connected to physical Raspberry Pi WS Server!');
    isRpiConnected = true;
    localState.is_rpi_live = true;
  });

  rpiWsClient.on('message', (messageBuffer) => {
    try {
      const data = JSON.parse(messageBuffer.toString());
      currentRpiData = data;
      isRpiConnected = true;
      localState.is_rpi_live = true;
    } catch (e) {
      console.error('Error parsing telemetry from RPi WebSocket:', e);
    }
  });

  rpiWsClient.on('close', () => {
    if (isRpiConnected) {
      console.log('Disconnected from Raspberry Pi WS. Retrying in 5 seconds...');
    }
    isRpiConnected = false;
    localState.is_rpi_live = false;
    currentRpiData = null;
    setTimeout(connectToRpi, 5000);
  });

  rpiWsClient.on('error', (err) => {
    console.warn(`WebSocket connection to Raspberry Pi failed: ${err.message}. Running on local high-fidelity simulator.`);
    isRpiConnected = false;
    localState.is_rpi_live = false;
    currentRpiData = null;
  });
}

// Start connection attempt asynchronously
connectToRpi();

// Local physics simulation ticks (1 Hz / 1000ms update rate)
setInterval(() => {
  if (isRpiConnected && currentRpiData) {
    // If the RPi is connected, let's keep localState synchronized with the latest RPi data!
    Object.assign(localState, currentRpiData, { is_rpi_live: true });
    return;
  }

  // Otherwise, run high-fidelity simulation
  localState.is_rpi_live = false;
  localState.analyzing = true; // Simarp Edge is always active modeling the digital twin

  // 1. Ignition and RPM Dynamics
  if (localState.running) {
    localState.state = localState.power_lever === 'STOP' ? 'RALENTÍ' : 'EN MARCHA';
    localState.health_status = 'OPERANDO';
    localState.battery_voltage = parseFloat((26.4 + (Math.random() - 0.5) * 0.1).toFixed(1));
    localState.engine_hours += 0.0003; // accum hours
    
    // Determine target RPM from power lever positions
    switch (localState.power_lever) {
      case 'FULL': targetRpm = 2100; break;
      case 'HALF': targetRpm = 1450; break;
      case 'SLOW': targetRpm = 1050; break;
      case 'DEAD_SLOW': targetRpm = 750; break;
      case 'STOP': 
      default: 
        targetRpm = 600; break;
    }
  } else {
    localState.state = 'DETENIDO';
    localState.health_status = 'PARADA';
    targetRpm = 0;
    localState.battery_voltage = parseFloat((24.2 + (Math.random() - 0.5) * 0.05).toFixed(1));
  }

  // Smoothly interpolate RPM (inertia representation)
  const rpmInterpSpeed = localState.running ? 150 : 350; // Faster decelerations
  const rpmDiff = targetRpm - localState.rpm;
  if (Math.abs(rpmDiff) > 5) {
    localState.rpm = Math.round(localState.rpm + Math.sign(rpmDiff) * Math.min(Math.abs(rpmDiff), rpmInterpSpeed));
  } else {
    localState.rpm = targetRpm;
  }

  // Add random motor jitter
  if (localState.rpm > 0) {
    localState.rpm += Math.round((Math.random() - 0.5) * 6);
  }

  // 2. Load and Efficiency Calculations
  if (localState.rpm > 0) {
    const basePct = (localState.rpm / 2100);
    localState.load = parseFloat((basePct * 94 * localState.resistance_factor).toFixed(1));
    if (localState.load > 100) localState.load = 100;
  } else {
    localState.load = 0;
  }

  // 3. Torque & Propulsion - Azimuthing propulsion (ASD)
  localState.propeller_rpm = parseFloat((localState.rpm * 0.38).toFixed(1));
  
  // Interpolate azimuth angle
  const angleDiff = targetAzimuthAngle - localState.azimuth_angle;
  if (Math.abs(angleDiff) > 0.5) {
    localState.azimuth_angle = parseFloat(((localState.azimuth_angle + Math.sign(angleDiff) * Math.min(Math.abs(angleDiff), 25)) % 360).toFixed(1));
  } else {
    localState.azimuth_angle = targetAzimuthAngle;
  }

  // Bollard pull (tons)
  if (localState.rpm > 0) {
    const pullRatio = localState.rpm / 2100;
    localState.bollard_pull = parseFloat((Math.pow(pullRatio, 2.1) * 70 * localState.resistance_factor).toFixed(1));
  } else {
    localState.bollard_pull = 0;
  }

  // Thrust Vector computations (max pull 70t * 9.81 = 686 kN)
  const maxThrustKN = 686;
  const currThrustKN = (localState.bollard_pull / 70) * maxThrustKN;
  localState.thrust_total = currThrustKN;

  // Longitudinal & transverse vectors based on azimuth angle rotation
  // Angle 0 degrees = Proa (ahead) -> pure longitudinal direction
  const rad = ((localState.azimuth_angle - 90) * Math.PI) / 180;
  localState.thrust_longitudinal = parseFloat((currThrustKN * Math.cos(rad) * -1).toFixed(1));
  localState.thrust_transverse = parseFloat((currThrustKN * Math.sin(rad) * -1).toFixed(1));

  // 4. Auxiliary system metrics (Cooling, Oil, Fuel, Air)
  if (localState.rpm > 0) {
    // Boiler / cooling jacket water temp
    const activeHeat = localState.load * 0.45;
    const targetTemp = 60 + activeHeat + localState.coolant_offset;
    const tempDiff = targetTemp - localState.temp;
    localState.temp = parseFloat((localState.temp + Math.sign(tempDiff) * 0.8).toFixed(1));

    // Oil pressure (lower at idle, climbs under load, drops if clogged)
    const baseOil = 25 + (localState.rpm / 2100) * 45;
    const cloggingLoss = localState.filter_clog * 0.25;
    localState.oil = parseFloat((baseOil - cloggingLoss + (Math.random() - 0.5) * 0.8).toFixed(1));
    if (localState.oil < 10) localState.oil = 10;

    // Fuel Consumption L/Hr
    localState.fuel = parseFloat(((localState.rpm / 2100) * 395 * (0.3 + 0.7 * (localState.load / 100))).toFixed(1));

    // Specific Consumption
    localState.specific_consumption = parseFloat((localState.fuel / ((localState.rpm * 2.8) / 1000)).toFixed(3));

    // Turbo Boost
    localState.boost_pressure = parseFloat((Math.pow(localState.rpm / 2100, 1.8) * 32.5).toFixed(1));

    // Exhaust temp
    localState.exhaust = parseFloat((150 + (localState.rpm / 2100) * 330 + (localState.load * 0.4)).toFixed(1));

    // Gearbox
    localState.gearbox_oil_temp = parseFloat((40 + (localState.rpm / 2100) * 35).toFixed(1));
    localState.gearbox_oil_pressure = parseFloat((32 + (localState.rpm / 2100) * 15).toFixed(1));

    // Raw Water seawater delta
    localState.raw_water_pressure = parseFloat((1.2 + (localState.rpm / 2100) * 2.2).toFixed(1));
    localState.heat_exchanger_delta_t = parseFloat((40 + (localState.load * 0.35)).toFixed(1));
  } else {
    // Engine stopped - cooling down slowly to ambient
    const coolRate = 0.15;
    if (localState.temp > 22) localState.temp = parseFloat((localState.temp - coolRate).toFixed(1));
    if (localState.gearbox_oil_temp > 25) localState.gearbox_oil_temp = parseFloat((localState.gearbox_oil_temp - coolRate).toFixed(1));
    localState.oil = parseFloat((25.0 + (Math.random() - 0.5) * 0.2).toFixed(1)); // Static pressure
    localState.fuel = 0.0;
    localState.specific_consumption = 0.0;
    localState.boost_pressure = 0.0;
    localState.exhaust = parseFloat((localState.exhaust > 45 ? localState.exhaust - 3.0 : 45.0).toFixed(1));
    localState.gearbox_oil_pressure = parseFloat((38.5 + (Math.random() - 0.5) * 0.1).toFixed(1));
    localState.raw_water_pressure = 0.0;
    localState.heat_exchanger_delta_t = parseFloat((localState.heat_exchanger_delta_t > 5 ? localState.heat_exchanger_delta_t - 0.5 : 5.0).toFixed(1));
  }

  // 5. Vibration Spectral analysis (micro-fracture simulation)
  let baseVibe = 0.2;
  if (localState.rpm > 0) {
    baseVibe = 0.6 + (localState.rpm / 2100) * 1.8;
  }
  if (localState.break_injector) {
    baseVibe += 1.85; // Cylinder misfire causes severe structural vibration!
  }
  localState.vibration = parseFloat((baseVibe + (Math.random() - 0.5) * 0.05).toFixed(2));

  // 6. Navigation GPS coordinates simulation (steer path)
  if (localState.rpm > 0 && localState.power_lever !== 'STOP') {
    localState.sog = parseFloat(((localState.rpm / 2100) * 13.8 * (1 - (localState.resistance_factor - 1) * 0.25)).toFixed(2));
    localState.cog = localState.azimuth_angle;
    localState.pitch = parseFloat((0.2 + Math.sin(Date.now() / 3000) * 0.4 + (localState.sog * 0.05)).toFixed(2));
    localState.roll = parseFloat((Math.cos(Date.now() / 4200) * 1.5 + (localState.thrust_transverse * 0.02)).toFixed(2));
    
    // Steer position simulation (circular path simulation)
    const speedKnotsFactor = localState.sog * 0.000001;
    const moveRad = (localState.cog * Math.PI) / 180;
    localState.lat += speedKnotsFactor * Math.cos(moveRad);
    localState.lon += speedKnotsFactor * Math.sin(moveRad);
  } else {
    localState.sog = parseFloat((Math.max(0, localState.sog - 0.1)).toFixed(3));
    localState.pitch = parseFloat((Math.sin(Date.now() / 4500) * 0.15).toFixed(2));
    localState.roll = parseFloat((Math.cos(Date.now() / 5500) * 0.4).toFixed(2));
  }

  // 7. Cylinders Heatmap Array (16 cylinders representing heavy ASD diesel engine)
  const activeCylinderCount = 16;
  if (localState.rpm > 0) {
    localState.cylinders = Array.from({ length: activeCylinderCount }).map((_, index) => {
      let cTemp = localState.temp * 4.2 + (Math.sin(index * 0.8) * 14.5) + (Math.random() - 0.5) * 8;
      // If cylinder 8 is offline due to filter clog or malfunctioning injector
      if (localState.break_injector && index === 7) {
        cTemp = localState.temp * 1.2 + (Math.random() - 0.5) * 3; // Lacks combustion! Undercooled cylinder!
      }
      return parseFloat(cTemp.toFixed(1));
    });
  } else {
    localState.cylinders = Array.from({ length: activeCylinderCount }).map(() => parseFloat((localState.temp + (Math.random() - 0.5) * 0.5).toFixed(1)));
  }

  // 8. Eco advisor rules
  if (!localState.running) {
    localState.eco_status = "NORMAL";
    localState.eco_advice = "🔹 Motor apago. Simarp Edge en modo standby de datos.";
    localState.nox_raw = 0.0;
    localState.nox_reduced = 0.0;
    localState.def_level = parseFloat(localState.def_level.toFixed(1));
    localState.def_consumption = 0.0;
  } else {
    localState.def_consumption = parseFloat(((localState.fuel * 0.045)).toFixed(2));
    localState.def_level = Math.max(0, localState.def_level - (localState.def_consumption / 3600));
    
    localState.nox_raw = parseFloat(((localState.rpm / 2100) * 1250).toFixed(1));
    localState.nox_reduced = parseFloat((localState.nox_raw * 0.12).toFixed(1)); // 88% reduction with SCR urea

    if (localState.power_lever === 'FULL' && localState.resistance_factor > 1.8) {
      localState.eco_status = "ALTO_CONSUMO";
      localState.eco_advice = "🚨 CARGA EXTREMA: Torque crítico y alta fricción. Reduzca telemandante a 80%.";
    } else if (localState.power_lever === 'HALF') {
      localState.eco_status = "ECO";
      localState.eco_advice = "✅ PUNTO DE OPERACIÓN ECONÓMICO: Propulsión de paso fino optimizada por AI.";
    } else {
      localState.eco_status = "NORMAL";
      localState.eco_advice = "🔹 Consumo de torque balanceado. Desgaste dentro del límite nominal.";
    }
  }

  // 9. AI Copilot Diagnostics and Predictions
  let baseScore = 100;
  let severity = "ok";
  let message = "Caterpillar CAT 3516B: " + Math.round(localState.propeller_rpm) + " RPM | Empuje: " + localState.thrust_total.toFixed(1) + " kN";
  let prediction = "ESTABLE (RUL: 98.7% - Streamlit CAT)";

  if (!localState.running) {
    prediction = "MOTOR DETENIDO (SINC.)";
    message = "Sistema Listo • Monitoreo Caterpillar CAT calibrado";
  } else {
    if (localState.break_injector) {
      baseScore -= 66;
      severity = "danger";
      message = "❌ ALERTA ROJA (Caterpillar CAT): Falla de encendido (Misfire) cilindro #8. Pérdida de compresión por soplado.";
      prediction = "CRÍTICO: Umbral Blow-by superado en Analítica Streamlit. Requiere Overhaul.";
    } else if (localState.filter_clog > 40) {
      const clogFactor = localState.filter_clog;
      baseScore -= Math.round(clogFactor * 0.4);
      if (localState.filter_clog > 70) {
        severity = "danger";
        message = `⚠️ ADVERTENCIA Caterpillar (Falla de Caudal): Presión de aceite baja por filtro obstruido (${clogFactor.toFixed(0)}%).`;
        prediction = "URGENTE: Degradación severa según regresión de desgaste de cojinetes.";
      } else {
        severity = "warning";
        message = `⚠️ Anomalía de Lubricación: Filtro saturado al ${clogFactor.toFixed(0)}%. Resistencia detectada en modelo predictivo.`;
        prediction = "ALERTA TEMPRANA: Desviación de curva Caterpillar CAT en Streamlit.";
      }
    } else if (localState.temp > 95) {
      baseScore -= 20;
      severity = "warning";
      message = "⚠️ Gradiente crítico en camisa de refrigeración de cilindros de fuerza.";
      prediction = "PREVENTIVO: Monitoree flujo según curvas de eficiencia térmica.";
    }
  }

  localState.health_score = baseScore;
  localState.ai_severity = severity;
  localState.ai_message = message;
  localState.ia_prediction = prediction;
}, 1000);

// Proxy POST endpoints to easily communicate with RPi or fallback locally
app.post('/api/engine/start', (req, res) => {
  console.log('API Command: START');
  if (isRpiConnected) {
    // Proxy to RPi
    http.request({
      host: RPI_HOST.split(':')[0],
      port: parseInt(RPI_HOST.split(':')[1] || '80'),
      path: '/api/engine/start',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, (rpiRes) => {
      rpiRes.on('data', () => {});
      rpiRes.on('end', () => res.json({ success: true, sytes: true }));
    }).on('error', () => {
      localState.running = true;
      res.json({ success: true, fallback: true });
    }).end();
  } else {
    localState.running = true;
    localState.maintenance_logs.unshift({
      time: new Date().toLocaleTimeString('es-CL'),
      event: "Arranque Motor local exitoso (Simulado)",
      status: "OK"
    });
    res.json({ success: true, simulated: true });
  }
});

app.post('/api/engine/stop', (req, res) => {
  console.log('API Command: STOP');
  if (isRpiConnected) {
    http.request({
      host: RPI_HOST.split(':')[0],
      port: parseInt(RPI_HOST.split(':')[1] || '80'),
      path: '/api/engine/stop',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, (rpiRes) => {
      rpiRes.on('data', () => {});
      rpiRes.on('end', () => res.json({ success: true, sytes: true }));
    }).on('error', () => {
      localState.running = false;
      localState.rpm = 0;
      res.json({ success: true, fallback: true });
    }).end();
  } else {
    localState.running = false;
    localState.rpm = 0;
    localState.maintenance_logs.unshift({
      time: new Date().toLocaleTimeString('es-CL'),
      event: "Apagado de Motor local (Simulado)",
      status: "OK"
    });
    res.json({ success: true, simulated: true });
  }
});

app.post('/api/engine/power', (req, res) => {
  const { lever } = req.body;
  console.log(`API Command: POWER -> ${lever}`);
  
  if (isRpiConnected) {
    const postData = JSON.stringify({ lever });
    const clientReq = http.request({
      host: RPI_HOST.split(':')[0],
      port: parseInt(RPI_HOST.split(':')[1] || '80'),
      path: '/api/engine/power',
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (rpiRes) => {
      rpiRes.on('data', () => {});
      rpiRes.on('end', () => res.json({ success: true, sytes: true }));
    });
    clientReq.on('error', () => {
      localState.power_lever = lever;
      res.json({ success: true, fallback: true });
    });
    clientReq.write(postData);
    clientReq.end();
  } else {
    localState.power_lever = lever;
    res.json({ success: true, simulated: true });
  }
});

app.post('/api/engine/azimuth', (req, res) => {
  const { angle } = req.body;
  console.log(`API Command: AZIMUTH -> ${angle}°`);
  
  if (isRpiConnected) {
    const postData = JSON.stringify({ angle });
    const clientReq = http.request({
      host: RPI_HOST.split(':')[0],
      port: parseInt(RPI_HOST.split(':')[1] || '80'),
      path: '/api/engine/azimuth',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (rpiRes) => {
      rpiRes.on('data', () => {});
      rpiRes.on('end', () => res.json({ success: true, sytes: true }));
    });
    clientReq.on('error', () => {
      targetAzimuthAngle = angle;
      res.json({ success: true, fallback: true });
    });
    clientReq.write(postData);
    clientReq.end();
  } else {
    targetAzimuthAngle = angle;
    res.json({ success: true, simulated: true });
  }
});

app.post('/api/engine/control', (req, res) => {
  console.log('API Command: CONTROL', req.body);
  const postData = JSON.stringify(req.body);
  
  if (isRpiConnected) {
    const clientReq = http.request({
      host: RPI_HOST.split(':')[0],
      port: parseInt(RPI_HOST.split(':')[1] || '80'),
      path: '/api/engine/control',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (rpiRes) => {
      rpiRes.on('data', () => {});
      rpiRes.on('end', () => res.json({ success: true, sytes: true }));
    });
    clientReq.on('error', () => {
      if (req.body.resistance_factor !== undefined) localState.resistance_factor = req.body.resistance_factor;
      res.json({ success: true, fallback: true });
    });
    clientReq.write(postData);
    clientReq.end();
  } else {
    if (req.body.resistance_factor !== undefined) localState.resistance_factor = req.body.resistance_factor;
    res.json({ success: true, simulated: true });
  }
});

app.post('/api/engine/faults', (req, res) => {
  console.log('API Command: FAULTS', req.body);
  const postData = JSON.stringify(req.body);
  
  if (isRpiConnected) {
    const clientReq = http.request({
      host: RPI_HOST.split(':')[0],
      port: parseInt(RPI_HOST.split(':')[1] || '80'),
      path: '/api/engine/faults',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (rpiRes) => {
      rpiRes.on('data', () => {});
      rpiRes.on('end', () => res.json({ success: true, sytes: true }));
    });
    clientReq.on('error', () => {
      if (req.body.coolant_offset !== undefined) localState.coolant_offset = req.body.coolant_offset;
      if (req.body.filter_clog !== undefined) localState.filter_clog = req.body.filter_clog;
      if (req.body.break_injector !== undefined) localState.break_injector = req.body.break_injector;
      res.json({ success: true, fallback: true });
    });
    clientReq.write(postData);
    clientReq.end();
  } else {
    if (req.body.coolant_offset !== undefined) localState.coolant_offset = req.body.coolant_offset;
    if (req.body.filter_clog !== undefined) localState.filter_clog = req.body.filter_clog;
    if (req.body.break_injector !== undefined) localState.break_injector = req.body.break_injector;
    res.json({ success: true, simulated: true });
  }
});

app.post('/api/engine/maintenance', (req, res) => {
  console.log('API Command: MAINTENANCE', req.body);
  const postData = JSON.stringify(req.body);
  
  if (isRpiConnected) {
    const clientReq = http.request({
      host: RPI_HOST.split(':')[0],
      port: parseInt(RPI_HOST.split(':')[1] || '80'),
      path: '/api/engine/maintenance',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (rpiRes) => {
      rpiRes.on('data', () => {});
      rpiRes.on('end', () => res.json({ success: true, sytes: true }));
    });
    clientReq.on('error', () => {
      if (req.body.component === 'oil_filter') {
        localState.filter_clog = 0.0;
        localState.maintenance_logs.unshift({
          time: new Date().toLocaleTimeString('es-CL'),
          event: "Filtro de Aceite Reemplazado (Mantenimiento)",
          status: "OK"
        });
      }
      if (req.body.component === 'injector_8' || req.body.component === 'injector') {
        localState.break_injector = false;
        localState.maintenance_logs.unshift({
          time: new Date().toLocaleTimeString('es-CL'),
          event: "Inyector #8 Reemplazado (Mantenimiento)",
          status: "OK"
        });
      }
      res.json({ success: true, fallback: true });
    });
    clientReq.write(postData);
    clientReq.end();
  } else {
    if (req.body.component === 'oil_filter') {
      localState.filter_clog = 0.0;
      localState.maintenance_logs.unshift({
        time: new Date().toLocaleTimeString('es-CL'),
        event: "Filtro de Aceite Reemplazado (Local)",
        status: "OK"
      });
    }
    if (req.body.component === 'injector_8' || req.body.component === 'injector' || req.body.component === 'injector_8') {
      localState.break_injector = false;
      localState.maintenance_logs.unshift({
        time: new Date().toLocaleTimeString('es-CL'),
        event: "Inyector #8 Reemplazado (Local)",
        status: "OK"
      });
    }
    res.json({ success: true, simulated: true });
  }
});

// Setup Node HTTP + WS Server Together
const httpServer = http.createServer(app);
const wss = new WebSocketServer({ server: httpServer, path: '/ws' });

// Front-end WebSocket clients array
const clients = new Set<WebSocket>();

wss.on('connection', (ws) => {
  clients.add(ws);
  console.log(`Front-end client connected securely! Total clients: ${clients.size}`);
  
  // Send immediate first state payload
  ws.send(JSON.stringify(localState));

  ws.on('close', () => {
    clients.delete(ws);
    console.log(`Front-end client disconnected. Total clients: ${clients.size}`);
  });
  
  ws.on('error', () => {
    clients.delete(ws);
  });
});

// Forward/Broadcasting telemetry updates on localState change to all connected frontends (1 Hz)
setInterval(() => {
  if (clients.size > 0) {
    const rawData = JSON.stringify(localState);
    for (const client of clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(rawData);
      }
    }
  }
}, 1000);

// Vite middleware & Static Host
async function initializeApp() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Server executing successfully on port ${PORT}`);
    console.log(`Container environment operational. Host accessible at http://localhost:${PORT}`);
  });
}

initializeApp().catch((err) => {
  console.error('Failure initializing custom full-stack server middleware:', err);
});
