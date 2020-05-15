import React, { Fragment, useState } from 'react'
import TitlePage from '../../components/Layout/TitlePage'
import {
    Tab,
    Tabs,
    makeStyles,
    AppBar,
    Grid,
    Typography,
    Box
} from '@material-ui/core'
import FormCadastro from './component/Form'
import ListItemTabloide from './component/ListItem'



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

const PageTabloide = (props) => {
    
    const [value, setValue] = useState(0)
    const { match } = props

    const handleChange = (e, newValue) => {
        setValue(newValue)
    }

    return (
        <Fragment>
            <TitlePage title="Importação Tabloides" />

            <AppBar color="transparent" position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    centered
                >
                    <LinkTab label="Lista de Tabloides" href={`${match?.url}/tab-list`} {...a11yProps(0)} />
                    <LinkTab label="Cadastrar Tabloide" href={`${match?.url}/tab-upload`} {...a11yProps(1)} />

                </Tabs>

            </AppBar>

            <TabPanel value={value} index={0}>
                <ListItemTabloide />   
            </TabPanel>

            <TabPanel value={value} index={1}>
                <Grid container justify="center" style={{ margin: 'auto' }} >
                    <Grid item xs={12}>
                        <FormCadastro />
                    </Grid>
                </Grid>
            </TabPanel>


        </Fragment>
    )

}

export default PageTabloide
