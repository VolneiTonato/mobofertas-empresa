import React, { Fragment, useEffect, useState } from 'react'
import { Box, Button } from '@material-ui/core'
import { Decoder } from '@nuintun/qrcode'
import { ProdutoApi } from '../../../../services/service-data/produto'
import { useMessageContext } from '../../../../providers/Message'
import { CloudUpload } from '@material-ui/icons'

const UploadFileQRCodeAndCaptureURL = () => {
    const [canvas, setCanvas] = useState(null)
    const [contextCanvas, setContextCanvas] = useState(null)
    const [imageData, setImageData] = useState(null)
    const [img, setImg] = useState()
    const [hasImage, setHasImage] = useState(false)
    const { openMessage } = useMessageContext()

    useEffect(() => {
        setImg(new Image())
        const canvas = document.getElementById('decode-canvas')
        setCanvas(canvas)
        setContextCanvas(canvas.getContext('2d'))


        return () => {
            setImg(null)
            setCanvas(null)
            setContextCanvas(null)
            setImageData(null)
            setHasImage(false)
        }
    }, [])

    const markFinderPattern = (x, y, moduleSize) => {
        contextCanvas.fillStyle = '#00ff00';

        contextCanvas.beginPath();
        contextCanvas.arc(x, y, moduleSize * 0.75, 0, 2 * Math.PI);
        contextCanvas.fill();
    }

    const getModuleSize = (location, version) => {
        let topLeft = location.topLeft;
        let topRight = location.topRight;
        let a = Math.abs(topRight.x - topLeft.x);
        let b = Math.abs(topRight.y - topLeft.y);
        let c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

        return c / (version * 4 + 17);
    }


    const markQRCodeArea = (location, version) => {
        contextCanvas.lineWidth = 2;
        contextCanvas.strokeStyle = '#00ff00';

        contextCanvas.beginPath();
        contextCanvas.moveTo(location.topLeft.x, location.topLeft.y);
        contextCanvas.lineTo(location.topRight.x, location.topRight.y);
        contextCanvas.lineTo(location.bottomRight.x, location.bottomRight.y);
        contextCanvas.lineTo(location.bottomLeft.x, location.bottomLeft.y);
        contextCanvas.lineTo(location.topLeft.x, location.topLeft.y);
        contextCanvas.stroke();

        let moduleSize = getModuleSize(location, version);

        markFinderPattern(location.topLeftFinder.x, location.topLeftFinder.y, moduleSize);
        markFinderPattern(location.topRightFinder.x, location.topRightFinder.y, moduleSize);
        markFinderPattern(location.bottomLeftFinder.x, location.bottomLeftFinder.y, moduleSize);
    }

    const getImageData = () => {
        imageData && contextCanvas.putImageData(imageData, 0, 0)

        return imageData || contextCanvas.getImageData(0, 0, canvas.width, canvas.height)
    }

    const drawImage = (src) => {

        img.crossOrigin = 'anonymous'

        img.onload = function () {
            let width = img.width;
            let height = img.height;
            let actualWidth = Math.min(960, width);
            let actualHeight = height * (actualWidth / width);

            setHasImage(true)
            canvas.width = actualWidth;
            canvas.height = actualHeight;

            contextCanvas.drawImage(img, 0, 0, width, height, 0, 0, actualWidth, actualHeight);

            setImageData(contextCanvas.getImageData(0, 0, actualWidth, actualHeight))
        };

        img.src = src
    }

    const handlerDecode = async () => {

        try {

            if (!hasImage)
                return false

            const imageData = getImageData()
            const result = new Decoder().decode(imageData.data, imageData.width, imageData.height)

            if (result) {
                markQRCodeArea(result.location, result.version)

                await ProdutoApi.saveQRCodeNFCE(result?.data)

                openMessage({ message: 'QRCode enviado com sucesso! Os proudos serão cadastrados em breve.' })

            } else {
                throw new Error('Erro ao decodificar imagem, tente com outra!')
            }

        } catch (err) {
            openMessage({ message: err.toString(), type: 'error' })
        }


    }

    const handlerChangeFile = (e) => {
        const { files } = e.target

        const fileReader = new FileReader()

        fileReader.onload = (e) => {

            drawImage(e.target.result)
        }

        fileReader.readAsDataURL(files[0])

    }


    return (
        <Fragment>
            <Box component="div" alignContent="center" textAlign="center">
                <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="contained-button-file"
                    multiple
                    name="file"
                    type="file"
                    onChange={handlerChangeFile}
                />

                <Box component="span" marginRight={1}>
                    <label htmlFor="contained-button-file">
                        <Button variant="contained" color="primary" startIcon={<CloudUpload />} component="span">
                            Selecionar Arquivo
                    </Button>
                    </label>
                </Box>


                <Box component="span">
                    <Button onClick={handlerDecode} color="primary" variant="contained">
                        Ler QRCode e Cadastrar
                </Button>
                </Box>

            </Box>

            <Box component="div" alignContent="center" textAlign="center" marginTop={1} boxSizing={2} xs={6}>
                <canvas style={{ maxWidth: '400px', maxHeight: '400px', width: '100%', height: '100%' }} id="decode-canvas"></canvas>
            </Box>

            

        </Fragment>
    )

}

export default UploadFileQRCodeAndCaptureURL

