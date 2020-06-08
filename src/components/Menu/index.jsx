import React, {Fragment} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import {Link, Route} from 'react-router-dom'

import {
    AddPhotoAlternate
} from '@material-ui/icons'

const MenuListItens = (props) => {
    
    return (
        <Fragment>
            <ListItem button component={Link} to="/app/produto">
                <ListItemIcon>
                    <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Produtos" />
            </ListItem>
            <ListItem button component={Link} to="/app/tabloide">
                <ListItemIcon>
                    <AddPhotoAlternate />
                </ListItemIcon>
                <ListItemText primary="Tabloides" />
            </ListItem>
            <ListItem button component={Link} to="/app/site">
                <ListItemIcon>
                    <HomeOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="ir para o site" />
            </ListItem>
        </Fragment>
    )
}

export default MenuListItens