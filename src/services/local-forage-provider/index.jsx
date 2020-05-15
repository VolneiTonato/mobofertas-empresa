import LocalForage from 'localforage'


LocalForage.config({
    driver: [LocalForage.INDEXEDDB, LocalForage.LOCALSTORAGE],
    name: 'mobofertas_estabelecimento',
    storeName: 'moboofertas_estabelecimento_keys'
})


export default LocalForage