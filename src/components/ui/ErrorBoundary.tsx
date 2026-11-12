import { Component, type ReactNode } from 'react';
import { COLORS } from '../../constants';

interface Props { children: ReactNode }
interface State { error: Error | null }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };
  static getDerivedStateFromError(error: Error): State { return { error }; }
  componentDidCatch(error: Error, info: unknown) {
    console.error('ErrorBoundary caught:', error, info);
  }
  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6"
             style={{ backgroundColor: COLORS.background, color: COLORS.text }}>
          <div className="max-w-lg text-center">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <pre className="text-xs text-left p-4 rounded-lg overflow-auto"
                 style={{ backgroundColor: `${COLORS.accent}15`, color: COLORS.textSecondary }}>
              {this.state.error.message}
            </pre>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}