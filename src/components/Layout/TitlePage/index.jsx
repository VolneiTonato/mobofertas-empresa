import React from 'react'
import {
    Grid,
    Typography,
    Box
} from '@material-ui/core'
import PropTypes from 'prop-types'


const TitlePage = (props) => {
    return (
        <Grid container spacing={3}>
            <Grid style={{ margin: 'auto', textAlign: 'center' }} item xs={12}>
                <Typography component="div" variant="body1">
                    <Box boxShadow={1} color="warning.main">
                        <h1>{props.title}</h1>
                    </Box>
                </Typography>
            </Grid>
        </Grid>
    )
}


export default TitlePage