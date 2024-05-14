import React, { useState, useContext } from 'react';
import { FormEvent } from 'react';
import TextInput from '@components/TextInput';
import { useModal } from '@src/hooks/Modal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthenticationContext } from '../../../../contexts/Auth';
import { LanguageContext } from '../../../../contexts/Language';

export function CadastroEmpresa() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [identificador, setIdentificador] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [numero, setNumero] = useState('');
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const auth = useContext(AuthenticationContext);
  const { openModal } = useModal();
  const { language } = useContext(LanguageContext)!;
  const navigate = useNavigate();

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://54.209.227.225:8080/companies', {
        nome: nome,
        telefone: telefone,
        cep: cep,
        numero: numero,
        rua: rua,
        bairro: bairro,
        estado: estado,
        cidade: cidade,
        lat: latitude,
        lon: longitude
      });

      console.log(response.data);
      setSuccessMessage('Empresa cadastrada com sucesso!');
    } catch (error) {
      console.error('Error creating company:', error);
      setError('Erro ao cadastrar empresa, tente novamente mais tarde.');
    }
  };

  const fetchAddressFromCEP = async (cep: string) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (!data.erro) {
        setRua(data.logradouro);
        setEstado(data.uf);
        setCidade(data.localidade);
        setBairro(data.bairro);
      } else {
        openModal('Erro', 'CEP não encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      openModal('Erro', 'Erro ao buscar CEP');
    }
  };

  const handleCEPChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCep(value);

    // Verifica se o CEP possui 8 dígitos e contém apenas números
    if (/^\d{8}$/.test(value)) {
      fetchAddressFromCEP(value);
    } else {
      setError('Formato de CEP inválido');
    }
  };

  const handleOkClick = () => {
    setSuccessMessage('');
    navigate('/'); // Pode ser redirecionado para a página desejada após clicar em "OK"
  };

  return (
    <>
      {!successMessage && (
        <div className="flex justify-center items-center h-screen">
          <div className="p-6 bg-white shadow-md rounded-lg mb-3 w-full sm:w-3/4 md:w-1/2 lg:w-1/2 xl:w-1/3">
            <h2 className="text-2xl font-semibold mb-4 text-center">Cadastre sua empresa</h2>
            <form onSubmit={handleSignup} className="flex flex-wrap">
              <div className="w-full px-2 md:w-1/2">
                <TextInput
                  label="Nome"
                  type="text"
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Informe o nome da empresa"
                />
              </div>
              <div className="w-full px-2 md:w-1/2">
                <TextInput
                  label="Telefone"
                  type="text"
                  id="telefone"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  placeholder="Informe o telefone da empresa"
                />
              </div>
              <div className="w-full px-2 md:w-1/2">
                <TextInput
                  label="CEP"
                  type="text"
                  id="cep"
                  value={cep}
                  onChange={handleCEPChange}
                  placeholder="Informe o CEP"
                />
              </div>
              <div className="w-full px-2 md:w-1/2">
                <TextInput
                  label="Número"
                  type="text"
                  id="numero"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  placeholder="Informe o número"
                />
              </div>
              <div className="w-full px-2 md:w-1/2">
                <TextInput
                  label="Rua"
                  type="text"
                  id="rua"
                  value={rua}
                  onChange={(e) => setRua(e.target.value)}
                  placeholder="Informe a rua"
                />
              </div>
              <div className="w-full px-2 md:w-1/2">
                <TextInput
                  label="Bairro"
                  type="text"
                  id="bairro"
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                  placeholder="Informe o bairro"
                />
              </div>
              <div className="w-full px-2 md:w-1/2">
                <TextInput
                  label="Estado"
                  type="text"
                  id="estado"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  placeholder="Informe o estado"
                />
              </div>
              <div className="w-full px-2 md:w-1/2">
                <TextInput
                  label="Cidade"
                  type="text"
                  id="cidade"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  placeholder="Informe a cidade"
                />
              </div>
              <div className="w-full px-2 md:w-1/2">
                <TextInput
                  label="Latitute"
                  type="double"
                  id="latitude"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  placeholder="Informe a cidade"
                />
              </div>
              <div className="w-full px-2 md:w-1/2">
                <TextInput
                  label="Longitute"
                  type="double"
                  id="longitude"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  placeholder="Informe a cidade"
                />
              </div>
              <div className="w-full px-2 mt-3">
                <div className="flex justify-between">
                  <button
                    type="button"
                    className="bg-green-500 text-white p-2 rounded-md hover:bg-blue-600"
                    onClick={() => navigate(-1)}
                  >
                    Voltar
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 text-white p-2 rounded-md hover:bg-blue-600"
                  >
                    Cadastrar
                  </button>
                </div>
              </div>
            </form>
            {error && <p className="text-red-500 text-center">{error}</p>}
          </div>
        </div>
      )}
      {successMessage && (
        <div className="flex justify-center items-center h-screen">
          <div className="p-6 bg-white shadow-md rounded-lg mb-3 w-full sm:w-4/4 md:w-3/2 lg:w-3/3 xl:w-5/4 text-center">
            <p className="text-green-800 text-xl mb-4" style={{ whiteSpace: "nowrap" }}>{successMessage}</p>
            <button className="bg-green-500 text-white p-2 rounded-md hover:bg-blue-600" onClick={handleOkClick}>
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}
