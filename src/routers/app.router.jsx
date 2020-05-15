import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Layout from '../components/Layout'
import HomePage from '../pages/home'
import ProdutoPage from '../pages/produtos'
import TabloidePage from '../pages/tabloide'
import {useSignContext} from '../providers/use-sign'

const AppRouter = (props) => {
    const { signOut } = useSignContext()
    return (
        <BrowserRouter>
            <Layout {...props}>

                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/app" component={HomePage} />
                    <Route exact path="/app/home" component={HomePage} />
                    <Route exact path="/app/produto" render={propsRouter => <ProdutoPage {...props} {...propsRouter} />} />} />
                    <Route exact path="/app/tabloide" render={propsRouter => <TabloidePage {...props} {...propsRouter} />} />} />
                    <Route exact path="/logout" render={e => signOut()} />
                    <Route path="*" render={props => <h1>PAGE NOT FOUND!</h1>} />
                </Switch>

            </Layout>
        </BrowserRouter>
    )
}

export default AppRouter