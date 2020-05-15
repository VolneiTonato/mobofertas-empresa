import React, { createContext, useState, useContext, Fragment, useRef, createRef } from 'react'
import FormData from './form'
import UploadFile from './upload'
import PropTypes from 'prop-types'

const iObjContext = {
    image: PropTypes.number,
    updateImage: PropTypes.func,
    isUploadImage: PropTypes.bool,
    tabloidId: PropTypes.number
}

const FormContext = createContext(iObjContext)

const FormProvider = ({ children }) => {


    const [image, setImage] = useState(null)
    const [isUploadImage, setIsUploadImage] = useState(false)
    const [tabloidId, setTabloidId] = useState(null)

    const updateImage = (param = {}) => {

        const itens = Object.getOwnPropertyNames(param)

        if (itens.indexOf('image') !== -1)
            setImage(param.image)

        if (itens.indexOf('isUploadImage') !== -1)
            setIsUploadImage(param.isUploadImage)

        if (itens.indexOf('tabloidId') !== -1)
            setTabloidId(param.tabloidId)
    }


    return (
        <FormContext.Provider value={{ updateImage, image, tabloidId, isUploadImage }}>
            {children}
        </FormContext.Provider>
    )
}



const Form = () => {





    return (
        <FormProvider>
            <UploadFile useTabloidContext={FormContext} />
            <FormData useTabloidContext={FormContext} />
        </FormProvider>
    )
}

export default Form