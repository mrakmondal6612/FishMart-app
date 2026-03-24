
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { GlobalLoadingProvider } from './hooks/GlobalLoading';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <GlobalLoadingProvider>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </BrowserRouter>
  </GlobalLoadingProvider>
);
