import axios from 'axios'


const CancelToken = axios.CancelToken
let cancel


const Api = axios.create({
    baseURL: process.env.REACT_APP_API_AUTH, withCredentials: true, headers: {
        'Content-Type': 'application/json'
    }
})

Api.interceptors.request.use(async config => {

    if(cancel)
        cancel()

    config.cancelToken = new CancelToken( (c) => cancel = c)
    
    return config

}, (err) => {
    return Promise.reject(err)
})

Api.interceptors.response.use(async response => {
    return response
}, (err) => {
    
    if(axios.isCancel(err))
        return Promise.reject(new axios.Cancel())
    
    if(err?.response?.data?.message)
        return Promise.reject(err?.response?.data?.message)
    else
        return Promise.reject(err.toString())

})

export default Api