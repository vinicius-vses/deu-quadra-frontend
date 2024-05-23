import React from 'react';
import { Link } from 'react-router-dom';

function TopMenu() {
  return (
    <nav className="bg-green-500 p-4">
      <div className="container max-w-screen-lg mx-auto flex justify-center items-center space-x-4 text-white">
        <p className="text-center">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Alugue Sua Quadra Agora no Deu Quadra!</p> {/* Usando espaços não quebráveis */}
      </div>
    </nav>
  );
}

export default TopMenu;
