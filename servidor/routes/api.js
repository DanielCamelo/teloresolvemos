// En src/services/api.js
import axios from 'axios';

const baseURL = 'http://localhost:5000';

export const fetchItems = async () => {
    try {
        const response = await axios.get(`${baseURL}/items`);
        return response.data;
    } catch (error) {
        console.error('Error fetching items', error);
        throw error;
    }
};

export const addItem = async (item) => {
    try {
        const response = await axios.post(`${baseURL}/items`, item);
        return response.data;
    } catch (error) {
        console.error('Error adding item', error);
        throw error;
    }
};
