import React, { useContext, useRef } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LanguageSelect from './LanguageSelect';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { extraNavItems, navItems } from '../constants/navitems';
import AuthContext from '../hooks/AuthContext';
import { ColorModeContext } from '../hooks/ThemeContext';
import { Avatar, Menu, MenuItem, Tooltip } from '@mui/material';
import useAuth from '../hooks/AuthContext';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;

export default function MaterialNavbar(props: Props) {
  const colorMode: any = React.useContext(ColorModeContext);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const items = navItems;
  const extraItems = extraNavItems;

  // Ref & Custom Hook
  const ref = useRef<HTMLDivElement>(null);

  // Next Router
  const router = useRouter();

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: `center` }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MVP
      </Typography>
      <Divider />
      <List>
        {[...items, ...extraItems].map((item: any, idx: any) => (
          <ListItem key={idx} disablePadding>
            <Link href={item.route} passHref>
              <ListItemButton sx={{ textAlign: `center` }}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const { loading, user, logout } = useAuth()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const PreferencesFn = () => {
    handleCloseUserMenu();
    router.push('/preferences/');
  };

  const LogoutFn = () => {
    handleCloseUserMenu();
    logout();
  };

  const LoginFn = () => {
    handleCloseUserMenu();
    router.push('/login');
  };

  const GoToHome = () => {
    router.push('/home');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 0, display: { md: `block` } }}
          >
            <MenuIcon />
          </IconButton>
          <Link href="/" passHref>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              MVP
            </Typography>
          </Link>

          <Box sx={{ display: { xs: `none`, md: `block` } }}>
            {[...items, ...extraItems].map((item: any, idx: any) => (
              <Link key={idx} href={item.route} passHref>
                <Button color="inherit">{item.label}</Button>
              </Link>
            ))}
          </Box>

          {/* <LanguageSelect /> */}

          <IconButton
            sx={{ ml: 1 }}
            onClick={colorMode.changeTheme}
            color="inherit"
          >
            {colorMode.mode === `dark` ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>

          {/* <Box sx={{ flexGrow: 0 }}>
            {user?.uid ? (
              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  size="small"
                  sx={{ ml: 0, mr: 0 }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32 }} alt="Remy Sharp" src={user?.photoURL || ''} />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  size="small"
                  sx={{ ml: 0, mr: 0 }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                </IconButton>
              </Tooltip>
            )}

            {user?.uid ? (
              <Menu
                sx={{ mt: `45px` }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: `top`,
                  horizontal: `right`,
                }}
                keepMounted
                transformOrigin={{
                  vertical: `top`,
                  horizontal: `right`,
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={GoToHome}>
                  <Typography textAlign="center">Home</Typography>
                </MenuItem>
                <MenuItem onClick={PreferencesFn}>
                  <Typography textAlign="center">Preferences</Typography>
                </MenuItem>
                <MenuItem onClick={LogoutFn}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            ) : (
              <Menu
                sx={{ mt: `45px` }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: `top`,
                  horizontal: `right`,
                }}
                keepMounted
                transformOrigin={{
                  vertical: `top`,
                  horizontal: `right`,
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={GoToHome}>
                  <Typography textAlign="center">Home</Typography>
                </MenuItem>
                <MenuItem onClick={LoginFn}>
                  <Typography textAlign="center">Login</Typography>
                </MenuItem>
              </Menu>
            )}
          </Box> */}
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: `block`, },
            '& .MuiDrawer-paper': {
              boxSizing: `border-box`,
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
