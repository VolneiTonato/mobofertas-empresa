import React, { Fragment, useEffect, useState, useRef } from 'react'
import { BrowserQRCodeReader } from '@zxing/library'
import { Grid, Box, Button } from '@material-ui/core'
import { useMessageContext } from '../../../../providers/Message'
import { ProdutoApi } from '../../../../services/service-data/produto'
import { PhotoCamera, Pause } from '@material-ui/icons'

const CaptureVideoQrCode = () => {

    const [isRunning, setRunning] = useState(false)

    const { openMessage } = useMessageContext()

    const codeReader = useRef(new BrowserQRCodeReader())

    const openVideoStream = async () => {

        codeReader.current
            .decodeOnceFromVideoDevice(undefined, 'video')
            .then(resolveQRCode)
            .catch(rejectQRCode)
    }

    const rejectQRCode = (err) => {
        if(err.toString() == 'NotFoundException: Video stream has ended before any code could be detected.')
            return null
        openMessage({ message: err.toString(), type: 'error' })
    }

    const resolveQRCode = async (result) => {
        try {

            await ProdutoApi.saveQRCodeNFCE(result?.text)

            openMessage({ message: 'Leitura do cupom fiscal concluída!' })

            await new Promise(resolve => setTimeout(resolve, 2000))

            openMessage({ message: 'Os produtos estão sendo cadastrados automaticamente. Logo mais avisaremos se tudo correu bem! Aguarde...' })

            codeReader.current.reset()

        } catch (err) {
            rejectQRCode(err)
            openVideoStream()
        }
    }

    const startVideo = () => {
        if(isRunning)
            return false
        setRunning(true)
        openVideoStream()
    }

    const stopVideo = () => {
        if(!isRunning)
            return false

        setRunning(false)

        codeReader.current.reset()
    }

    useEffect(() => {

        

        return () => {
            codeReader.current.reset()
        }
    }, [])



    return (
        <Fragment>

            <Box component="div" textAlign="center" xs={6}>
                <video
                    id="video"
                    style={{ "border": "1px solid gray" }}
                ></video>
            </Box>

            <Box component="div" textAlign="center">
                <Box component="span" marginRight={1}>
                    <Button onClick={startVideo} variant="contained" startIcon={<PhotoCamera />}>
                        Iniciar Scanner
                </Button>

                </Box>

                <Box component="span">
                    <Button onClick={stopVideo} color="secondary" variant="contained" startIcon={<Pause />}>
                        Parar Scanner
                </Button>
                </Box>
            </Box>
        </Fragment>
    )

}

export default CaptureVideoQrCode

