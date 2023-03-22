import { Signin } from './Auth/Signin';
import { UserProfile } from './User/UserProfile';
import { Note } from "./Note/Note";
import { NoteList } from "./NoteList/NoteList";
import { useEffect, useState } from 'react';
import { Box, CssBaseline, Drawer, Typography } from '@mui/material';

export const App = () => {
  const [user, setUser] = useState(null)
  const drawerWidth = 320

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
        <Box>
          <Typography align='center' variant='h1'>CLOUD NOTE APP</Typography>
        </Box>
        <Box sx={{ paddingLeft: 2 }}>
          <UserProfile user={user} />
        </Box>
        <Box id="nav">
          <NoteList />
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        <Note />
      </Box>
    </Box>
  );
}

