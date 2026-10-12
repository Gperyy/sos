import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ErrorBoundary } from './components/ui';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Son çare: uygulamanın tamamı çökerse boş beyaz sayfa yerine yenileme seçeneği göster
const LoadError = () => (
  <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6 text-center">
    <p className="text-lg font-bold">Sayfa yüklenirken bir sorun oluştu.</p>
    <button
      type="button"
      onClick={() => window.location.reload()}
      className="bg-primary text-white px-6 py-3 font-bold uppercase"
    >
      Yenile
    </button>
  </div>
);

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary fallback={<LoadError />}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);