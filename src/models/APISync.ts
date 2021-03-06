import axios, { AxiosPromise } from 'axios';

interface Identifiable {
  id?: number;
}

export class APISync<T extends Identifiable> {
  constructor(public rootUrl: string) {}

  fetch(id: number): AxiosPromise {
    return axios.get(`${this.rootUrl}/${id}`);
  }

  save(data: T): AxiosPromise {
    const { id } = data;

    if (id) return axios.put(`${this.rootUrl}/${id}`, data);

    return axios.post(this.rootUrl, data);
  }
}
