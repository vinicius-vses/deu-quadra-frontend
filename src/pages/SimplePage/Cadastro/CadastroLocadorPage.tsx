import React, { useState } from 'react';
import { SimplePage } from '../SimplePage';
import { Signuplocador } from './Action/Signuplocadorcp';
import { Signuplocatario } from './Actions/Signuplocatario'; // Corrigido a sintaxe da importação

enum Actions {
  LOGIN,
  REGISTER,
}

export function editcadastropage() {
  const [action, setAction] = useState();

  return (
    <SimplePage>
      <div className="flex-center bg-green-300">
        <e></cadastrolocadorcp>
      </div>
    </SimplePage>
  );
}
