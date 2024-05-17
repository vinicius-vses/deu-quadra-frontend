import React, { useState, useEffect } from 'react';
import { SimplePage } from '../SimplePage';
import Navbar from '../../../components/Navbar/Navbar';
import { CardQuadra } from '../Locador/Card/CardQuadra';
import { CardEmpresa } from '../Locador/Card/CardEmpresa';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export function InfosQuadraPage() {
  const [courtsData, setCourtsData] = useState([]);
  const [empresaData, setEmpresaData] = useState({});

  const { idQuadra } = useParams(); // Pegando o ID da quadra dos parâmetros da URL

  useEffect(() => {
    // Faz a requisição para o endpoint da empresa
    axios.get(`http://3.87.195.183:8080/companies/1`)
      .then((response) => {
        setEmpresaData(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados da empresa:', error);
      });
  }, []);

  useEffect(() => {
    // Faz a requisição para o endpoint da quadra usando o ID dinâmico
    axios.get(`http://3.87.195.183:8080/courts/${idQuadra}`)
      .then((response) => {
        setCourtsData(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados da quadra:', error);
      });
  }, [idQuadra]); // Adicionando idQuadra como dependência para refazer a busca quando ele mudar

  return (
    <SimplePage>
      <div>
        <Navbar className="fade-in" />
        <div className="rounded-sm flex flex-row border bg-white overflow-hidden hover:shadow-xl transition-all duration-300 ">
          {/* Aqui você pode renderizar os componentes de empresa, se necessário */}
        </div>
        <CardEmpresa props={empresaData} />
        <h2>Informações da Quadra selecionada:</h2>
        <CardQuadra props={courtsData} />
      </div>
    </SimplePage>
  );
}
