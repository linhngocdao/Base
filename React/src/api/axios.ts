import axios from "axios";

const instance = axios.create({
  baseURL: process.env.API_DOMAIN,
  headers: {
    "Content-Type": "application/json",
  },
});

export const sendGet = (url: string, params?: any) => instance.get(url, { params }).then((res) => res.data);
export const sendPost = (url: string, params?: any, queryParams?: any) => instance.post(url, params, { params: queryParams }).then((res) => res.data);
export const sendPut = (url: string, params?: any, queryParams?: any) => instance.put(url, params, { params: queryParams }).then((res) => res.data);
export  const sendDelete = (url: string, params?: any) => instance.delete(url, { params }).then((res) => res.data);