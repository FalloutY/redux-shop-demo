import fetch from 'isomorphic-unfetch';
export const API_BASE = 'http://localhost:3001/';

export default {
  getServices: () => fetch(`${API_BASE}services`)
};