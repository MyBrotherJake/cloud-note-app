import { NoteTitle } from "./NoteTitle";
import { NoteBody } from "./NoteBody";
import { DeleteNoteButton } from "./DeleteNoteButton";
import { SelectFolder } from "./SelectFolder";
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Box, InputLabel } from '@mui/material';

export const Note = () => {
 
  return (      
    <Grid container>
      <Grid xs={6}>
        <Box sx={{ minWidth: 200, width: 'fit-content' }}>
          <SelectFolder />
        </Box>
      </Grid>
      <Grid xs={6} sx={{ 
        display: 'flex',
        justifyContent: 'flex-end', 
        alignItems: 'center' 
      }}>
        <Box>
          <DeleteNoteButton />
        </Box>
      </Grid>
      <Grid xs={12}>
        <Box sx={{ marginTop: 5 }}>
          <NoteTitle />
        </Box>
      </Grid>
      <Grid xs={12}>
        <Box>
          <NoteBody />
        </Box>
      </Grid>
    </Grid>
  );  
};
