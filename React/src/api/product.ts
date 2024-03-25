import { IProducts } from "~/models/interface";
import { sendGet, sendPost } from "./axios";

export const getProducts = () => sendGet("/products");
export const updateProduct = (payload: IProducts) => sendPost("/products", payload);