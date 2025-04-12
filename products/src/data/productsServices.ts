import axios from "axios"

type productosModel = {
    id: number;
    title: string;
    price: number;
    image: string;
    description: string;
    category: string;
}

let products: productosModel[];

export const getAllProducts = async (): Promise<productosModel[]> => {
    try {
        const response = await axios.get("https://fakestoreapi.com/products");
        products = response.data;
        return products;
    } catch (error) {
        console.log("Error in getAllProducts");
        return [];
    }
}

export const getProductById = async (id: number): Promise<productosModel | null> => {
    try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        return response.data;
    } catch (error) {
        console.log("Error in getProductById");
        return null;
    }
}
