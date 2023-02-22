import axios from 'axios';

const request = axios.create({
    timeout: 5000,
    baseURL: '/api'
})
request.interceptors.request.use(config => {
    config.headers = config.headers || {}
    config.headers.token = sessionStorage.getItem('token') || ''
    return config
})


export default request