import React, { useState, useEffect } from 'react';
import { SimplePage } from '../SimplePage';
import Navbar from '../../../components/Navbar/Navbar';
import { CardEmpresa } from '../Locador/Card/CardEmpresa';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/Auth';
import axios from 'axios';
import { Map } from '../../SimplePage/Search/Map/Map'; // Importe o componente Map corretamente

export function LocatarioPage() {
  const [empresaData, setEmpresa] = useState([]);
  const [userLocation, setUserLocation] = useState({ lat: 0, lon: 0 }); // Estado para armazenar a localização do usuário
  const authentication = useAuth();
  const idUsuario = authentication.user?.id;

  useEffect(() => {
    // Função para obter a localização do usuário
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ lat: latitude, lon: longitude });
          },
          (error) => {
            console.error('Erro ao obter localização:', error);
          },
          { enableHighAccuracy: true, maximumAge: 0 }
        );
      } else {
        console.error('Geolocation não é suportado neste navegador.');
      }
    };

    getLocation(); // Chame a função para obter a localização do usuário

    // Faz a requisição para o endpoint
    axios.get(`http://18.212.67.172:8080/companies/empresa/${idUsuario}`)
      .then((response) => {
        // Atualiza o estado com os dados recebidos
        setEmpresa(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados das empresas:', error);
      });
  }, [idUsuario]);

  return (
    <SimplePage>
      <div>
        <Navbar className="fade-in" />
        <div className="mt-8 flex flex-col items-center border bg-white space-y-4">
          <h2>Deu Quadra </h2>
          {empresaData?.map((data, idEmpresa) => {
            return <CardEmpresa key={idEmpresa} props={data} />;
          })}
        </div>
      </div>
      <div className="mt-28 flex flex-col items-center border bg-white space-y-4">
        <h2>ACESSO RÁPIDO: </h2>
        <div className="flex flex-col items-center space-y-2">
          <Link
            to={'/minhasreservas/'}
            className="px-5 py-2 text-green-600 border rounded-sm border-green-500 hover:bg-green-500 hover:text-white"
          >
            Minhas Reservas
          </Link>
          <Link
            to={'/editcadastrolocatario/'}
            className="px-5 py-2 text-green-600 border rounded-sm border-green-500 hover:bg-green-500 hover:text-white"
          >
            Editar Cadastro
          </Link>
          <Link
            to={'/search/'}
            className="px-5 py-2 text-green-600 border rounded-sm border-green-500 hover:bg-green-500 hover:text-white"
          >
            Buscar Quadra
          </Link>
        </div>
      </div>
    </SimplePage>
  );
}
