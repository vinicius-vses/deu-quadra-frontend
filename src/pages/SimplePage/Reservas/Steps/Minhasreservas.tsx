import React, { useState, useEffect } from 'react';
import { SimplePage } from '../SimplePage';
import { ChooseDateStep } from './Steps/ChooseDateStep';
import axios from 'axios'; 

export function MinhasReservas() {
  const [reservas, setReservas] = useState([]); 

  useEffect(() => {
   
    async function fetchReservas() {
      try {
        const response = await axios.get('http://18.212.67.172:8080/reservas'); 
        setReservas(response.data);
      } catch (error) {
        console.error('Erro ao buscar reservas:', error);
       
      }
    }

    fetchReservas(); 
  }, []); 

  return (
    <SimplePage>
      <div className="flex-center bg-green-300">
        <ChooseDateStep reservas={reservas} /> {/* Passa as reservas como prop para o componente ChooseDateStep */}
      </div>
    </SimplePage>
  );
}


function ChooseDateStep({ reservas }) {
  return (
    <div>
      <h2>Minhas Reservas</h2>
      <ul>
        {reservas.map(reserva => (
          <li key={reserva.idReserva}>
            <div>Data de início: {reserva.startDate}</div>
            <div>Data de término: {reserva.endDate}</div>
            <div>Nome: {reserva.nome}</div>
            <div>Locatário ID: {reserva.locatarioId}</div>
            <div>ID da Quadra: {reserva.IdQuadra}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
