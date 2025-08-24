// import React, { ReactNode } from "react";

// interface State {
//   hasError: boolean;
// }

// interface ErrorBoundaryProps {
//   children: ReactNode;
// }

// class ErrorBoundary extends React.Component<ErrorBoundaryProps, State> {
//   constructor(props: ErrorBoundaryProps) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError(_: Error): State {
//     return { hasError: true };
//   }

//   componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
//     console.error("ErrorBoundary caught an error:", { error, errorInfo });
//   }

//   render() {
//     if (this.state.hasError) {
//       return (
//         <div style={{ padding: "2rem", textAlign: "center" }}>
//           <h2>⚠️ Oops, there is an error!</h2>
//           <button
//             onClick={() => this.setState({ hasError: false })}
//             style={{
//               marginTop: "1rem",
//               padding: "0.5rem 1rem",
//               borderRadius: "8px",
//               background: "#0070f3",
//               color: "#fff",
//               border: "none",
//               cursor: "pointer",
//             }}
//           >
//             🔄 Try again
//           </button>
//         </div>
//       );
//     }

//     return this.props.children;
//   }
// }

// export default ErrorBoundary;








import * as Sentry from "@sentry/nextjs";
import React, { ReactNode } from "react";

interface State {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, State> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", { error, errorInfo });

    // ✅ Fix: cast or map errorInfo into an object
    Sentry.captureException(error, {
      extra: { componentStack: errorInfo.componentStack },
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <h2>⚠️ Oops, there is an error!</h2>
          <button
            onClick={() => this.setState({ hasError: false })}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              background: "#0070f3",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            🔄 Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

