// ErrorBoundary.tsx
import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error }>;
}

/**
 * Компонент-перехватчик ошибок для безопасной обработки сбоев в дочерних компонентах
 * 
 * @component
 * @class
 * 
 * @example
 * ```tsx
 * // Базовое использование
 * <ErrorBoundary>
 *   <UnstableComponent />
 * </ErrorBoundary>
 * 
 * // С кастомным fallback компонентом
 * <ErrorBoundary fallback={CustomErrorFallback}>
 *   <UnstableComponent />
 * </ErrorBoundary>
 * ```
 * 
 * @param {ErrorBoundaryProps} props - Свойства компонента
 * @param {React.ReactNode} props.children - Дочерние компоненты для отслеживания ошибок
 * @param {React.ComponentType<{ error: Error }>} [props.fallback] - Кастомный компонент для отображения при ошибке
 * 
 * @extends React.Component<ErrorBoundaryProps, ErrorBoundaryState>
 */
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  /**
   * @constructor
   * @param {ErrorBoundaryProps} props - Свойства компонента
   */
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  /**
   * Статический метод для обновления состояния при возникновении ошибки
   * 
   * @static
   * @param {Error} error - Объект ошибки
   * @returns {ErrorBoundaryState} Новое состояние компонента
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  /**
   * Метод жизненного цикла для логирования ошибок
   * 
   * @param {Error} error - Объект ошибки
   * @param {React.ErrorInfo} errorInfo - Информация об ошибке
   */
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  /**
   * Метод рендеринга компонента
   * 
   * @returns {JSX.Element} Дочерние компоненты или fallback UI при ошибке
   */
  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error!} />;
      }

      return (
        <div
          style={{
            padding: '2rem',
            textAlign: 'center',
            border: '1px solid #e53e3e',
            borderRadius: '8px',
            margin: '1rem 0',
          }}
        >
          <h3>Something went wrong</h3>
          <p>We're sorry, but this component encountered an error.</p>
          <details style={{ textAlign: 'left', marginTop: '1rem' }}>
            <summary>Error details</summary>
            <pre
              style={{
                background: '#f5f5f5',
                padding: '1rem',
                borderRadius: '4px',
                overflow: 'auto',
              }}
            >
              {this.state.error?.toString()}
            </pre>
          </details>
          <button
            onClick={() => this.setState({ hasError: false })}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              background: '#3182ce',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;