import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import {Link, useLocation} from 'react-router-dom'
import ScaleIcon from '@mui/icons-material/Scale';

import AddIcon from '@mui/icons-material/Add';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PetsIcon from '@mui/icons-material/Pets';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';


export default function Navbar(props) {
  const {drawerWidth, content} = props
  const location = useLocation()
  const path = location.pathname

  const [open, setOpen] = React.useState(false); 
  const changeOpenStatus = () => { 
    setOpen(!open)
  }

  const myDrawer = ( 
    <div>
      <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>

            <ListItem disablePadding>
              <ListItemButton component={Link} to="/" selected={"/" === path}>
                <ListItemIcon>
                  <HomeIcon/>  
                </ListItemIcon>
                <ListItemText primary={"Home"} />
              </ListItemButton>
            </ListItem>

          </List>

          <Divider />

          <List>

            <ListItem disablePadding>
              <ListItemButton component={Link} to="/animals" selected={"/animals" === path}>
                <ListItemIcon>
                  <PetsIcon/>  
                </ListItemIcon>
                <ListItemText primary={"Animals"} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton component={Link} to="/types" selected={"/types" === path}>
                <ListItemIcon>
                  <FormatListBulletedIcon/>  
                </ListItemIcon>
                <ListItemText primary={"Animal Types"} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton component={Link} to="/breeds" selected={"/breeds" === path}>
                <ListItemIcon>
                  <FormatListNumberedIcon/>  
                </ListItemIcon>
                <ListItemText primary={"Breeds"} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton component={Link} to="/weightings" selected={"/weightings" === path}>
                <ListItemIcon>
                  <ScaleIcon/>  
                </ListItemIcon>
                <ListItemText primary={"Weightings"} />
              </ListItemButton>
            </ListItem>

          </List>

          <Divider />

          <List>

          <ListItem disablePadding>
              <ListItemButton component={Link} to="/create" selected={"/create" === path}>
                <ListItemIcon>
                  <AddIcon/>  
                </ListItemIcon>
                <ListItemText primary={"Create"} />
              </ListItemButton>
            </ListItem>

            {/* <ListItem disablePadding>
              <ListItemButton component={Link} to="/createtype" selected={"/createtype" === path}>
                <ListItemIcon>
                  <AddIcon/>  
                </ListItemIcon>
                <ListItemText primary={"Create Type"} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton component={Link} to="/createbreed" selected={"/createbreed" === path}>
                <ListItemIcon>
                  <AddIcon/>  
                </ListItemIcon>
                <ListItemText primary={"Create Breed"} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton component={Link} to="/createanimal" selected={"/createanimal" === path}>
                <ListItemIcon>
                  <AddIcon/>  
                </ListItemIcon>
                <ListItemText primary={"Create Animal"} />
              </ListItemButton>
            </ListItem> */}

          </List>
        </Box>
    </div>

  )

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton 
            color='inheret' 
            onClick={changeOpenStatus} 
            sx = {{mr:2, display:{sm:'none'}}}>
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Omas Integrated
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          display: {xs:"none", sm:"block"},
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        
        {myDrawer}
      </Drawer>

      <Drawer
        variant="temporary"
        open = {open}
        onClose={changeOpenStatus}
        sx={{
          display: {xs:"block", sm:"none"},
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        
        {myDrawer}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

          {content}

      </Box>
    </Box>
  );
}

