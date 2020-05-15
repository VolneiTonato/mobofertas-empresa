import api from './config/index'


export const TabloideApi = ({


    list: async () => {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await api.get('/tabloides/list')

                resolve(data)
            } catch (err) {
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
    uploadTabloide: async (content) => {

        return new Promise(async (resolve, reject) => {

            try {

                let { data } = await api.post('/tabloides/import-tabloid', content)
                if (data.file)
                    return resolve(data.file)

                new Error(`Erro ao enviar arquivo para o servidor!`)

            } catch (err) {

                reject(err)
            }
        })
    }
})
