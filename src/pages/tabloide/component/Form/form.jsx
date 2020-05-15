import React, { useState, useContext, useEffect, useRef } from 'react'
import {
    TextField, Button, makeStyles
} from '@material-ui/core'
import { TabloideApi } from '../../../../services/service-data/tabloide'
import {useMessageContext} from '../../../../providers/Message'

const useStyle = makeStyles((theme) => ({

    root: {
        flexGrow: 1
    },
    responsiveImage: {
        maxWidth: '100%', width: 'auto', height: 'auto'
    },
    input: {
        display: 'none',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },

}))

const FormTabloide = (props) => {
    const classes = useStyle()
    const { updateImage, isUploadImage, tabloidId } = useContext(props.useTabloidContext)
    const {openMessage} = useMessageContext()
    const [id, setId] = useState(null)


    const [state, updateState] = useState({
        dataValidade: null,
        step: 2
    })

    const onSubmitForm = (e) => {
        e.preventDefault()

        if(!id)
            return openMessage({message: 'Id inválido!', type:'error'})

        
        TabloideApi.update(id, state)
            .then(ok => {
                updateImage({tabloidId:null, image:null, isUploadImage:false})
                openMessage({message:'Tablóide cadastrado com sucess!'})
            }).catch(err => {
                openMessage({message: err.toString(), type:'error'})
            })


    }

    useEffect(() => {
        if(tabloidId)
            setId(tabloidId)
    }, [tabloidId])


    const onChange = (e) => {
        e.preventDefault()
        updateState({ ...state, [e.target.name]: e.target.value })
    }

    if (!isUploadImage)
        return null

    return (
        <form onSubmit={onSubmitForm} className={[classes.form]}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="dataValidade"
                type="date"
                id="data-validade"
                autoComplete="off"
                onChange={onChange}
                InputLabelProps={{
                    shrink: true,
                }}
            />

            <input type="hidden" value={state?.id} name="id" />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >Cadastrar</Button>
        </form>
    )
}

export default FormTabloide