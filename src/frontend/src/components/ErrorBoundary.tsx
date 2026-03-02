import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      errorMessage: error?.message || "Unknown error",
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }

  handleRefresh = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "oklch(0.14 0.05 258)",
            padding: "24px",
            textAlign: "center",
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              backgroundColor: "oklch(0.6 0.2 25 / 0.15)",
              border: "2px solid oklch(0.6 0.2 25 / 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "20px",
              fontSize: "32px",
            }}
          >
            ⚠️
          </div>

          <h2
            style={{
              color: "oklch(0.88 0.12 80)",
              fontSize: "22px",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            Kuch Galat Ho Gaya
          </h2>

          <p
            style={{
              color: "oklch(0.72 0.04 240)",
              fontSize: "14px",
              maxWidth: "320px",
              lineHeight: "1.6",
              marginBottom: "28px",
            }}
          >
            Website load hone mein ek chhoti si problem aayi. Ghabrayein nahi --
            page refresh karne par sab theek ho jayega.
          </p>

          <button
            type="button"
            onClick={this.handleRefresh}
            data-ocid="error.refresh.button"
            style={{
              backgroundColor: "oklch(0.78 0.16 75)",
              color: "oklch(0.12 0.04 250)",
              border: "none",
              borderRadius: "8px",
              padding: "12px 28px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              marginBottom: "16px",
            }}
          >
            🔄 Page Refresh Karein
          </button>

          <a
            href="https://wa.me/919891331853"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "oklch(0.6 0.04 240)",
              fontSize: "12px",
              textDecoration: "underline",
            }}
          >
            Agar problem bani rahe toh WhatsApp karein: 9891331853
          </a>
        </div>
      );
    }

    return this.props.children;
  }
}
