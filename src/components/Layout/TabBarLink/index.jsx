import Reac, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import {
    Tab
} from '@material-ui/core'


const a11yProps = (idx, id, ariaControl) => {

    return {
        id: `${id}-${index}`,
        'aria-controls': `${ariaControl}-${index}`,
    }
}


const LinkTab = (props) => {
    const {links, style, ...outher } = props

    //links = href, label

    return (
        <Fragment>
            {
                links.map(link =>
                    <Tab
                        component="a"
                        style={{ margin: 'auto', justifyContent: 'center' }}
                        onClick={(event) => {
                            event.preventDefault()
                        }}
                        {...outhers}
                    />
                )
            }
        </Fragment>
    )
}


Link.propTypes = {
    links: PropTypes.array.isRequired
}

