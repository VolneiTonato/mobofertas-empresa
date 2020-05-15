import React, { Fragment } from 'react'
import {
    CircularProgress, Grid
} from '@material-ui/core'

const Loader = () => {


    return (

        <Fragment>
            <Grid
                container
                spacing={0}
                align="center"
                justify="center"
                direction="column"
            >
                <Grid item>
                    <CircularProgress  />
                </Grid>

            </Grid>
        </Fragment>



    )
}

export default Loader