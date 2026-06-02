import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="flex items-center justify-center p-8 rounded-sm border border-red-800/30 bg-slate-900/40">
          <div className="text-center space-y-3 max-w-md">
            <div className="inline-flex items-center justify-center bg-red-500/10 p-3 rounded-sm text-red-400 border border-red-500/20">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <p className="text-slate-300 text-sm">
              Algo salió mal en esta sección. El resto del sitio funciona con normalidad.
            </p>
            <p className="text-xs text-slate-500 font-mono">
              {this.state.error?.message}
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
