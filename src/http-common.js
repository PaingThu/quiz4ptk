import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://paingthu.github.io/api/',
})