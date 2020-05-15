import React from 'react'
import {
    Toolbar,
    IconButton,
    Typography,
    Badge,
    makeStyles
} from '@material-ui/core'
import clsx from 'clsx'

import { Notifications, Menu } from '@material-ui/icons'

const useStyle = makeStyles(theme => ({
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    menuButton: {
        marginRight: 36,
    },
    title: {
        flexGrow: 1,
    },
}))

const ToolBarHeader = (props) => {

    const classes = useStyle()



    return (
        <Toolbar className={classes.toolbar}>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                className={clsx(classes.menuButton)}
                onClick={props.handleDrawerOpen}
            >
                <Menu />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                MOBOFERTAS - ESTABELECIMENTO
          </Typography>
            <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                    <Notifications />
                </Badge>
            </IconButton>
        </Toolbar>
    )
}


export default ToolBarHeader