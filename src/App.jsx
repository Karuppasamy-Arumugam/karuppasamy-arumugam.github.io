import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { PortfolioDataProvider } from './context/PortfolioDataContext';
import { AppRoutes } from './routes';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <PortfolioDataProvider>
              <AppRoutes />
            </PortfolioDataProvider>
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;