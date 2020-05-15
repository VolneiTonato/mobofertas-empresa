import React, { useState, useEffect, useRef, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { TabloideApi } from '../../../../services/service-data/tabloide'
import { useMessageContext } from '../../../../providers/Message'
import {
    Grid,
    FormGroup,
    FormControlLabel,
    Switch,
    Box

} from '@material-ui/core'

import Moment from 'react-moment'



const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 250
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}))



export default function ImgMediaCard({ item }) {
    const classes = useStyles()
    const [checkedStatus, setCheckedStatus] = useState(false)
    const itemRef = useRef()
    const { openMessage } = useMessageContext()

    const onChangeStatus = useCallback(async () => {
        try {

            setCheckedStatus(prev => !prev)

            const id = itemRef.current.querySelector('input[name=id]').value

            
            
            await TabloideApi.update(id, {status: !checkedStatus })

            openMessage({ message: 'Status alterado com sucesso!' })

        } catch (err) {
            openMessage({ message: err.toString(), type: 'error' })
        }
    }, [])

    const deleteTabloide = async (e) => {

        const id = itemRef.current.querySelector('input[name=id]').value

        TabloideApi.remove(id).then(ok => {
            itemRef.current.remove()
            openMessage({ message: 'Tablóide removido com sucesso!' })

        }).catch(err => {
            openMessage({ message: err.toString(), type: 'error' })

        })

    }

    useEffect(() => {
        setCheckedStatus(item.status || false)
    }, [])

    return (
        <Grid ref={itemRef} item xs={12} md={4}>
            <input type="hidden" value={item._id} name="id" />
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt=""
                        height="140"
                        image={`${item.imagem.src}/${item.imagem.name}`}
                        title=""
                    />
                </CardActionArea>
                <CardContent >
                    <Typography gutterBottom variant="h5" component="h2">
                        <Box textAlign="center">
                            Válido Até <Moment format="DD/MM/YYYY">{item.dataValidade}</Moment>
                        </Box>
                    </Typography>
                    <Typography gutterBottom variant="caption" color="error" component="span">
                        <Box textAlign="center">
                            Cadastrado em <Moment format="DD/MM/YYYY">{item.createdAt}</Moment>
                        </Box>
                    </Typography>
                </CardContent>

                <CardActions>

                    <Grid container component="div">
                        <Grid item xs={12}>
                            <Box textAlign="center" alignItems="center" component="div">
                                <Button size="small" color="primary">
                                    <FormGroup>
                                        <FormControlLabel
                                            control={<Switch color="primary" checked={checkedStatus} name="status" onChange={onChangeStatus} />}
                                            label={checkedStatus ? 'Ativo' : 'Inativo'}
                                        />
                                    </FormGroup>
                                </Button>
                            </Box>
                        </Grid>

                        <Grid item xs={12}>
                            <Box textAlign="center" alignItems="center" component="div" >
                                <Button variant="outlined" onClick={deleteTabloide} size="small" color="secondary">
                                    Excluir Tablóide
                                </Button>
                            </Box>
                        </Grid>

                    </Grid>



                </CardActions>
            </Card>
        </Grid>

    );
}