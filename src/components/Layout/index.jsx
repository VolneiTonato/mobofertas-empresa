import React, { useState } from 'react'
import clsx from 'clsx'
import {
    AppBar,
    IconButton,
    Drawer,
    Divider,
    List,
    CssBaseline,
    Container
} from '@material-ui/core'
import { ChevronLeft } from '@material-ui/icons'
import MenuListItens from '../Menu'
import ToolbarHeader from '../toolbar-head'
import { useStyle } from '../Theme'


const LayoutApp = (props) => {

    const classes = useStyle()

    const [open, setOpen] = useState(true)

    const handleDrawerClose = () => { setOpen(false) }

    const handleDrawerOpen = () => { setOpen(true) }

    return (

        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <ToolbarHeader handleDrawerOpen={handleDrawerOpen} />
            </AppBar>

            <Drawer variant="permanent" open={true} classes={{ paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose) }}>
                <div className={classes.toolbarIcon}>
                    {
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeft />
                        </IconButton>
                    }
                </div>
                <Divider />
                <List>{<MenuListItens {...props} />}</List>
                <Divider />
            </Drawer>


            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    {props.children}
                </Container>

            </main>

        </div>

    )

}

export default LayoutApp