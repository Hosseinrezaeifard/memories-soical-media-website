import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import decode from 'jwt-decode';

import memoriesLogo from '../../images/memories-Logo.png';
import memoriesText from '../../images/memories-Text.png';
import useStyles from './Styles'
import { LOGOUT } from '../../constants/actionTypes'
const Navbar = () => {


    const classes = useStyles()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const disptach = useDispatch()
    const history = useHistory()
    const location = useLocation()


    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);


    const logout = () => {
        disptach({ type: LOGOUT })
        history.push('/')
        setUser(null)
    }
    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <Link to='/' className={classes.brandContainer}>
                <img src={memoriesText} height='45px' alt='icon' />
                <img className={classes.image} src={memoriesLogo} alt='logo' height='40px'></img>
            </Link>
            <Toolbar className={classes.toolbar}>
                {
                    user ?
                        (
                            <div className={classes.profile}>
                                <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                                <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                                <Button variant='contained' className={classes.logout} color='secondary' onClick={logout}>Logout</Button>
                            </div>
                        )
                        :
                        (
                            <Button component={Link} to="/auth" variant="contained" color="primary">
                                Sign In
                            </Button>
                        )
                }
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
