import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://192.168.223.2:4000'
})