import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const drawerWidth = 100;

export default function Sidebar() {
  return (
    <Box sx={{ display: 'flex' ,display:{ xs: 'none', md: 'flex' }, mr: 1  }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderTopRightRadius: '60px',
            borderBottomRightRadius: '60px',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box
          component="img"
          sx={{
            width: 45,
            height: 45,
            mx: 'auto',
            my: 4,
          }}
          src="https://firebasestorage.googleapis.com/v0/b/frontend-project-user-database.appspot.com/o/logoics.png?alt=media&token=679258e3-669c-47bd-b53c-8cb9be68612e"
          alt="React Image"
        />
        <Divider />
        <List>
         <MailIcon />
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
}
