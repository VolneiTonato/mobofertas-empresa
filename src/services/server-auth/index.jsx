import api from './config'
import axios from 'axios'


export const Auth = ({

    isLogado: async (token) => {
        try {

            let { data } = await api.post('/islogado', { token })

            return data.isLogado

        } catch (err) {

            if(axios.isCancel(err)) return 

            return false
        }
    },
    getNewToken: async (token) => {
        try {

            let { data } = await api.post('/token', { token })

            return data.token

        } catch (err) {

            if(axios.isCancel(err)) return 

            return false
        }
    },

    logar: async ({ email, password, cnpj }) => {
        return new Promise(async (resolve, reject) => {

            try {
                let { data } = await api.post('/login', { email, password, cnpj })

                resolve(data)

            } catch (err) {
                
                if (axios.isCancel(err)) return

                reject(err)
            }


        })

    }
})