import React, { useState, useEffect } from 'react';
import { Home, CalendarSearch, Activity, AArrowUp } from 'lucide-react';
import HomePage from './pages/HomePage';
import BookAppointmentPage from './pages/BookAppointmentPage';
import MyAppointmentPage from './pages/MyAppointmentPage';

const App = () => {
  // Navigation State
  // Valid pages: 'home', 'book', 'my-appointment'
  const [activePage, setActivePage] = useState('home');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  
  // Appointment State
  const [appointment, setAppointment] = useState(null);
  
  // Accessibility State
  const [largeTextMode, setLargeTextMode] = useState(false);

  // Load appointment from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('medelite_appointment');
    if (saved) {
      try {
        setAppointment(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse appointment", e);
      }
    }
    
    const savedTextMode = localStorage.getItem('medelite_large_text');
    if (savedTextMode === 'true') {
      setLargeTextMode(true);
      document.body.classList.add('large-text-mode');
    }
  }, []);

  // Handlers
  const handleBookDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setActivePage('book');
    window.scrollTo(0, 0);
  };

  const handleConfirmAppointment = (appointmentDetails) => {
    setAppointment(appointmentDetails);
    localStorage.setItem('medelite_appointment', JSON.stringify(appointmentDetails));
    setActivePage('my-appointment');
    window.scrollTo(0, 0);
  };

  const handleCancelAppointment = () => {
    if (appointment) {
      const updated = { ...appointment, status: "Cancelled" };
      setAppointment(updated);
      localStorage.setItem('medelite_appointment', JSON.stringify(updated));
    }
  };

  const toggleLargeText = () => {
    const newVal = !largeTextMode;
    setLargeTextMode(newVal);
    localStorage.setItem('medelite_large_text', String(newVal));
    if (newVal) {
      document.body.classList.add('large-text-mode');
    } else {
      document.body.classList.remove('large-text-mode');
    }
  };

  // Main Render
  return (
    <div className="app-shell">
      
      {/* Header */}
      <header className="header">
        <div className="brand-container">
          <div className="brand-icon">
            <Activity size={28} />
          </div>
          <div>
            <h1 className="brand-title">MedElite</h1>
            <div className="brand-subtitle">Senior Care</div>
          </div>
        </div>
        <button 
          className="text-size-btn" 
          onClick={toggleLargeText}
          aria-label="Toggle large text size"
        >
          <AArrowUp size={20} />
          {largeTextMode ? "A-" : "A+"}
        </button>
      </header>

      {/* Pages Router */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {activePage === 'home' && (
          <HomePage onBookDoctor={handleBookDoctor} />
        )}
        
        {activePage === 'book' && (
          <BookAppointmentPage 
            doctor={selectedDoctor} 
            onBack={() => setActivePage('home')}
            onConfirm={handleConfirmAppointment}
          />
        )}

        {activePage === 'my-appointment' && (
          <MyAppointmentPage 
            appointment={appointment}
            onCancel={handleCancelAppointment}
            onGoHome={() => setActivePage('home')}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <button 
          className={`nav-item ${activePage === 'home' ? 'active' : ''}`}
          onClick={() => {
            setActivePage('home');
            window.scrollTo(0, 0);
          }}
        >
          <Home className="nav-icon" />
          <span>Home</span>
        </button>

        <button 
          className={`nav-item ${activePage === 'my-appointment' ? 'active' : ''}`}
          onClick={() => {
            setActivePage('my-appointment');
            window.scrollTo(0, 0);
          }}
        >
          <CalendarSearch className="nav-icon" />
          <span>My Appointment</span>
          {appointment && appointment.status === "Confirmed" && (
            <div className="badge-dot"></div>
          )}
        </button>
      </nav>

    </div>
  );
};

export default App;
