import axios from 'axios'
import { GetToken } from '../../../providers/use-sign'

const CancelToken = axios.CancelToken
let cancel

const api = axios.create({ baseURL: process.env.REACT_APP_API_URL })


api.isCancel = axios.isCancel

api.interceptors.request.use(async config => {

    if(cancel)
        cancel()

    const token = await GetToken()

    config.cancelToken = new CancelToken( (c) => cancel = c)

    if (token) 
        config.headers.Authorization = `Bearer ${token}`
    
    return config
})

api.interceptors.response.use(async response => {
    return response
}, (err) => {

    if(axios.isCancel(err))
        return Promise.reject(new axios.Cancel())
    
    if(err?.response?.data?.message)
        return Promise.reject(err?.response?.data?.message)
    else
        return Promise.reject(err.toString())

})

export default api