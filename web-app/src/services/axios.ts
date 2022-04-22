import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import config from "../config";
import { withError } from "../utils";

class Api {
  private axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: config.baseUrl,
      withCredentials: true,
    });
  }

  private async _sendResponse<T>(handler: Promise<T>) {
    const [error, response] = await withError<T>(handler);
    return [error, response];
  }

  /**
   *
   * @param url api url endpoing
   * @param query api query params
   * @param options request config
   * @returns Promise<AxiosReponse<R>>
   */
  async get<R>(url: string, query: any = {}, options: AxiosRequestConfig = {}) {
    const result = await this._sendResponse<R>(
      this.axios
        .get<R>(url, { params: query, ...options })
        .then((response) => response.data)
    );
    return result;
  }

  /**
   * @param url api url endpoing
   * @param data request data <D>
   * @param options AxiosRequestConfig
   * @returns Promise<AxiosResponse<R>>
   */
  async post<D, R>(url: string, data: D, options?: AxiosRequestConfig) {
    return this._sendResponse<R>(
      this.axios
        .post<R, AxiosResponse<R>, D>(url, data, options)
        .then((response) => response.data)
    );
  }

  /**
   * @param url api url endpoing
   * @param data request data <D>
   * @param options AxiosRequestConfig
   * @returns Promise<AxiosResponse<R>>
   */
  async put<D, R>(url: string, data: D, options: AxiosRequestConfig = {}) {
    return this._sendResponse<R>(
      this.axios
        .put<R, AxiosResponse<R>, D>(url, data, options)
        .then((response) => response.data)
    );
  }

  /**
   *
   * @param url api url endpoing
   * @param query api query params
   * @param options AxiosRequestConfig
   * @returns Promise<AxiosResponse<R>>
   */
  async delete<R>(
    url: string,
    query: any = {},
    options: AxiosRequestConfig = {}
  ) {
    return this._sendResponse(
      this.axios
        .delete<R, AxiosResponse<R>>(url, {
          params: query,
          ...options,
        })
        .then((response) => response.data)
    );
  }

  async patch<D, R>(url: string, data: D, options: AxiosRequestConfig = {}) {
    return this._sendResponse(
      this.axios
        .patch<R, AxiosResponse<R>, D>(url, data, options)
        .then((response) => response.data)
    );
  }
}

const api = new Api();
export default api;
