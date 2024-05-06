import React, { useState } from 'react';
import Calendar from 'rc-calendar';
import 'rc-calendar/assets/index.css';

export function ChooseDateStep() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [scheduledEvent, setScheduledEvent] = useState(null);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    console.log('Data selecionada:', date);
  };

  const handleScheduleEvent = () => {
    if (selectedDate) {
      const eventName = window.prompt('Nome do evento:');
      if (eventName) {
        setScheduledEvent({ date: selectedDate, name: eventName });
      }
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg mb-3">
      <h2>Escolha a Data</h2>
      <Calendar onSelect={handleDateSelect} />
      {selectedDate && (
        <div>
          <p>Data selecionada: {selectedDate.format('DD/MM/YYYY')}</p>
          <button onClick={handleScheduleEvent}>Reservar quadra</button>
        </div>
      )}
      {scheduledEvent && (
        <p>Evento agendado em {scheduledEvent.date.format('DD/MM/YYYY')}: {scheduledEvent.name}</p>
      )}
    </div>
  );
}
