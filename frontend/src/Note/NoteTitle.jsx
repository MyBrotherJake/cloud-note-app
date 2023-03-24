import { TextField } from '@mui/material';
import { Box } from '@mui/material';
import styled from "styled-components";
import { SetContent, UpdateNote } from "./SetNote";
/**
 * ノートのタイトル
 */
export const NoteTitle = () => {
  // タイトルの取得    
  const { notesList, note, data, onChangeContent, isChange, setIsChange } = SetContent("title");
  
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
