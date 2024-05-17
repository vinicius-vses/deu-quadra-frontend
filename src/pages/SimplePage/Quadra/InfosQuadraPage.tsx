import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SimplePage } from '../SimplePage';
import Navbar from '../../../components/Navbar/Navbar';
import { CardQuadra } from '../Locador/Card/CardQuadra';
import { CardEmpresa } from '../Locador/Card/CardEmpresa';
import axios from 'axios';

export function InfosQuadraPage() {
  const [courtsData, setCourtsData] = useState([]);
  const [empresaData, setEmpresaData] = useState({});

  const { idQuadra, idEmpresa } = useParams(); // Pegando os IDs dinâmicos da URL

  useEffect(() => {
    axios.get(`http://3.87.195.183:8080/companies/${idEmpresa}`)
      .then((response) => {
        setEmpresaData(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados da empresa:', error);
      });
  }, [idEmpresa]);

  useEffect(() => {
    axios.get(`http://3.87.195.183:8080/courts?empresa=${idEmpresa}&limit=2`)
      .then((response) => {
        setCourtsData(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados das quadras:', error);
      });
  }, [idEmpresa]);

  return (
    <SimplePage>
      <div>
        <Navbar className="fade-in" />
        <div className="flex flex-col items-center">
          <div className="rounded-sm border bg-white overflow-hidden hover:shadow-xl transition-all duration-300 mb-4 w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
            <CardEmpresa props={empresaData} />
          </div>
          <h2 className="text-center mb-4">Informações da Quadra selecionada:</h2>
          {courtsData.map((court) => (
            <div className="rounded-sm border bg-white overflow-hidden hover:shadow-xl transition-all duration-300 mb-4 w-full sm:w-3/4 md:w-1/2 lg:w-1/3" key={court.id}>
              <CardQuadra props={court} />
            </div>
          ))}
        </div>
      </div>
    </SimplePage>
  );
}
