import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ModalProvider } from './context/ModalContext';
import MobileBottomNav from './components/layout/MobileBottomNav';

// Pages
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';

function App() {
  return (
    <ModalProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <MobileBottomNav />
      </Router>
    </ModalProvider>
  );
}

export default App;