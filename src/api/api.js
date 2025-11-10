import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export const fetchTasks = () => axios.get(`${API_BASE}/tasks/all`).then(r => r.data);

export const createTask = (task) => axios.post(`${API_BASE}/create`, task).then(r => r.data);

export const updateTask = (id, task) => axios.put(`${API_BASE}/update/${id}`, task).then(r => r.data);

export const deleteTask = (id) => axios.delete(`${API_BASE}/delete/${id}`).then(r => r.data);
