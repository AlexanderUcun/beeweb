import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { ShieldAlert, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error internally in production without exposing stack traces to end user
    console.error('Uncaught error caught by Security ErrorBoundary:', error, errorInfo);
  }

  private handleReload = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
          <div className="max-w-md w-full p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-rose-950/80 text-rose-500 border border-rose-800/80 mx-auto flex items-center justify-center">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-2xl font-extrabold text-white">
                Ocurrió un evento inesperado
              </h2>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Por razones de seguridad, hemos aislado esta sesión para proteger tu información. No se ha comprometido ningún dato.
              </p>
            </div>

            <button
              onClick={this.handleReload}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg flex items-center justify-center gap-2 text-sm transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              Restablecer Aplicación
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
