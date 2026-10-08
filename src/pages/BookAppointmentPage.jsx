import React, { useState } from 'react';
import { ArrowLeft, User, Phone, CheckCircle, Calendar, Clock } from 'lucide-react';

const BookAppointmentPage = ({ doctor, onBack, onConfirm }) => {
  const [selectedDate, setSelectedDate] = useState(0); // Index of dates
  const [selectedTime, setSelectedTime] = useState('');
  const [patientName, setPatientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  // Generate next 3 days
  const getDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 3; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      
      let dayLabel = "Today";
      if (i === 1) dayLabel = "Tomorrow";
      if (i === 2) dayLabel = d.toLocaleDateString('en-US', { weekday: 'short' });
      
      const dateLabel = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      dates.push({ label: dayLabel, date: dateLabel, fullDate: d });
    }
    return dates;
  };

  const datesList = getDates();
  
  const timeSlots = [
    "10:00 AM", "11:30 AM", "01:00 PM", "02:30 PM", "04:00 PM", "05:30 PM"
  ];

  const handleConfirm = () => {
    setError('');
    
    if (!selectedTime) {
      setError('Please select a time slot.');
      return;
    }
    if (!patientName.trim()) {
      setError('Please enter the patient name.');
      return;
    }
    if (!phoneNumber.trim() || phoneNumber.length < 10) {
      setError('Please enter a valid phone number.');
      return;
    }

    const appointmentDetails = {
      id: "MED-" + Math.floor(1000 + Math.random() * 9000),
      doctorName: doctor.name,
      specialty: doctor.specialty,
      hospital: doctor.hospital,
      date: `${datesList[selectedDate].label}, ${datesList[selectedDate].date}`,
      time: selectedTime,
      patientName: patientName,
      phoneNumber: phoneNumber,
      status: "Confirmed"
    };

    onConfirm(appointmentDetails);
  };

  if (!doctor) {
    return (
      <div className="page-content">
        <button className="btn-back" onClick={onBack}>
          <ArrowLeft size={24} /> Back to Home
        </button>
        <div className="empty-state">
          <p className="empty-desc">No doctor selected. Please go back and select a doctor.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content" style={{ paddingBottom: '40px' }}>
      <button className="btn-back" onClick={onBack}>
        <ArrowLeft size={24} /> Back to Doctors
      </button>

      <div className="booking-summary-card">
        <img 
          src={doctor.avatar} 
          alt={doctor.name} 
          className="doctor-avatar" 
          style={{ width: '60px', height: '60px' }}
        />
        <div className="doctor-info">
          <h2 className="doctor-name" style={{ fontSize: '20px' }}>{doctor.name}</h2>
          <span className="doctor-specialty-badge" style={{ fontSize: '14px', padding: '2px 8px' }}>
            {doctor.specialty}
          </span>
          <div className="doctor-hospital" style={{ fontSize: '14px' }}>
            {doctor.hospital}
          </div>
        </div>
      </div>

      {error && (
        <div className="alert-box error">
          <span>{error}</span>
        </div>
      )}

      <div>
        <h3 className="form-label" style={{ marginBottom: '12px', fontSize: '20px' }}>
          <Calendar size={20} className="text-primary" /> Select Date
        </h3>
        <div className="date-grid">
          {datesList.map((d, index) => (
            <div 
              key={index} 
              className={`date-chip ${selectedDate === index ? 'selected' : ''}`}
              onClick={() => setSelectedDate(index)}
            >
              <span className="day-label">{d.label}</span>
              <span className="date-label">{d.date}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '10px' }}>
        <h3 className="form-label" style={{ marginBottom: '12px', fontSize: '20px' }}>
          <Clock size={20} className="text-primary" /> Select Time
        </h3>
        <div className="slots-grid">
          {timeSlots.map(time => (
            <div 
              key={time} 
              className={`slot-chip ${selectedTime === time ? 'selected' : ''}`}
              onClick={() => setSelectedTime(time)}
            >
              {time}
            </div>
          ))}
        </div>
      </div>

      <div className="form-group" style={{ marginTop: '10px' }}>
        <label className="form-label">
          <User size={20} className="text-primary" /> Patient Name
        </label>
        <input 
          type="text" 
          className="form-input" 
          placeholder="e.g. Ramesh Verma" 
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
        />
      </div>

      <div className="form-group" style={{ marginTop: '10px' }}>
        <label className="form-label">
          <Phone size={20} className="text-primary" /> Phone Number
        </label>
        <input 
          type="tel" 
          className="form-input" 
          placeholder="e.g. 9876543210" 
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>

      <div style={{ marginTop: '20px' }}>
        <button className="btn-primary" onClick={handleConfirm}>
          <CheckCircle size={24} /> Confirm Appointment
        </button>
      </div>

    </div>
  );
};

export default BookAppointmentPage;
