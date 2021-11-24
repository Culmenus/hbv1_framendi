import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {  Box, Link, Toolbar, Typography } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { ThemeToggleButton } from './NavBar';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer({href = "Home", setDarkMode}: {href: string,setDarkMode: Function}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const toolBars = {
    "Home": {url: '/'},
    "My forums": {url: 'myforums'},
  }
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}
      sx = {{
        backgroundColor: 'purple',
      }}>
        <Toolbar sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent:'space-between',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              {href}
            </Typography>
          </div>
          <div>
            <ThemeToggleButton setDarkMode={setDarkMode}/>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}
        sx={{
          color: 'red',
          backgroundColor: 'blue',
        }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider/>
        <div
          style={{
            backgroundColor: 'purple',
            height: '100%',
            paddingTop: 15,
          }}
        >
          {Object.entries(toolBars).map(([name,url]) => {
              return (
              <>
                  <Link href={url.url}>
                    <Toolbar
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        backgroundColor: name === href ?'#6D0578' : 'purple',
                        cursor: 'pointer',
                        marginBottom: 1,
                        marginTop: 1,
                      }}
                    >
                      <Typography
                        sx= {{
                          fontWeight: 'bold',
                          color: 'white',
                          textDecoration: 'none',
                        }}
                      >
                        <Box 
                        display='flex'
                        flexDirection='row'
                        >
                        {name === 'Home' ? 
                          <HomeIcon/> : null}
                        {name === 'My forums' ?
                        <BookmarkIcon /> : null}
                        { open ? name : null}
                        </Box>
                      </Typography>
                    </Toolbar>
                  </Link>
              </>
              )
          })}
        </div>
      </Drawer>
    </Box>
  );
}