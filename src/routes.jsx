import React, { Fragment, useEffect, useState, useContext } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Backdrop, CircularProgress } from '@material-ui/core'
import {auth} from './services/server-auth'
import PageLogin from './pages/login'
import AppAdmin from './components/Admin'
import useSignContext from './providers/use-sign'
import {useHistory} from 'react-router-dom'

const PrivateRouter = ({ component: Component, ...outhers }) => {

    const history = useHistory()
    const { signIsLogado } = useSignContext()
    const [openBackdrop, setOpenBackdrop] = useState(true)
    const [isInitializer, setIsInitializer] = useState(false)

    const getIsAuth = async () => {
        

        let isAuth = await auth().isLogado()

        if(!isAuth){
            await auth().logout()
            return history.push('/')
        }

        
        setOpenBackdrop(false)
        setIsInitializer(true)

    }

    useEffect(() => {
        (async () => {

            await new Promise(resolve => setTimeout(resolve, 100))
                .then(async ok => {
                    await getIsAuth()
                })
        })()
    }, [])

    return (

        <Fragment>
            {isInitializer === false ? (
                <Backdrop open={openBackdrop}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            ) : (
                    <Route {...outhers} render={props => (
                        signIsLogado ? (
                            <Component {...props} />
                        ) : (
                                <Redirect to={{ pathname: '/', state: { from: props.location } }} />
                            )
                    )} />
                )}


        </Fragment>
    )
}

const Routes = () => {

    return (
        
        <BrowserRouter>
            <Switch>
                <Route exact strict path="/" component={PageLogin} />
                <PrivateRouter strict path="/app" component={AppAdmin} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes