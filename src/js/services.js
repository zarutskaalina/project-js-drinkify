import axios from "axios";

export const BASE_URL = "https://drinkify.b.goit.study/api/v1";

axios.defaults.baseURL = BASE_URL;

export const getIngredients = async (id) => { 
    try {
        const { data } = await axios(`/ingredients/${id}`);

        return data;
    } catch (error) {
        throw new Error("Something goes wrong!");
    }
};