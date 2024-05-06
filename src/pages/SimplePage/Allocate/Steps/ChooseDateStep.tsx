import React, { useState } from 'react';
import Calendar from 'rc-calendar';
import 'rc-calendar/assets/index.css';
import { Link, useNavigate } from 'react-router-dom';

export function ChooseDateStep() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [scheduledEvent, setScheduledEvent] = useState(null);
  const navigate = useNavigate();

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
          <p><center>{selectedDate.format('DD/MM/YYYY')}</center></p>
          <div className="text-center">
            <button onClick={handleScheduleEvent} className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600">Reservar</button>
          </div>
        </div>
      )}
      {scheduledEvent && (
        <p>Evento agendado em {scheduledEvent.date.format('DD/MM/YYYY')}: {scheduledEvent.name}</p>
      )}
      <div className="mt-4 flex justify-between">
        <Link to="/" className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600">Voltar</Link>
        <button onClick={() => navigate('/empresa/1')} className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600">Próximo</button>
      </div>
    </div>
  );
}
