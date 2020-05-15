import React, { Fragment, useState } from 'react'
import {
    AppBar, Tabs, Typography, Grid, Box, Tab
} from '@material-ui/core'
import CatureVideoQRCode from './captureVideoQrCode'
import UploadFileAndCaptureQRCode from './uploadFileAndCaptureQrcode'

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel-inner"
            hidden={value !== index}
            id={`nav-tabpanel-inner-${index}`}
            aria-labelledby={`nav-tab-inner-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

const a11yProps = (index) => {
    return {
        id: `nav-tab-inner-${index}`,
        'aria-controls': `nav-tabpanel-inner-${index}`,
    }
}

const LinkTab = (props) => {
    return (
        <Tab
            component="a"
            style={{ margin: 'auto', justifyContent: 'center' }}
            onClick={(event) => {
                event.preventDefault()
            }}
            {...props}
        />
    )
}

const CupomNFC = (props) => {
    const { url } = props.match

    const [value, setValue] = useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    };
    return (
        <Fragment>
            <AppBar color="transparent" position="static">
                <Tabs
                    variant="fullWidth"
                    value={value}
                    onChange={handleChange}
                >
                    <LinkTab label="Camera/WebCam" href={`${url}/tab-video`} {...a11yProps(0)} />
                    <LinkTab label="Enviar por Arquivo" href={`${url}/tab-upload`} {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <Grid container justify="center" style={{ margin: 'auto' }} >
                    <Grid item xs={12}>
                        <CatureVideoQRCode />
                    </Grid>

                </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Grid container justify="center" style={{ margin: 'auto' }} >
                    <Grid item xs={12}>
                        <UploadFileAndCaptureQRCode />
                    </Grid>

                </Grid>
            </TabPanel>
        </Fragment>
    )
}

export default CupomNFC