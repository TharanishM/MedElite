import React from 'react';
import { Clock, MapPin, CalendarCheck } from 'lucide-react';

const DoctorCard = ({ doctor, onBookNow }) => {
  return (
    <div className="doctor-card">
      <div className="doctor-header">
        <img 
          src={doctor.avatar} 
          alt={`Photo of ${doctor.name}`} 
          className="doctor-avatar"
        />
        <div className="doctor-info">
          <h3 className="doctor-name">{doctor.name}</h3>
          <span className="doctor-specialty-badge">{doctor.specialty}</span>
          <div className="doctor-hospital">
            <MapPin size={16} />
            {doctor.hospital}
          </div>
        </div>
      </div>
      
      <div className="doctor-details-row">
        <div className="detail-item">
          <Clock size={16} className="text-accent" />
          <span>{doctor.availableTime}</span>
        </div>
        <div className="fee-tag">{doctor.fee}</div>
      </div>
      
      <button 
        className="btn-primary" 
        onClick={() => onBookNow(doctor)}
        aria-label={`Book appointment with ${doctor.name}`}
      >
        <CalendarCheck size={24} />
        Book Now
      </button>
    </div>
  );
};

export default DoctorCard;
