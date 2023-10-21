import axios from 'axios';

export const client = axios.create({
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
  timeout: 0,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
})

export const HOST = 'http://localhost:8000';
