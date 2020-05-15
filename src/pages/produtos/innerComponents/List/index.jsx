import React, { useEffect, useState, Fragment, useRef, useCallback } from 'react'
import { Grid, Box, CircularProgress } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import ProdutoItem from './list-item'
import { size } from 'lodash'
import { useProdutosSearchScroll } from '../../../../components/ApiSearchBar/ProdutoSearchBar'


const ProdutosList = (props) => {

    const { query } = props
    const [page, setPage] = useState(1)

    useEffect(() => {
        setPage(1)
    }, [query])


    const {
        error,
        hasMore,
        loading,
        products
    } = useProdutosSearchScroll(query, page)

    const observer = useRef()

    const lastProductElementRef = useCallback(node => {
        if (loading) return

        if (observer.current) observer.current.disconnect()

        observer.current = new IntersectionObserver(entries => {

            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1)
            }
        })

        if (node) observer.current.observe(node)

    }, [loading, hasMore])


    useEffect(() => {

        setPage(1)
    }, [])





    return (
        <Fragment>
            {products.length > 0 ? (
                <Fragment>
                    <Grid container spacing={3} >

                        {products.map((row, idx) => {
                            if (products.length === idx + 1) {
                                return <ProdutoItem key={row._id} item={row} ref={lastProductElementRef} />
                            } else {
                                return <ProdutoItem key={row._id} item={row} />
                            }
                        })}
                    </Grid>
                    <Box component="div" marginBottom={2} />

                </Fragment>
            ) : loading || error ? null : (
                <Box component="span">
                    <Alert variant="outlined" severity="warning">
                        {
                            size(query) ? 'Nenhum produto encontrado com a pesquisa desejada.'
                                : 'Não há produtos cadastrados no momento para este estabelecimento.'
                        }
                    </Alert>
                </Box>)}
            <Grid container justify="center">
                <Grid item xs={12} sm={6}>
                    {loading ? <Box textAlign="center" component="div"><CircularProgress color="inherit" /></Box> : null}
                    {error ? <Box component="span"><Alert variant="outlined" severity="error">Ocorreu um erro na pesquisa! Tente novamente</Alert></Box> : null}
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default ProdutosList