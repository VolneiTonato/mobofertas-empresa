import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Layout from './Layout'
import HomePage from '../pages/home'
import ProdutoPage from '../pages/produtos'
import TabloidePage from '../pages/tabloide'

const AppAdmin = (props) => {
    
    return (
        <Layout {...props}>
            <Switch>
                <Route exact path="/app" component={HomePage} />
                <Route exact path="/app/home" component={HomePage} />
                <Route exact path="/app/produto" render={propsRouter => <ProdutoPage {...props} {...propsRouter} />} />} />
                <Route exact path="/app/tabloide" render={propsRouter => <TabloidePage {...props} {...propsRouter} />} />} />
                <Route path="*" render={props => <h1>PAGE NOT FOUND!</h1>} />
            </Switch>
        </Layout>
    )
}

export default AppAdmin