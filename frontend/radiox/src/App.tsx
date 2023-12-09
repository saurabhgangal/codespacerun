import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { indigo, pink } from '@mui/material/colors';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import DwvComponent from './DwvComponent';
import LandingPage from './Pages/LandingPage';
import DoctorPortal from './Pages/DoctorPortal';
import DwvPage from './Pages/DwvPage';
import LoginPage from './Pages/LoginPage';

export default function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = createTheme({
    typography: {
      useNextVariants: true,
    },
    palette: {
      primary: {
        main: indigo[500],
      },
      secondary: {
        main: pink[500],
      },
      // mode: prefersDarkMode ? 'dark' : 'light',
      mode: 'light'
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <DwvComponent /> */}
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/doctor" element={<DoctorPortal />} />
          <Route path="/dwv" element={<DwvComponent />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dwv/:doctorId/:patientId" element={<DwvPage />} />

        </Routes>
      </Router>
    </ThemeProvider>
  );
}
