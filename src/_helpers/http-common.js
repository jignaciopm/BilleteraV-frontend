import axios from 'axios'

export const HTTP = axios.create({
  baseURL: `http://localhost/billeterav/public/api`,
  withCredentials: false,
})
