import React, { FormEvent, useContext, useEffect, useState } from 'react';
import TextInput from '@components/TextInput';
import { useModal } from '@src/hooks/Modal';
import { useApi } from '@src/hooks/hooks'; // Importando o hook recém-criado
import { useNavigate } from 'react-router-dom';
import { AuthenticationContext } from '../../../../contexts/Auth';
import { LanguageContext } from '../../../../contexts/Language';
import axios from 'axios';

export function CadastroEmpresa() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [identificador, setIdentificador] = useState('');
  const [numero, setNumero] = useState('');
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [cep, setCep] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [telefone, setTelefone] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const auth = useContext(AuthenticationContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.isAuthenticated) {
      navigate('/');
    }
  }, []);

  const { signup } = useApi();
  const { openModal } = useModal();
  const { language } = useContext(LanguageContext)!;

  async function fetchAddressFromCEP(cep) {
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
  }

  function handleCEPChange(event) {
    const { value } = event.target;
    setCep(value);

    // Verifica se o CEP tem 8 dígitos para evitar requisições desnecessárias
    if (value.length === 8) {
      fetchAddressFromCEP(value);
    }
  }

    const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      try {
        const response = await axios.post('http://localhost:8080/companies', {
          nome: nome,
          email: email,
          password: password,
          identificador: identificador,
        });
  
        console.log(response.data);
        window.alert('USUARIO CADASTRADO COM SUCESSO!');
        navigate('/novaQuadra/');
  
        if (response.status === 200) {
          console.log('USUARIO created successfully!');
          // Handle any other logic here (e.g., redirect, display a success message)
        }
      } catch (error) {
        console.error('Error creating USUARIO:', error);
        window.alert(
          'ERRO AO CADASTRAR USUARIO, TENTE NOVAMENTE EM INSTANTES! ERRO:' +
            error
        );
        // Handle error cases (e.g., display an error message)
      }
    };

  function handleOkClick() {
    setSuccessMessage('');
    navigate('/login');
  }

  return (
    <>
      {!successMessage && (
       
          <div className="flex justify-center items-center h-screen">
      <div className="p-6 bg-white shadow-md rounded-lg mb-3 w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4">
        <h2 className="text-2xl font-semibold mb-4 text-center">Cadastre-se</h2>
        <h2 className="text-1xl font-semibold mb-4 text-center">Para anunciar uma quadra</h2>
            <form onSubmit={handleSignup} className="flex flex-wrap">
              <div className="w-full px-2 sm:w-1/2">
                <TextInput
                  label="CEP"
                  type="text"
                  id="cep"
                  value={cep}
                  onChange={handleCEPChange}
                  placeholder="Informe o CEP"
                />
              </div>
              <div className="w-full px-2 sm:w-1/2">
                <TextInput
                  label="Número"
                  type="text"
                  id="numero"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  placeholder="Informe o número"
                />
              </div>
              <div className="w-full px-2 sm:w-1/2">
                <TextInput
                  label="Rua"
                  type="text"
                  id="rua"
                  value={rua}
                  onChange={(e) => setRua(e.target.value)}
                  placeholder="Informe a rua"
                />
              </div>
              <div className="w-full px-2 sm:w-1/2">
                <TextInput
                  label="Bairro"
                  type="text"
                  id="bairro"
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                  placeholder="Informe o bairro"
                />
              </div>
              <div className="w-full px-2 sm:w-1/2">
                <TextInput
                  label="Estado"
                  type="text"
                  id="estado"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  placeholder="Informe o estado"
                />
              </div>
              <div className="w-full px-2 sm:w-1/2">
                <TextInput
                  label="Cidade"
                  type="text"
                  id="cidade"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  placeholder="Informe a cidade"
                />
              </div>
              <div className="w-full px-2 mt-3">
                <div className="flex justify-between">
                  <button
                    type="button"
                    className="bg-green-500 text-white p-2 rounded-md hover:bg-blue-600"
                    onClick={() => navigate('/presignup')}
                  >
                    Voltar
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 text-white p-2 rounded-md hover:bg-blue-600"
                  >
                    {language.LoginPageButton}
                  </button>
                </div>
              </div>
            </form>
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

export default CadastroEmpresa;