import axios from "axios";
import { IData, IResponse, IPlanet } from "../interfaces";

const baseURL = "https://swapi.dev/api/";
const instance = axios.create({ baseURL });

export const getPlanets = async (): Promise<IData> => {
  try {
    const response: IResponse<IData> = await instance.get("planets");
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getNextPage = async (page: string): Promise<IData> => {
  try {
    const params = page.split("/").pop();
    const response: IResponse<IData> = await instance.get(`planets/${params}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getPlanetById = async (id: string): Promise<IPlanet> => {
  try {
    const response: IResponse<IPlanet> = await instance.get(`planets/${id}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getByUrl = async <T>(url: string): Promise<T> => {
  try {
    const param = url.split("/");
    const response: IResponse<T> = await instance.get(`${param[4]}/${param[5]}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
