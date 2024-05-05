import React, { useState } from 'react';
import { SimplePage } from '../SimplePage';
import { CadastroEmpresa } from './Action/CadastroEmpresa';
import { Signuplocatario } from './Actions/Signuplocatario'; // Corrigido a sintaxe da importação

enum Actions {
  LOGIN,
  REGISTER,
}

export function CadastroEmpresaPage() {
  const [action, setAction] = useState();

  return (
    <SimplePage>
      <div className="flex-center bg-green-300">
        <CadastroEmpresa></CadastroEmpresa>
      </div>
    </SimplePage>
  );
}
