import { IProducts } from "~/models/interface";
import {sendDelete, sendGet, sendPost} from "./axios";

export const getProducts = () => sendGet("/products");
export const updateProduct = (payload: IProducts) => sendPost("/products", payload);
export  const deleteProduct = (_id: string) => sendDelete(`/products/${_id}`);