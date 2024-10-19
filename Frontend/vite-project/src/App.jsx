import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from './pages/Home';
import Persona from './pages/Persona';
import ReporteCitas from './pages/ReporteCitas';
import AgendarCita from './pages/AgendarCita';
import DetalleCita from './pages/DetalleCita';
import DetalleCitaFinal from './pages/DetalleCitaFinal';

function AppContent() {
  const location = useLocation();
  const excludedPaths = ['/personas', '/pagina2', '/pagina3']; // Agrega más rutas según sea necesario
  const showHeader = !excludedPaths.includes(location.pathname);

  return (
    <div className="grid lg:grid-cols-4 xl:grid-cols-6 min-h-screen">
      <Sidebar />
      <main className="lg:col-span-3 xl:col-span-5 bg-gray-100 p-8 h-screen overflow-y-auto">
        {showHeader && <Header />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Persona" element={<Persona />} />
          <Route path="/Reporte" element={<ReporteCitas />} />
          <Route path="/Agendarcita" element={<AgendarCita />} />
          <Route path="/agendarcita/detallecita" element={<DetalleCita />} />
          <Route path="/agendarcita/detallecita-final" element={<DetalleCitaFinal />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
export default App;