import { useContext } from "react";
import { TextField } from '@mui/material';
import { Box } from '@mui/material';
import { ShowNoteContext } from "../Providers/ShowNoteProvider";
import { SetContent } from "./SetNote";
import { UpdateNote } from "./UpdateNote";
/**
 * ノートのタイトル
 */
export const NoteTitle = () => {
  const { notesList, note } = useContext(ShowNoteContext);  
  // タイトルの取得    
  const { noteId, data, onChangeContent, isChange, setIsChange } = SetContent("title");
  
  if (isChange) {    
    UpdateNote(notesList, note);    
    setIsChange(false);
  }

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off">
      <TextField 
        fullWidth
        label="タイトル"
        onChange={onChangeContent}
        value={data}
        variant="standard" />
    </Box>
  );
};
