import React from 'react'
import { Route, Redirect, Switch, BrowserRouter } from 'react-router-dom'
import PageLogin from '../pages/login'

const RouterAuth = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={PageLogin} />
            <Route path="*" render={props => <Redirect to="/" />} />
        </Switch>
    </BrowserRouter>
)

export default RouterAuth