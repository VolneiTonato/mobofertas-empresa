import React from 'react';
import { SignContextProvider } from './providers/use-sign'
import { MessageContextProvider } from './providers/Message'
import Router from './routers/index.router'


const App = () => (

    <SignContextProvider>
        <MessageContextProvider>
            <Router />
        </MessageContextProvider>
    </SignContextProvider>

)

export default App
