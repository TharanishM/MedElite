import React from 'react';
import { CalendarSearch, XCircle, Home, User, Phone, MapPin, Clock, Calendar, CheckCircle } from 'lucide-react';

const MyAppointmentPage = ({ appointment, onCancel, onGoHome }) => {
  
  if (!appointment) {
    return (
      <div className="page-content" style={{ justifyContent: 'center' }}>
        <div className="empty-state">
          <div className="empty-icon">
            <CalendarSearch size={36} />
          </div>
          <h2 className="empty-title">No Appointment Found</h2>
          <p className="empty-desc">You don't have any active appointments at the moment.</p>
          
          <button className="btn-primary" style={{ marginTop: '20px' }} onClick={onGoHome}>
            <Home size={24} /> Find a Doctor
          </button>
        </div>
      </div>
    );
  }

  const isConfirmed = appointment.status === "Confirmed";

  return (
    <div className="page-content" style={{ paddingBottom: '40px' }}>
      <h2 className="section-title" style={{ marginBottom: '10px' }}>Appointment Details</h2>
      
      <div className="appointment-card">
        
        <div className={`status-badge ${isConfirmed ? 'confirmed' : 'cancelled'}`}>
          {isConfirmed ? <CheckCircle size={20} /> : <XCircle size={20} />}
          {appointment.status}
        </div>

        <div>
          <h2 className="doctor-name" style={{ fontSize: '24px' }}>{appointment.doctorName}</h2>
          <span className="doctor-specialty-badge" style={{ marginTop: '6px' }}>{appointment.specialty}</span>
        </div>

        <div className="appointment-info-list">
          <div className="info-item">
            <MapPin className="info-icon" size={20} />
            <div className="info-content">
              <span className="info-label">Hospital</span>
              <span className="info-value">{appointment.hospital}</span>
            </div>
          </div>
          
          <div className="info-item">
            <Calendar className="info-icon" size={20} />
            <div className="info-content">
              <span className="info-label">Date</span>
              <span className="info-value">{appointment.date}</span>
            </div>
          </div>
          
          <div className="info-item">
            <Clock className="info-icon" size={20} />
            <div className="info-content">
              <span className="info-label">Time</span>
              <span className="info-value">{appointment.time}</span>
            </div>
          </div>

          <div className="info-item">
            <User className="info-icon" size={20} />
            <div className="info-content">
              <span className="info-label">Patient Name</span>
              <span className="info-value">{appointment.patientName}</span>
            </div>
          </div>

          <div className="info-item">
            <Phone className="info-icon" size={20} />
            <div className="info-content">
              <span className="info-label">Phone Number</span>
              <span className="info-value">{appointment.phoneNumber}</span>
            </div>
          </div>
        </div>
        
        {isConfirmed && (
          <div style={{ backgroundColor: '#f8fafc', padding: '12px', borderRadius: '10px', textAlign: 'center', border: '1px dashed #cbd5e1' }}>
            <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 600 }}>Booking ID:</span>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f3d64', letterSpacing: '1px' }}>
              {appointment.id}
            </div>
          </div>
        )}

      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
        {isConfirmed && (
          <button className="btn-danger" onClick={onCancel}>
            <XCircle size={24} /> Cancel Appointment
          </button>
        )}
        
        <button className="btn-secondary" onClick={onGoHome}>
          <Home size={24} /> Back to Home
        </button>
      </div>

    </div>
  );
};

export default MyAppointmentPage;
