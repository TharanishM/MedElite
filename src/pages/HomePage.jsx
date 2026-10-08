import React, { useState } from 'react';
import { Search } from 'lucide-react';
import DoctorCard from '../components/DoctorCard';
import { DOCTORS, SPECIALTIES } from '../data/doctors';

const HomePage = ({ onBookDoctor }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSpecialty, setActiveSpecialty] = useState('All');

  const filteredDoctors = DOCTORS.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = activeSpecialty === 'All' || doctor.specialty === activeSpecialty;
    
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="page-content" style={{ paddingBottom: '30px' }}>
      
      <div className="welcome-banner">
        <h1 className="welcome-title">Hello,<br/>How can we help?</h1>
        <p className="welcome-subtitle">Find and book your doctor easily</p>
      </div>

      <div className="search-box">
        <Search className="search-icon" size={24} />
        <input 
          type="text" 
          className="search-input" 
          placeholder="Search doctor or specialty..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search doctor or specialty"
        />
      </div>

      <div>
        <div className="specialty-chips">
          {SPECIALTIES.map(specialty => (
            <button 
              key={specialty}
              className={`chip-btn ${activeSpecialty === specialty ? 'active' : ''}`}
              onClick={() => setActiveSpecialty(specialty)}
            >
              {specialty}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="section-title">
          Available Doctors
          <span className="doctor-count">{filteredDoctors.length}</span>
        </h2>
        
        <div className="doctor-list" style={{ marginTop: '16px' }}>
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map(doctor => (
              <DoctorCard 
                key={doctor.id} 
                doctor={doctor} 
                onBookNow={onBookDoctor} 
              />
            ))
          ) : (
            <div className="empty-state" style={{ padding: '30px 20px', marginTop: '10px' }}>
              <p className="empty-desc" style={{ fontSize: '18px' }}>No doctors found matching your search.</p>
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default HomePage;
