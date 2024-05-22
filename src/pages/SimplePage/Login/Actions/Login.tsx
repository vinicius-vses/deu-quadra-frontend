import React, { FormEvent, useContext, useEffect, useState } from 'react';
import TextInput from '@components/TextInput';
import { useModal } from '@src/hooks/Modal';
import { useApi } from '@src/api/api';
import { useNavigate } from 'react-router-dom';
import { AuthenticationContext } from '../../../../contexts/Auth';
import { LanguageContext } from '../../../../contexts/Language';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('locador'); // Default to 'locador'

  const auth = useContext(AuthenticationContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.isAuthenticated) {
      navigate('/');
    }
  }, [auth, navigate]);

  const { loginLocador, loginLocatario } = useApi();
  const { openModal } = useModal();
  const { language } = useContext(LanguageContext)!;

  function handleLogin(event: FormEvent) {
    event.preventDefault();

    const loginFunction = userType === 'locador' ? loginLocador : loginLocatario;

    loginFunction(email, password)
      .then((response) => {
        if (response.data) {
          auth!.setTokens({
            authToken: {
              token: response.data,
              expiresIn: new Date(),
            },
            refreshToken: {
              expiresIn: new Date(),
              token: 'a',
            },
          });

          navigate('/empresa');
        } else {
          openModal('Erro', 'Erro desconhecido ao fazer login');
        }
      })
      .catch((error: any) => {
        openModal('Erro', error.response ? error.response.data.message : 'Erro desconhecido ao fazer login');
      });
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-lg mb-3">
      <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label htmlFor="userType" className="block text-sm font-medium text-gray-700">
            Tipo de Usuário
          </label>
          <select
            id="userType"
            name="userType"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="locador">Locador</option>
            <option value="locatario">Locatário</option>
          </select>
        </div>
        <TextInput
          label="Email"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={language.emailButtonPlaceholder}
        />
        <TextInput
          label={language.passwordLabel}
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={language.passwordButtonPlaceholder}
        />
        <div className="flex justify-between items-center mt-3">
          <a href="/Reset" className="text-sm text-blue-500 hover:underline">
            Esqueci minha senha
          </a>
        </div>
        <div className="flex w-full justify-between px-2 mt-3">
          <button
            type="button"
            className="bg-green-500 text-white p-2 rounded-md mt-3 mx-auto hover:bg-blue-600"
            onClick={() => navigate('/')}
          >
            Voltar
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded-md mt-3 mx-auto hover:bg-green-600"
          >
            {language.LoginPageButton}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
