import React, {useState, useEffect} from 'react'
import QrReader from 'react-qr-reader'
import {Grid} from '@material-ui/core'

const ScanQRCode = () => {

    const [result, setResult] = useState('Sem registro.')


    const handleScan = data => {
        if (data) {
            setResult(data)
        }

        console.log(data)
    }
    const handleError = err => {
        
    }


    return (
        <Grid style={{margin:'auto', textAlign:'center'}} item xs={12}>
            <QrReader
                delay={300}
                facingMode="environment"
                onError={handleError}
                onScan={handleScan}
                resolution={2000}
                legacyMode={false}
                style={{width:'100%'}}
            />
            <p>{result}</p>
            </Grid>
    )

}


export default ScanQRCode