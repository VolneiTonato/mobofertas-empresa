import React, { useEffect, useState, Fragment } from "react"
import { Grid} from '@material-ui/core'
import { useMessageContext } from '../../../../providers/Message'
import { TabloideApi } from '../../../../services/service-data/tabloide'
import ListItens from './list'



export default () => {
    const [tabloides, setTabloides] = useState([])
    const {openMessage} = useMessageContext()
    const [message, setMessage] = useState('Carregando tablóides...')

    useEffect(() => {
        (async () => {
            try {
                let {response} = await TabloideApi.list()

                if(!response?.length)
                    setMessage('Nenhum tablóide cadastrado.')

                setTabloides(response)
            } catch (err) {
                openMessage({message: err.toString(), type:'error'})
            }finally{
                
            }
        })()

        return () => {
            setTabloides([])
        }
    }, [])

    return (
        <Fragment>
            {tabloides.length > 0 ? (
                <Fragment>
                    <Grid container spacing={3} >
                        {tabloides.map(item =>
                            <ListItens key={item._id} item={item} />
                        )}
                    </Grid>
                </Fragment>

            ): message}

        </Fragment>
    )

}