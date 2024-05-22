import axios, { AxiosResponse } from 'axios';
import { useAuth } from '../hooks/Auth';
import { GetCourtsOutput, LoginOutput, GetEmpresasOutput } from './endpointsOutput';

export interface AuthResult {
  login: (email: string, password: string)=> Promise<AxiosResponse<LoginOutput, any>>;
  getCourts: (lat:number,lon: number, distanceInKillometers: number)=> Promise<AxiosResponse<GetCourtsOutput[], any>>;
  getEmpresas: (lat:number,lon: number, km: number)=> Promise<AxiosResponse<GetEmpresasOutput[], any>>;
}

export function useApi(): AuthResult {
  const { tokens } = useAuth();

  const client = axios.create({
    headers: { Authorization: `Bearer ${tokens?.authToken.token}` },
    baseURL: import.meta.env.VITE_API_URL,
  });

  async function login(email: string, password: string): Promise<AxiosResponse<LoginOutput, any>> {
    return client.post<LoginOutput>('/locador/login', {
      email,
      password,
    });
  }

  async function getEmpresas(lat:number,lon: number, km: number): Promise<AxiosResponse<GetEmpresasOutput[], any>> {
    return client.post<GetEmpresasOutput[]>('/companies/search',{
        lat,lon,km
    });
  }

  async function getCourts(lat:number,lon: number, distanceInKillometers: number): Promise<AxiosResponse<GetCourtsOutput[], any>> {
    return client.post<GetCourtsOutput[]>('/courts/search',{
        coordinates: {
          lat,lon
      },
      properties: {
          distanceInKillometers
      }
    })
  }

  async function getEmpresasLatLong(lat:number,lon: number): Promise<AxiosResponse<GetEmpresasOutput[], any>> {
    return client.get<GetEmpresasOutput[]>('/companies',{
        coordinates: {
          lat,lon
      },
      properties: {
        lat,lon
    }
    })
  }

  async function getQuadrasLatLong(lat:number,lon: number): Promise<AxiosResponse<GetCourtsOutput[], any>> {
    return client.get<GetCourtsOutput[]>('/courts',{
        coordinates: {
          lat,lon
      },
      properties: {
        lat,lon
    }
    })
  }

  return { login, getCourts, getEmpresas, getEmpresasLatLong };
}
