import React, { useState, useEffect } from 'react';
import { SimplePage } from '../SimplePage';
import Navbar from '../../../components/Navbar/Navbar';
import { CardQuadra } from '../Locador/Card/CardQuadra';
import { CardEmpresa } from '../Locador/Card/CardEmpresa';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

export function InfosQuadraPage() {
  const [courtsData, setCourtsData] = useState([]);
  const [empresaData, setEmpresa] = useState([]);

  const { idEmpresa } = useParams(); // Pegando o ID da empresa da URL

  useEffect(() => {
    axios.get(`http://3.234.183.45:8080/companies/${idEmpresa}`)
      .then((response) => {
        setEmpresa(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados da empresa:', error);
      });
  }, [idEmpresa]);

  useEffect(() => {
    axios.get(`http://3.234.183.45:8080/courts?empresa=${idEmpresa}`)
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
        <div className="rounded-sm flex flex-row border bg-white overflow-hidden hover:shadow-xl transition-all duration-300">
          {/* Renderizar aqui os cards de quadra */}
          {courtsData.map((court) => (
            <CardQuadra key={court.id} props={court} />
          ))}
        </div>
        <CardEmpresa props={empresaData} />
      </div>
    </SimplePage>
  );
}
