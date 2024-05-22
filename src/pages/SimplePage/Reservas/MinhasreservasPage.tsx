import React from 'react';
import { SimplePage } from '../SimplePage';
import { ChooseDateStep } from './Steps/ChooseDateStep';
import { MinhasReservas } from './Steps/Minhasreservas';
import { AuthResult } from '../hooks/Auth';

export function MinhasreservasPage() {
  return (
    <SimplePage>
      <div className="flex-center bg-green-300">
        <Minhasreservas></Minhasreservas>
      </div>
    </SimplePage>
  );
}
