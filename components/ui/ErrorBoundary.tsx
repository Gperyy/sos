import React from "react";

interface Props {
  children: React.ReactNode;
  /** Hata olursa gösterilecek içerik (varsayılan: hiçbir şey — bölüm sessizce gizlenir). */
  fallback?: React.ReactNode;
}

/**
 * Bir bölümde oluşan hata bütün sayfayı götürmesin. React, yakalanmamış bir hatada tüm ağacı
 * kaldırır ve sayfa bembeyaz kalır; bu sınır hatayı yalnızca sardığı bölümle sınırlar.
 */
class ErrorBoundary extends React.Component<Props, { failed: boolean }> {
  // Projede @types/react yok; props tipini açıkça bildir
  declare props: Props;
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.error("[ErrorBoundary]", error);
  }

  render() {
    return this.state.failed ? this.props.fallback ?? null : this.props.children;
  }
}

export default ErrorBoundary;
