import React, { useState } from 'react';
import { 
  Send, CheckCircle, Ship, Lock, Mail, Building, User, FileText, ChevronRight, X
} from 'lucide-react';
import { ContactFormData } from '../types';

interface ContactFormProps {
  isModal?: boolean;
  onClose?: () => void;
}

export default function ContactForm({ isModal = false, onClose }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    nombre: '',
    email: '',
    cargo: '',
    compania: '',
    flotaSize: 3,
    motorBrand: 'Diésel 4 Tiempos (Alta Velocidad)',
    mensaje: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.email || !formData.compania) {
      setErrorMessage('Por favor complete todos los campos obligatorios (*).');
      return;
    }

    setErrorMessage('');
    setStatus('submitting');
    
    // Simulate marine integration API submission
    setTimeout(() => {
      setStatus('success');
    }, 1800);
  };

  const formContent = (
    <div className="text-left font-sans">
      {status === 'success' ? (
        <div className="py-8 px-4 text-center space-y-4">
          <div className="inline-flex items-center justify-center bg-cyan-500/10 p-4 rounded-sm text-cyan-400 border border-cyan-500/35 mb-2">
            <CheckCircle className="w-12 h-12" />
          </div>
          <h3 className="font-display text-2xl font-bold text-white tracking-tight">
            ¡Estudio de Factibilidad Iniciado!
          </h3>
          <p className="text-slate-350 text-sm max-w-md mx-auto leading-relaxed">
            Estimado/a <strong>{formData.nombre}</strong>, hemos registrado tu solicitud para la flota de <strong>{formData.compania}</strong>. 
          </p>
          <div className="bg-slate-900 border border-slate-800 rounded-sm p-4 text-xs text-slate-400 max-w-sm mx-auto space-y-2 text-left">
            <p className="font-semibold text-slate-200">Próximos pasos de Simarp:</p>
            <p>• <strong>Análisis Técnico:</strong> Un Ingeniero Naval revisará las especificaciones de motores {formData.motorBrand}.</p>
            <p>• <strong>Contacto Directo:</strong> Te enviaremos un email a {formData.email} en menos de 10 horas hábiles para agendar la llamada técnica por Teams o WhatsApp.</p>
          </div>
          <div className="pt-4">
            {isModal && onClose ? (
              <button
                onClick={onClose}
                className="bg-slate-800 hover:bg-slate-750 text-white px-5 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-colors duration-100 cursor-pointer"
              >
                Cerrar Ventana
              </button>
            ) : (
              <button
                onClick={() => {
                  setStatus('idle');
                  setFormData({
                    nombre: '',
                    email: '',
                    cargo: '',
                    compania: '',
                    flotaSize: 3,
                    motorBrand: 'Diésel 4 Tiempos (Alta Velocidad)',
                    mensaje: ''
                  });
                }}
                className="text-cyan-400 hover:text-cyan-300 font-bold text-xs font-mono uppercase tracking-widest cursor-pointer"
              >
                Enviar otra solicitud
              </button>
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-5">
          {errorMessage && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-sm text-xs">
              {errorMessage}
            </div>
          )}

          {/* Section: Title */}
          {!isModal && (
            <div className="mb-6">
              <span className="text-cyan-400 font-mono text-xs uppercase tracking-[0.15em] block mb-1 font-bold">
                Conexión Inmediata
              </span>
              <h3 className="font-display text-2xl lg:text-3xl font-bold text-white tracking-tight">
                Agenda tu Demo Técnica Sin Costo
              </h3>
              <p className="text-xs text-slate-400 mt-2">
                Conectamos un nodo de prueba en tu buque bandera por 30 días para demostrar valor antes de integrar toda la flota.
              </p>
            </div>
          )}

          {/* Double Column Grid: Nombre & Cargo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-slate-350 text-xs font-medium flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-500" /> Nombre de Contacto *
              </label>
              <input
                type="text"
                required
                placeholder="Ej. Ing. Carlos Mendoza"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className="w-full bg-slate-950 border border-slate-850 focus:border-cyan-550 focus:ring-1 focus:ring-cyan-550 focus:outline-none rounded-sm px-3.5 py-2.5 text-sm text-white placeholder-slate-600 transition-colors duration-150"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-350 text-xs font-medium flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-slate-500" /> Cargo / Rango a Bordo
              </label>
              <input
                type="text"
                placeholder="Ej. Superintendente de Flota / Jefe de Máquinas"
                value={formData.cargo}
                onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                className="w-full bg-slate-950 border border-slate-850 focus:border-cyan-550 focus:ring-1 focus:ring-cyan-550 focus:outline-none rounded-sm px-3.5 py-2.5 text-sm text-white placeholder-slate-600 transition-colors duration-150"
              />
            </div>
          </div>

          {/* Double Column Grid: Email & Compania */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-slate-355 text-xs font-medium flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-500" /> Correo Corporativo *
              </label>
              <input
                type="email"
                required
                placeholder="Ej. c.mendoza@navierasur.cl"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-950 border border-slate-850 focus:border-cyan-550 focus:ring-1 focus:ring-cyan-550 focus:outline-none rounded-sm px-3.5 py-2.5 text-sm text-white placeholder-slate-600 transition-colors duration-150"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-355 text-xs font-medium flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-slate-500" /> Compañía Naviera / Armador *
              </label>
              <input
                type="text"
                required
                placeholder="Ej. Naviera del Sur S.A."
                value={formData.compania}
                onChange={(e) => setFormData({ ...formData, compania: e.target.value })}
                className="w-full bg-slate-950 border border-slate-850 focus:border-cyan-550 focus:ring-1 focus:ring-cyan-550 focus:outline-none rounded-sm px-3.5 py-2.5 text-sm text-white placeholder-slate-600 transition-colors duration-150"
              />
            </div>
          </div>

          {/* Double Column Grid: Fleet details & Engine brands */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-slate-355 text-xs font-medium flex items-center gap-1.5">
                <Ship className="w-3.5 h-3.5 text-slate-400" /> Tamaño de Flota Activa
              </label>
              <select
                value={formData.flotaSize}
                onChange={(e) => setFormData({ ...formData, flotaSize: parseInt(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-850 focus:border-cyan-550 focus:ring-1 focus:ring-cyan-550 focus:outline-none rounded-sm px-3.5 py-2.5 text-sm text-slate-300 transition-colors duration-150"
              >
                <option value="1">1 Buque</option>
                <option value="3">2 a 5 Buques</option>
                <option value="8">6 a 12 Buques</option>
                <option value="18">Más de 12 Buques</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-355 text-xs font-medium flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-slate-500" /> Tipo de Motor Predominante
              </label>
              <select
                value={formData.motorBrand}
                onChange={(e) => setFormData({ ...formData, motorBrand: e.target.value })}
                className="w-full bg-slate-950 border border-slate-850 focus:border-cyan-550 focus:ring-1 focus:ring-cyan-550 focus:outline-none rounded-sm px-3.5 py-2.5 text-sm text-slate-300 transition-colors duration-150"
              >
                <option value="Diésel 4 Tiempos (Alta Velocidad)">Diésel 4 Tiempos (Alta Velocidad)</option>
                <option value="Diésel 4 Tiempos (Media Velocidad)">Diésel 4 Tiempos (Media Velocidad)</option>
                <option value="Diésel 2 Tiempos (Baja Velocidad)">Diésel 2 Tiempos (Baja Velocidad)</option>
                <option value="Motores Auxiliares / Generadores">Motores Auxiliares / Generadores</option>
                <option value="Múltiples / Otros">Múltiples / Otros</option>
              </select>
            </div>
          </div>

          {/* Textarea: Message */}
          <div className="space-y-1.5">
            <label className="text-slate-355 text-xs font-medium">
              Detalle de Motores o Consulta (Opcional)
            </label>
            <textarea
              rows={3}
              placeholder="Ej. Motores principales de 4 tiempos y auxiliares de alta velocidad. Interesados en monitoreo de vibración y temperaturas de escape."
              value={formData.mensaje}
              onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
              className="w-full bg-slate-950 border border-slate-850 focus:border-cyan-550 focus:ring-1 focus:ring-cyan-550 focus:outline-none rounded-sm px-3.5 py-2.5 text-sm text-white placeholder-slate-650 transition-colors duration-150"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full bg-cyan-600 hover:bg-cyan-500 text-slate-950 py-3.5 rounded-sm font-bold text-xs tracking-widest cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 flex items-center justify-center gap-2 uppercase"
            >
              {status === 'submitting' ? (
                <>
                  <Ship className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Enviando requerimiento técnico...</span>
                </>
              ) : (
                <>
                  <span>Enviar Requerimiento y Agendar Demo</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
            <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 font-mono mt-3 text-center">
              <Lock className="w-3 h-3 text-cyan-400" />
              <span className="uppercase tracking-wider">Privacidad Marítima Garantizada • Encriptación J1939 Segura</span>
            </div>
          </div>
        </form>
      )}
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm"
        />
        
        {/* Modal content */}
        <div className="bg-slate-900 border border-slate-800 rounded-sm w-full max-w-lg p-5 lg:p-7 shadow-2xl relative z-10 text-white overflow-hidden">
          <div className="absolute top-0 right-0 p-3">
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-1">
              <div className="bg-cyan-500/10 p-1.5 rounded-sm text-cyan-400 border border-slate-800">
                <Ship className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="text-cyan-400 font-mono text-[11px] uppercase tracking-[0.15em] font-bold">
                Naviera Simarp
              </span>
            </div>
            <h3 className="font-display text-xl font-bold text-white tracking-tight">
              Solicitud de Demo Gratuita
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Recibe un informe de factibilidad y agenda la llamada con nuestros ingenieros.
            </p>
          </div>
          
          {formContent}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/40 border border-slate-850 rounded-sm p-6 lg:p-8 relative">
      <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
      {formContent}
    </div>
  );
}
