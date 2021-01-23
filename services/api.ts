import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const baseURL = process.env.REACT_APP_SERVER ?? 'http://localhost:3333';

const instance = axios.create({
  baseURL,
  headers: { 'Content-type': 'application/json' },
  timeout: 3000,
});

export const getAccount = async (name: string) =>
  instance.get(`/${name}`).then(
    (response) => response.data,
    (_err) => null,
  );
