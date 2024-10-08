import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Work from './Pages/Work';
import Contact from './Pages/Contact';
import ProjectDetails from './Pages/ProjectDetails';
import ProjectCreationForm from './Pages/Dashboard';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/work" element={<Work />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/dashboard" element={<ProjectCreationForm />} />
      </Routes>
    </Router>
  );
}

export default App;
