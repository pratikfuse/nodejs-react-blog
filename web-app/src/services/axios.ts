import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import config from '../config';

class Api {
  private axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: config.baseUrl,
      withCredentials: true
    });
  }

  /**
   *
   * @param url api url endpoing
   * @param query api query params
   * @param options request config
   * @returns Promise<AxiosReponse<R>>
   */
  async get<R>(url: string, query: any = {}, options: AxiosRequestConfig = {}) {
    const {data} = await this.axios.get<R>(url, {
      params: query,
      ...options,
    });
    return data;
  }

  /**
   * @param url api url endpoing
   * @param data request data <D>
   * @param options AxiosRequestConfig
   * @returns Promise<AxiosResponse<R>>
   */
  async post<D, R>(url: string, data: D, options?: AxiosRequestConfig) {
    return this.axios.post<R, AxiosResponse<R>, D>(url, data, options);
  }

  /**
   *
   * @param url api url endpoing
   * @param data request data <D>
   * @param options AxiosRequestConfig
   * @returns Promise<AxiosResponse<R>>
   */
  async put<D, R>(url: string, data: D, options: AxiosRequestConfig = {}) {
    return this.axios.put<R, D>(url, data, {
      ...options,
    });
  }

  /**
   *
   * @param url api url endpoing
   * @param query api query params
   * @param options AxiosRequestConfig
   * @returns Promise<AxiosResponse<R>>
   */
  async delete<R>(url: string, query: any = {}, options: AxiosRequestConfig = {}) {
    return this.axios.delete<R>(url, {
      params: query,
      ...options,
    });
  }

  async patch<D, R>(url: string, data: D, options: AxiosRequestConfig = {}) {
    return this.axios.patch<R>(url, data, {
      ...options,
    });
  }
}

const api = new Api();
export default api;
