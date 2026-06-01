export type EngineBrand = 'AltaVelocidad' | 'MediaVelocidad' | 'BajaVelocidad';

export interface TelemetryData {
  rpm: number;
  cylinderTemps: number[]; // temperatures of 6 cylinders in °C
  oilPressure: number; // in bar
  vibration: number; // in mm/s
  exhaustTemp: number; // in °C
  status: 'optimal' | 'warning' | 'critical';
}

export interface EngineConfig {
  id: EngineBrand;
  model: string;
  nominalRpm: number;
  cylinderCount: number;
  baseTemp: number;
  baseOilPressure: number;
  baseVibration: number;
  baseExhaustTemp: number;
  powerHp: number;
}

export type AnomalyType = 'none' | 'wear' | 'thermal';

export interface ContactFormData {
  nombre: string;
  email: string;
  cargo: string;
  compania: string;
  flotaSize: number;
  motorBrand: string;
  mensaje: string;
}

export interface SimulationLog {
  timestamp: string;
  type: 'system' | 'ai-alert' | 'telemetry';
  message: string;
}
