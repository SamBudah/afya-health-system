// This file contains the API service functions for making requests to the backend.
import api from './axiosConfig';

export const fetchClients = () => api.get('/clients');
export const fetchPrograms = () => api.get('/programs');
export const createEnrollment = (data) => api.post('/enrollments', data);
export const createProgram = async (programData) => {
    try {
      const response = await api.post('/programs', programData);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to create program');
    }
  };
export const fetchClientById = async (id) => {
    try {
      const response = await api.get(`/clients/${id}`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch client');
    }
  };