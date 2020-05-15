import React, { Fragment, useState } from 'react'
import { Grid, Button, makeStyles, Box, Card, CardActionArea, CardMedia, CardContent, Typography } from '@material-ui/core'
import { CloudUpload } from '@material-ui/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileArchive } from '@fortawesome/free-solid-svg-icons'
import {ProdutoApi} from '../../../../services/service-data/produto'
import { useMessageContext} from '../../../../providers/Message'

const useStyles = makeStyles((theme) => ({
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

const UploadZipFile = () => {
    const [file, setFile] = useState(null)
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const { openMessage} = useMessageContext()

    const classes = useStyles()

    const handlerOnChangeFile = (e) => {

        const { files } = e.target

        const fileReader = new FileReader()

        fileReader.readAsDataURL(files[0])

        fileReader.onload = (e) => {
            setFile(files[0])
        }

        fileReader.onprogress = (e) => {

        }

        fileReader.onabort = (e) => {
            setFile(null)
        }
    }

    const handlerOnUploadFile = (e) => {
        if (!file)
            return e.preventDefault()

        const form = new FormData()

        form.append('file', file)

        setButtonDisabled(true)

        ProdutoApi.uploadPlanilhaZip(form)
            .then(id => {
                setFile(null)
                openMessage({message:'Produtos cadastrados com sucesso!'})
            }).catch(err => {
                openMessage({message: err.toString(), type:'error'})
            }).finally(() => {
                setButtonDisabled(false)
            })

        
    }

    return (
        <Fragment>
            <Grid className={classes.root} style={{ margin: 'auto', textAlign: 'center' }} item xs={12}>
                <input
                    accept="zip,application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed"
                    className={classes.input}
                    id="contained-button-file"
                    type="file"
                    onChange={handlerOnChangeFile}
                />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" startIcon={<CloudUpload />} component="span">
                        Selecionar Arquivo ZIP
                    </Button>
                </label>
            </Grid>

            <Grid container justify="center" >
                <Grid item xs={6}>
                    <Box margin="auto" textAlign="center" marginTop={10}>

                        <Card>

                            {file ? (

                                <Fragment>

                                    <CardMedia>
                                        <FontAwesomeIcon size="3x" icon={faFileArchive} />
                                    </CardMedia>

                                    <CardContent>
                                        <Button
                                            type="button"
                                            fullWidth
                                            variant="contained"
                                            disabled={buttonDisabled}
                                            color="primary"
                                            className={classes.submit}
                                            onClick={handlerOnUploadFile}
                                        >Enviar Arquivo</Button>
                                        
                                        <Typography  display="block" component="div">
                                            <Box hidden={buttonDisabled === false} component="h3">
                                                Enviando arquivo para o servidor! Aguarde...
                                            </Box>
                                            
                                        </Typography>
                                    </CardContent>
                                </Fragment>
                            ) : null}
                        </Card>

                    </Box>
                </Grid>
            </Grid>

        </Fragment>
    )
}

export default UploadZipFile