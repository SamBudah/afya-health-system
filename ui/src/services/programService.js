import axios from 'axios';

export const createProgram = async (programData) => {
  try {
    const response = await axios.post('/api/programs', programData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create program');
  }
};

export const fetchPrograms = async () => {
  try {
    const response = await axios.get('/api/programs');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch programs');
  }
};

export const getProgramById = async (id) => {
  try {
    const response = await axios.get(`/api/programs/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Program not found');
  }
};