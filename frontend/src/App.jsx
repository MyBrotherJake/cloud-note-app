import { Signin } from './Auth/Signin';
import { UserProfile } from './User/UserProfile';
import { Note } from "./Note/Note";
import { NoteList } from "./NoteList/NoteList";
import { useEffect, useState } from 'react';
import { AppBar, Box, CssBaseline, Drawer, Toolbar, Typography } from '@mui/material';

export const App = () => {
  const [user, setUser] = useState(null)
  const drawerWidth = 300

  useEffect(() => {
    const data = localStorage.getItem('user')
    if (data) setUser(JSON.parse(data))
  }, [])

  if (!user) {
    return (<Signin />)
  }

  console.log(JSON.stringify(user))

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
        <Toolbar>
          <Typography variant='h6' noWrap component='div'>
            CLOUD NOTE APP
          </Typography>
        </Toolbar>
      </AppBar>      
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          }
        }}
        variant="permanent"
        anchor="left">
        <div style={{ paddingLeft: '16px' }}>
          <div className="profile">
            <UserProfile user={user} />
          </div>
          <nav id="nav">
            <NoteList />
          </nav>
        </div>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        <Note />
      </Box>
    </Box>
  );
}

