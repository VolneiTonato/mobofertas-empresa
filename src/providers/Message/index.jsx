import React, { useState, createContext, useContext, useEffect, useCallback } from 'react'
import Prototypes from 'prop-types'
import ReactDOM from 'react-dom'
import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
const MessaObject = {
    open: Prototypes.bool,
    type: Prototypes.string,
    message: Prototypes.string,
    setType: Prototypes.func,
    setMessage: Prototypes.func,
    openMessage: Prototypes.func,
    closeMessage: Prototypes.func,
    setOpen: Prototypes.func

}

const MessageContext = createContext(MessaObject)


const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

function MessageSnackbarContent() {
    const { message, closeMessage, open, type } = useContext(MessageContext)

    const messageOutput = message ? (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={closeMessage}
            anchorOrigin={{vertical:'top', horizontal:'right'}}

        >
            <Alert onClose={closeMessage} severity={type}>
                {message}
            </Alert>
        </Snackbar>
    ) : null

    return ReactDOM.createPortal(
        messageOutput,
        document.getElementById("message-app")
    );
}


export const MessageContextProvider = (props) => {

    const [message, setMessage] = useState(null)
    const [open, setOpen] = useState(false)
    const [type, setType] = useState('success')

    const closeMessage = () => {
        setOpen(false)
        setMessage(null)
    }

    const openMessage = ({ message, type }) => {
        setType(type)
        setMessage(message)
        setOpen(true)
    }

    return (
        <MessageContext.Provider value={{
            openMessage,
            message,
            open,
            type,
            closeMessage
        }}>
            {props.children}
            <MessageSnackbarContent />
        </MessageContext.Provider>
    )

}

export function useMessageContext() {
    return useContext(MessageContext)
}