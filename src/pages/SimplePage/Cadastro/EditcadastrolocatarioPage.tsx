import React, { useState } from 'react';
import { SimplePage } from '../SimplePage';
import { Signuplocador } from './Action/Signuplocador';
import { Signuplocatario } from './Actions/Signuplocatario'; // Corrigido a sintaxe da importação
import { Editcadastro } from './Action/Editcadastro'; // Corrigido o nome do arquivo e o caminho
import { Editcadastrolocatario } from './Action/Editcadastrolocatario';

enum Actions {
  LOGIN,
  REGISTER,
}

export function EditcadastrolocatarioPage() {
  const [action, setAction] = useState();

  return (
    <SimplePage>
      <div className="flex-center bg-green-300">
        <Editcadastrolocatario />
      </div>
    </SimplePage>
  );
}
