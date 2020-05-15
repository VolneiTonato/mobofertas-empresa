import React, { useState, createContext, useContext, useEffect, useCallback } from 'react'
import { Auth } from '../../services/server-auth'
import Prototypes from 'prop-types'
import LocalForageProvider from '../../services/local-forage-provider'

const AuthObject = {
    signUser: Prototypes.object,
    signed: Prototypes.bool,
    signIn: Prototypes.func,
    signOut: Prototypes.func,
    signLoading: Prototypes.bool
}

const SignContext = createContext(AuthObject)


export const GetToken = async () => await LocalForageProvider.getItem('@mobofertas/access_token')


export const SignContextProvider = ({ children }) => {

    const [signUser, setSignUser] = useState(null)
    const [signLoading, setSignLoading] = useState(true)
    


    const getDataUserMemory = useCallback(() => {

        return new Promise(async (resolve) => {
            await new Promise((resolve) => setTimeout(resolve, 1000))

            let token = await LocalForageProvider.getItem('@mobofertas/refresh_token')
            let newToken = await Auth.getNewToken(token)

            if (newToken) {

                await LocalForageProvider.setItem('@mobofertas/access_token', newToken)

                let [user, token, refreshToken] = await Promise.all([
                    LocalForageProvider.getItem('@mobofertas/user-data'),
                    LocalForageProvider.getItem('@mobofertas/access_token'),
                    LocalForageProvider.getItem('@mobofertas/refresh_token')
                ])

                if (user && token && refreshToken)
                    setSignUser(user)

            }


            setSignLoading(false)

            resolve(true)
        })
    })

    const verifyUserIsOn = useCallback(async () => {

        if (!signUser)
            return true

        let token = await LocalForageProvider.getItem('@mobofertas/refresh_token')
        let isLogado = await Auth.isLogado(token)

        if (!isLogado)
            signOut()
    })

    useEffect(() => {

        (async () => {
            await getDataUserMemory()
        })()
    }, [])

    /*
    useEffect(() => {

        const timer = setInterval(verifyUserIsOn, 1000 * 60)

        return () => {
            clearInterval(timer)
        }

    }, [signUser])*/

    const signIn = async ({ email, password, cnpj }) => {
        let response = await Auth.logar({ email, password, cnpj })

        await LocalForageProvider.setItem('@mobofertas/access_token', response.token)
        await LocalForageProvider.setItem('@mobofertas/refresh_token', response.refreshToken)
        await LocalForageProvider.setItem('@mobofertas/user-data', response.user)

        setSignUser(response.user)
    }

    const signOut = () => {
        LocalForageProvider.clear().then(ok => {
            setSignUser(null)
        })
    }

    return (
        <SignContext.Provider value={{
            signed: !!signUser,
            signUser,
            signLoading,
            signIn,
            signOut
        }}>
            {children}
        </SignContext.Provider>
    )
}

export function useSignContext() {
    return useContext(SignContext)
}