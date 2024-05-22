import React, { useState, useEffect } from 'react';
import { SimplePage } from '../SimplePage';
import Navbar from '../../../components/Navbar/Navbar';
import { CardQuadra } from '../Locador/Card/CardQuadra';
import { CardEmpresa } from '../Locador/Card/CardEmpresa';
import { Link, useParams } from 'react-router-dom';

import axios from 'axios';

export interface CardProps {
  props: {
      nome: string;
      idEmpresa: number;
      rua: string;
      bairro: string;
      numero: string;
      courtsModelList: {
        nome: string;
        preco: number;
        descricao: string;
        idQuadra: number;
        imagemUrl: string;
      }
    };
};

export function InfosQuadraPage() {

  const [courtsData, setCourtsData] = useState([]);
  const [empresaData, setEmpresa] = useState([]);

  const idQuadra = 8;
  //const idEmpresa = 1;

  const { idEmpresa } = useParams();
  let nomeEmpresa = [];

  console.log(idEmpresa);

  useEffect(() => {
    // Faz a requisição para o endpoint
    axios.get('http://18.212.67.172:8080/companies/' + idEmpresa)
    //axios.get('http://localhost:8080/companies/'+ idEmpresa)
        .then((response) => {
        // Atualiza o estado com os dados recebidos
        //setCourtsData(response.data.courtsModelList);
        nomeEmpresa = response.data.nome;
        setEmpresa(response.data);
        setEmpresa(response.data);
        console.log(response.data);  
        console.log("oie");
        })
        .catch((error) => {
        console.error('Erro ao buscar dados das quadras:', error);
        });
    }, []);

    useEffect(() => {
        // Faz a requisição para o endpoint
        axios.get('http://18.212.67.172:8080/courts/quadras/' + idEmpresa)
        //axios.get('http://localhost:8080/courts/quadras/' + idEmpresa)
            .then((response) => {
            // Atualiza o estado com os dados recebidos
            console.log(response.data);   
            setCourtsData(response.data);
            console.log(courtsData);   
            })
            .catch((error) => {
            console.error('Erro ao buscar dados das quadras:', error);
            });
        }, []);


        console.log(empresaData.rua);


  return (
    <SimplePage>
        <div>

          <Navbar className="fade-in"></Navbar>
          <div className=" rounded-sm flex flex-row border bg-white overflow-hidden hover:shadow-xl transition-all duration-300 ">
            {/* {courtsData.map((data, idEmpresa) => {
              return <CardEmpresa key={idEmpresa} props={data}></CardEmpresa>;
            })} */}
            
          </div>
          <CardEmpresa props={empresaData}></CardEmpresa>;

            <h2>Informacoes da Quadra selecionada: </h2>
            {/* <CardQuadra props={courtsData}></CardQuadra>; */}
            {courtsData.map((data, idQuadra) => {
              return <CardQuadra key={idQuadra} props={data}></CardQuadra>;
            })}
          {/* <Navbar className="fade-in"></Navbar>
          <div className="mt-8 flex flex-col items-center border bg-white space-y-4">
            <h2>Informacoes da Quadra selecionada: </h2>
            <CardQuadra props={courtsData}></CardQuadra>;
            </div> */}
</div>
  
      
    </SimplePage>
  );
}
