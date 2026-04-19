import "./i18n/config";
import { useState } from 'react'
import './App.css'
import AppRoutes from './routes/app-routes';
import { ThemeContext } from '@/theme/theme-context';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ThemeProviderWrapper from "@/theme/theme-provider-wrapper";

function App() {

  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const toggleTheme = () => {
    setMode(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      <ThemeProviderWrapper mode={mode}>
        <ToastContainer
          position="top-center"
          transition={Slide}
        />
        <AppRoutes />
      </ThemeProviderWrapper>
    </ThemeContext.Provider>

  );
}

export default App
