import { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthService from '../../auth/services/auth.service';
import { FaUser } from 'react-icons/fa'

export default function MenuListComposition(setAdmin) {
    const [open, setOpen] = useState(false);
    const [login, setLogin] = useState(false);
    const anchorRef = useRef(null);
    const navigate = useNavigate()
    const location = useLocation();


    const handleLogout = (event) => {
        AuthService.logout()
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        
        localStorage.removeItem("token")
        navigate('/')
        setLogin(false);
        setOpen(false);
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setLogin(true)
        } else {
            setLogin(false)
            setOpen(false)
        }
    }, [location]);

    const logout = () => {
        if (login) {
            return (
                <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                >
                    <MenuItem onClick={handleLogout}>Déconnexion</MenuItem>
                </MenuList>
            )
        } else {
            return (
                <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                >
                    <Link to="/login">
                        <MenuItem onClick={handleClose}>Login</MenuItem>
                    </Link>
                    <Link to="/register">
                        <MenuItem onClick={handleClose}>Register</MenuItem>
                    </Link>
                </MenuList>
            )
        }
    }

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = useRef(open);
    
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <>
            <Stack direction="row" spacing={2}>
                <div>
                    <Button
                        ref={anchorRef}
                        id="composition-button"
                        aria-controls={open ? 'composition-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                    >
                        <FaUser className="user icon white" />
                    </Button>
                    <Popper
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        placement="bottom-start"
                        transition
                        disablePortal
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin:
                                        placement === 'bottom-start' ? 'left top' : 'left bottom',
                                }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>

                                        {login ? (
                                            <MenuList
                                                autoFocusItem={open}
                                                id="composition-menu"
                                                aria-labelledby="composition-button"
                                                onKeyDown={handleListKeyDown}
                                            >
                                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                            </MenuList>
                                        ) : (
                                            <MenuList
                                                autoFocusItem={open}
                                                id="composition-menu"
                                                aria-labelledby="composition-button"
                                                onKeyDown={handleListKeyDown}
                                            >
                                                <Link to="/login">
                                                    <MenuItem onClick={handleClose}>Login</MenuItem>
                                                </Link>
                                                <Link to="/register">
                                                    <MenuItem onClick={handleClose}>Register</MenuItem>
                                                </Link>
                                            </MenuList>
                                        )}

                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </div>
            </Stack>
        </>

    );
}
