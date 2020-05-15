import { useEffect, useState } from 'react'
import { ProdutoApi } from '../../services/service-data/produto'


export const useProdutosSearchScroll = (query,  page) => {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [products, setProdutcts] = useState([])
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        setProdutcts([])
    }, [query])

    const pesquisarProduct = async (query,  page) => {
        return new Promise(async (resolve, reject) => {

            try {
                await ProdutoApi.list(query, { page })
                    .then((data) => {


                        let response = data?.response || []

                        setProdutcts(prevProdutcts => [...prevProdutcts, ...response])

                        setHasMore(response.length > 0)

                        resolve()

                    }).finally(ok => {

                        setLoading(false)

                    })

            } catch (err) {
                setError(true)

                reject(err)
            }
        })
    }


    useEffect(() => {

        setLoading(true)
        setError(false)

        pesquisarProduct(query, page)


    }, [page, query])

    return { loading, error, products, hasMore }
}