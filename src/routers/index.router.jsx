import React from 'react'
import RouterAuth from './auth.router'
import RouterApp from './app.router'
import {useSignContext} from '../providers/use-sign'
import Loader from '../components/Loader'


const Routes = () => {
    const { signed, signLoading } = useSignContext()


    if (signLoading)
        return (
            <Loader />
        )

    return signed ? <RouterApp /> : <RouterAuth />
}

export default Routes