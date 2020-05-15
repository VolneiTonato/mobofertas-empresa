import React, { memo, useRef, useEffect , useState} from 'react'

import {
    Paper, makeStyles, fade, TextField, InputAdornment, IconButton
} from '@material-ui/core'

import { SearchOutlined, CloseOutlined } from '@material-ui/icons'
import PropTypes from 'prop-types'

import {size} from 'lodash'

const useStyle = makeStyles((theme) => ({

    overrideInputText: {

        '& label.Mui-focused': {
            color: 'transparent',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'transparent',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'transparent',
            },
            '&:hover fieldset': {
                borderColor: 'transparent',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'transparent',
            },
        }

    },

    search: {

        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('xs')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },

    inputRoot: {
        color: 'inherit',
        width: '100%'

    },

}))


const SearchBar = ({ placeholder, handlerOnChangeQuery }) => {

    const classes = useStyle()


    return (
        <Paper variant="elevation" square elevation={3}>


            <div className={classes.search}>

                <TextField
                    fullWidth
                    type="search"
                    variant="outlined"
                    placeholder={placeholder}
                    margin="none"
                    rowsMax={30}
                    className={classes.overrideInputText}
                    classes={{
                        root: classes.inputRoot,
                    }}
                    onChange={handlerOnChangeQuery}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchOutlined />
                            </InputAdornment>
                        )
                    }}
                />

            </div>

        </Paper>
    )

}

SearchBar.prototype = {
    placeholder: PropTypes.string.isRequired,
    handlerOnChangeQuery: PropTypes.func.isRequired
}

export default memo(SearchBar)