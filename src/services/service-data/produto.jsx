import api from './config/index'
import axios from 'axios'


export const ProdutoApi = ({

    list: async (query, {page}) => {
        return new Promise(async (resolve, reject) => {
            try {

                let url = `/precos-produto/list?page=${page}`

                if(query)
                    url = `${url}&q=${query}`


                const { data } = await api.get(`${url}`)

                resolve(data)
            } catch (err) {
                if(axios.isCancel(err)) return
                reject(err)
            }
        })
    },

    remove: async (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                await api.delete('/tabloides/remove', { data: { id: id } })
                resolve(true)
            } catch (err) {
                if(axios.isCancel(err)) return
                reject(err)
            }
        })
    },

    update: async (id, param = {}) => {
        return new Promise((async (resolve, reject) => {
            try {
                await api.put('/tabloides/save', { id, params: param })

                resolve(true)

            } catch (err) {
                if(axios.isCancel(err)) return
                reject(err)
            }
        }))
    },

    save: async (content) => {
        return new Promise(async (resolve, reject) => {
            try {

                await api.post('/tabloides/save', content)

                resolve(true)
            } catch (err) {
                reject(err)
            }
        })
    },
    saveQRCodeNFCE: async(data = {}) => {
        return new Promise(async (resolve, reject) => {
            try{
                await api.post('/cupom-nfce/save', {linkNfce : data.link, dataValidade: data.dataValidade})

                resolve(true)
            }catch(err){
                reject(err)
            }
        })
    },
    uploadQRCode: async (content) => {
        return new Promise(async (resolve, reject) => {
            try{
                await api.post('/precos-produto/receive-qrcode', content)

                resolve(true)

            }catch(err){
                reject(err)
            }
        })
    },
    uploadPlanilhaZip: async (content) => {

        return new Promise(async (resolve, reject) => {

            try {

                let response = await api.post('/precos-produto/import-planilha', content)

                if(response.status === 200)
                    resolve(true)
                
                

                new Error(`Erro ao enviar arquivo para o servidor!`)

            } catch (err) {

                reject(err)
            }
        })
    }
})