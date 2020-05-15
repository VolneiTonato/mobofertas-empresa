import React from 'react'
import PropTypes from 'prop-types'
import {
    Typography
} from '@material-ui/core'


//id={`simple-tabpanel-${index}`}
//aria-labelledby={`simple-tab-${index}`}

const TabPanel = (props) => {
    const { children, value, index, id, ariaLabelBy, ...other } = props

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`${id}-${index}`}
            aria-labelledby={`${ariaLabelBy}-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
    id: PropTypes.string.isRequired,
    ariaLabelBy: PropTypes.string.isRequired

};




const IndexPropsPanel = ({ id, index, ariaControl }) => {
    return {
        id: `${id}-${index}`,
        'aria-controls': `${ariaControl}-${index}`,
    }
}

<LinkTab
    label="Arquivo via Planilha"
    href={`${url}/tab-upload-planilha`}
    {...a11yProps(0)} />

const list = [
    {
        href: '',
        label: '',
        style: '',
        onclick: cb

    }
]

const LinkTabPanel = (props) => {
    const {links} = props
    return (
        <Fragment>

            {links.map(({label, href, style, cb}, index) => 

                <Tab
                    label={label}
                    href={href}
                    component="a"
                    style={style ? style : { margin: 'auto', justifyContent: 'center' }}
                    onClick={(event) => {
                        event.preventDefault()
                        if (cb)
                            cb()
                    }}
                    {...IndexPropsPanel({index, id, })}
                    {...props}
                />

            )}
        </Fragment>
    )
}

export { LinkTabPanel, TabPanel, IndexPropsPanel }
