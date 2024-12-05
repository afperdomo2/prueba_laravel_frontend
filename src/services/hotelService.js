import { alertError } from '@/utils/alertUtil';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getHotels = async () => {
  try {
    const response = await axios.get(`${API_URL}/hotels`);
    return response.data;
  } catch (error) {
    console.error('Error fetching hotels:', error);
    throw error;
  }
};

export const getHotelById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/hotels/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching hotel with ID ${id}:`, error);
    throw error;
  }
};

export const createHotel = async (hotelData) => {
  try {
    const response = await axios.post(`${API_URL}/hotels`, hotelData);
    return response.data;
  } catch (error) {
    const message = error.response.data.message;
    alertError(message);
  }
};

export const deleteHotel = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/hotels/${id}`);
    return response.data;
  } catch (error) {
    const message = error.response.data.message;
    alertError(message);
  }
};
