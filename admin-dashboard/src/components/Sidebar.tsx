import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

const Sidebar = () => {
  return (
    <Box sx={{ width: 250, backgroundColor: '#0073b1', color: 'white', p: 2, height: '100vh' }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
        Admin Panel
      </Typography>
      <Divider sx={{ backgroundColor: 'white', mb: 2 }} />
      <List>
        <ListItem button>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Manage Users" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Monitor Swaps" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Send Messages" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Reports" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;