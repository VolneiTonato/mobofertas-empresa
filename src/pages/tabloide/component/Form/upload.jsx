import React, { useState, Fragment, useContext, useCallback,useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { TextField, withStyles, Grid, Box, CardContent, CardActionArea, CardMedia, Card } from '@material-ui/core'
import { CloudUpload } from '@material-ui/icons'
import { TabloideApi } from '../../../../services/service-data/tabloide'
import {useMessageContext} from '../../../../providers/Message'


const useStyles = makeStyles((theme) => ({

    root: {
        flexGrow: 1
    },
    responsiveImage: {
        maxWidth: '100%', width: 'auto', height: 'auto', maxHeight:'400px'
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


const UploadButtons = (props) => {
    const classes = useStyles()
    const [file, setFile] = useState(null)
    const {updateImage, image } = useContext(props.useTabloidContext)
    const [buttonDisabled, setButtonDisabled] =useState(false)
    

    const {openMessage} = useMessageContext()



    const onUploadImage =  (e) => {
        e.preventDefault()

        if (!file)
            return e.preventDefault()

        const form = new FormData()

        form.append('file', file)

        setButtonDisabled(true)


        TabloideApi.uploadTabloide(form)
            .then(id => {
                updateImage({tabloidId: id, isUploadImage: true})
                openMessage({message:'Imagem cadastrada com sucesso! Informe a data de validade!'})
            }).catch(err => {
                openMessage({message: err.toString(), type:'error'})
                setButtonDisabled(false)
            })

    }



    const onChangeFile = (e) => {
        const { files } = e.target

        updateImage({tabloidId: null, image:null})

        setFile(null)

        const fileReader = new FileReader()

        fileReader.readAsDataURL(files[0])

        fileReader.onload = (e) => {
            updateImage({image:  e.target.result})

            setFile(files[0])
        }

        fileReader.onprogress = (e) => {
            
        }
    }

    

    return (
        <Fragment>
            <Grid className={classes.root} style={{ margin: 'auto', textAlign: 'center' }} item xs={12}>
                <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={onChangeFile}
                />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" startIcon={<CloudUpload />} component="span">
                        Selecionar Arquivo
                    </Button>
                </label>
            </Grid>



            <Grid container justify="center" >
                <Grid item xs={6}>
                    <Box margin="auto" textAlign="center" marginTop={10}>

                        <Card>
                            <CardActionArea>
                                <CardMedia>
                                    <img className={classes.responsiveImage} src={image} alt="" />
                                </CardMedia>
                            </CardActionArea>
                            <CardContent>
                                {image ? (
                                    <Button
                                        type="button"
                                        fullWidth
                                        variant="contained"
                                        disabled={buttonDisabled}
                                        color="primary"
                                        className={classes.submit}
                                        onClick={onUploadImage}
                                    >Enviar Imagem</Button>
                                ) : null}

                            </CardContent>
                        </Card>

                    </Box>
                </Grid>
            </Grid>


        </Fragment>
    )
}

export default withStyles(useStyles)(UploadButtons)