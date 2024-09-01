import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Menu,
    MenuItem,
    Hidden,
    IconButton,
} from '@mui/material';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const menuItems = [
        { label: 'Home', to: 'home' },
        { label: 'Features', to: 'features' },
        { label: 'ESG', to: 'esg' },
        { label: 'Testimonials', to: 'testimonials' },
    ];

    return (
        <AppBar position="fixed" sx={{ backgroundColor: '#5a287d' }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white', marginLeft:'24px' }}>
                    Investment Tracker
                </Typography>

                {/* Menu icon for smaller devices */}
                <Hidden lgUp>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleMenuOpen}
                        size="large"
                    >
                        <MenuIcon />
                    </IconButton>
                </Hidden>

                {/* Desktop: Group of buttons float left */}
                <Hidden mdDown>
                    {/* <Button color="inherit" component={RouterLink} to="/" sx={{ marginRight: 2, color:'white' }}>
                        Home
                    </Button> */}
                    {menuItems.map((item) => (
                        <Button color="inherit" key={item.label} sx={{ marginRight: 2 }}>
                            <ScrollLink to={item.to} smooth={true} duration={500} offset={-64} sx={{ color: 'white' }}>
                                {item.label}
                            </ScrollLink>
                        </Button>
                    ))}
                    <Button color="inherit" component={RouterLink} to="/signup" sx={{
                        color: 'black', marginRight: 2, backgroundColor: '#ddcceb', '&:hover': {
                            backgroundColor: 'white', color: 'black' // darker color on hover
                        }
                    }}>
                        Signup
                    </Button>
                    <Button color="inherit" component={RouterLink} to="/login" sx={{
                        color: 'black', backgroundColor: '#ddcceb', '&:hover': {
                            backgroundColor: 'white', color: 'black' // darker color on hover
                        },
                    }}>
                        Login
                    </Button>
                </Hidden>

                {/* Smaller devices: Dropdown menu */}
                <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    {menuItems.map((item) => (
                        <MenuItem key={item.label} onClick={handleMenuClose}>
                            <ScrollLink to={item.to} smooth={true} duration={500} offset={-64} sx={{ color: 'black' }}>
                                {item.label}
                            </ScrollLink>
                        </MenuItem>
                    ))}
                    <MenuItem component={RouterLink} to="/signup" onClick={handleMenuClose} sx={{ color: 'black' }}>
                        Signup
                    </MenuItem>
                    <MenuItem component={RouterLink} to="/login" onClick={handleMenuClose} sx={{ color: 'black' }}>
                        Login
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
