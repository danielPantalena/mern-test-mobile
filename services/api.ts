import axios from 'axios';

const baseURL = 'http://www.furnishmypad.com:3000';

const instance = axios.create({
  baseURL,
  headers: {'Content-type': 'application/json'},
  timeout: 3000,
});

export const getAccount = async (name: string) =>
  instance.get(`/${name}`).then(
    (response) => response.data,
    (_err) => null,
  );

export const registerToken = async (token: string) =>
  instance.post('/notification', {token}).then(
    (response) => response.data,
    (_err) => null,
  );

export const readAllTokens = async () =>
  instance.get('/notification').then(
    (response) => response.data,
    (_err) => [],
  );

interface Imessage {
  message: string;
  title?: string;
}

export const sendNotification = async (message: Imessage, tokens: string[]) => {
  tokens.forEach((token) => {
    const notificationBody = {...message, token};
    instance.post('/notification/send', notificationBody).then(
      (response) => response.data,
      (_err) => null,
    );
  });
};

export const readAllAccounts = async () => {
  instance.get('/admin').then(
    (response) => response.data,
    (_err) => [],
  );
};
