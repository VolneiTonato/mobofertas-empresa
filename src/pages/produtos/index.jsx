import React, { Fragment, useState } from 'react'

import {
    Tabs,
    Box,
    Grid,
    AppBar,
    Typography,
    Tab
} from '@material-ui/core'

import SearchBar from '../../components/SearchBar'
import UploadCompressFile from './innerComponents/Upload'
import ListItem from './innerComponents/List'
import TitlePage from '../../components/Layout/TitlePage'
import CupomNFCE from './innerComponents/CupomNFCE'


const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

const a11yProps = (index) => {
    return {
        id: `nav-tab-${index}`,
        'aria-controls': `nav-tabpanel-${index}`,
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

const PageProduct = (props) => {

    const { url } = props.match

    const [query, setQuery] = useState()
    const [value, setValue] = useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const handlerOnChangeQuery = (e) => {
        setQuery(e.target.value)

    }

    return (
        <Fragment>

            <TitlePage title="Importação de Produtos" />

            <Grid container spacing={3}>
                <Grid style={{ margin: 'auto' }} item xs={12}>


                    <AppBar color="transparent" position="static">
                        <Tabs
                            variant="fullWidth"
                            value={value}
                            onChange={handleChange}
                            aria-label="nav tabs example"
                        >
                            <LinkTab label="Produtos Cadastrados" href={`${url}/tab-produtos`} {...a11yProps(0)} />
                            <LinkTab label="Arquivo via Planilha" href={`${url}/tab-upload-planilha`} {...a11yProps(1)} />
                            <LinkTab label="Cupom Fiscal NFC-e" href={`${url}/tab-read-qrcode`} {...a11yProps(2)} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                        <Grid container justify="center" style={{ margin: 'auto' }} >
                            <Grid item xs={12}>
                                <SearchBar handlerOnChangeQuery={handlerOnChangeQuery} placeholder="Pesquise o produto aqui" />
                                <Box marginBottom={2}></Box>
                                <ListItem query={query} />
                            </Grid>

                        </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Grid container justify="center" style={{ margin: 'auto' }} >
                            <Grid item xs={6}>
                                <UploadCompressFile />
                            </Grid>

                        </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <Grid container justify="center" style={{ margin: 'auto' }} >
                            <Grid item xs={12}>
                                <CupomNFCE {...props} />
                            </Grid>
                        </Grid>
                    </TabPanel>



                </Grid>
            </Grid>
        </Fragment>
    )
}

export default PageProduct