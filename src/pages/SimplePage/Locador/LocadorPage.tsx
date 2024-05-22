import React, { useState, useEffect } from 'react';
import { SimplePage } from '../SimplePage';
import Navbar from '../../../components/Navbar/Navbar';
import { CardLocador } from '../Locador/Card/CardLocador';
import { CardEmpresa } from '../Locador/Card/CardEmpresa';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../../hooks/Auth';


import axios from 'axios';
import { CardQuadra } from './Card/CardQuadra';

export function LocadorPage() {

  const [courtsData, setCourtsData] = useState([]);
  const [companiesData, setCompaniesData] = useState([]);

  const [testeData, setTeste] = useState([]);

  const authentication = useAuth();
  const idUsuario = authentication.user?.id;
  console.log(idUsuario);
  const idEmpresa = 1;

  let nomeEmpresa = [];

  const [empresaData, setEmpresa] = useState([]);

  useEffect(() => {
    // Faz a requisição para o endpoint
    axios.get('http://18.212.67.172:8080/companies/empresa/' + idUsuario)
    //axios.get('http://localhost:8080/companies/empresa/' + idUsuario)
        .then((response) => {
        // Atualiza o estado com os dados recebidos
        //setCourtsData(response.data.courtsModelList);
        nomeEmpresa = response.data.nome;
        // setEmpresa(response.data.nome);
        // setEmpresa(response.data.bairro);
        // setEmpresa(response.data.rua);
        // setEmpresa(response.data.numero);
        setEmpresa(response.data);
        console.log(response.data);
        console.log(empresaData);
        })
        .catch((error) => {
        console.error('Erro ao buscar dados das quadras:', error);
        });
    }, []);

  return (
    <SimplePage>
        <div>

          <Navbar className="fade-in"></Navbar>
          <div className="mt-8 flex flex-col items-center border bg-white space-y-4">
            <h2>Empresas cadastradas: </h2>
            {empresaData?.map((data, idEmpresa) => {
              return <CardEmpresa key={idEmpresa} props={data}></CardEmpresa>;
            })}
            </div>
    
</div>

            
<div className="mt-28 flex flex-col items-center border bg-white space-y-4">

          <h2>ACESSO RAPIDO: </h2>
          <div className="flex items-center">
          <Link
            to={'/company'}
            className="px-5 py-2 text-green-600 border rounded-sm border-green-500 hover:bg-green-500 hover:text-white"
          >
            Cadastrar Empresa
          </Link>
          </div>
          <div className="flex items-center">
          <Link
            to={'/empresa/'}
            className="px-5 py-2 text-green-600 border rounded-sm border-green-500 hover:bg-green-500 hover:text-white"
          >
            Minhas Quadras
          </Link>
          </div>
          <Link
            to={'/minhasreservas/'} 
            className="px-5 py-2 text-green-600 border rounded-sm border-green-500 hover:bg-green-500 hover:text-white"
          >
            Minhas Reservas
          </Link>
          <div className="flex items-center">
            <Link
            to={'/editcadastro/'}
            className="px-5 py-2 text-green-600 border rounded-sm border-green-500 hover:bg-green-500 hover:text-white"
          >
            Editar Cadastro
          </Link>
          </div>
          <Link
            to={'/novaQuadra/'} 
            className="px-5 py-2 text-green-600 border rounded-sm border-green-500 hover:bg-green-500 hover:text-white"
          >
            Incluir Quadra
          </Link>
          
</div>

      
    </SimplePage>
  );
}
