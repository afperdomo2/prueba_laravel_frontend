import { alertError } from '@/utils/alertUtil';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const createRoom = async (hotelId, roomData) => {
  try {
    const response = await axios.post(
      `${API_URL}/hotels/${hotelId}/rooms`,
      roomData
    );
    return response.data;
  } catch (error) {
    const message = error.response.data.error;
    alertError(message);
  }
};

export const deleteRoom = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/rooms/${id}`);
    return response.data;
  } catch (error) {
    const message = error.response.data.error;
    alertError(message);
  }
};
