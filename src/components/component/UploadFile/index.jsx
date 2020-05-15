import React, { useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { TextField, withStyles, Grid, Box, CardContent, CardActionArea, CardMedia, Card } from '@material-ui/core'
import { CloudUpload } from '@material-ui/icons'
import { TabloideApi } from '../../../../services/service-data'
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


const UploadButtons = (props) => {
    const classes = useStyles()
    const [image, setImage] = useState(null)
    const [file, setFile] = useState(null)


    const [state, updateState] = useState({
        dataValidade: null
    })


    const onSubmitForm = (e) => {
        e.preventDefault()

        if (!file)
            return e.preventDefault()

        const form = new FormData()

        form.append('file', file)

        TabloideApi.uploadTabloide(form)
            .then(fileName => {

                let data = {
                    dataValidade: state.dataValidade,
                    fileName: fileName
                }

                TabloideApi.save(data)
                    .then(ok => {
                        console.log('ok')
                    }).catch(err => {
                        console.log(err)
                    })

            }).catch(err => {
                console.log(err)
            })

    }


    const onChange = (e) => {
        e.preventDefault()
        updateState({ ...state, [e.target.name]: e.target.value })
    }

    const onChangeFile = (e) => {
        const { files } = e.target

        setImage(null)
        setFile(null)

        const fileReader = new FileReader()

        fileReader.readAsDataURL(files[0])

        fileReader.onload = (e) => {
            setImage(e.target.result)

            setFile(files[0])
        }

        fileReader.onprogress = (e) => {
            console.log(e.target)
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

                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                        >Enviar</Button>
                                    </form>
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