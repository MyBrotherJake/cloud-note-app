import { useContext } from "react";
import Editor from "rich-markdown-editor";
import { ShowNoteContext } from "../Providers/ShowNoteProvider";
import { SetContent } from "./SetNote";
import { UpdateNote } from "./UpdateNote";
import { Box, InputLabel } from '@mui/material';
/**
 * ノートの作成、編集
 */
export const NoteBody = () => {
  const { notesList, note } = useContext(ShowNoteContext);
  // タイトルの取得    
  const { noteId, data, onChangeContent, isChange, setIsChange } = SetContent("body");

  if (isChange) {    
    UpdateNote(notesList, note);    
    setIsChange(false);
  } 

  return (
    <Box sx={{ marginTop: 5 }}>
      <InputLabel>本文</InputLabel>
      <Box sx={{ marginTop: 2 }}>
        <Editor
          key={note["noteId"]}         
          defaultValue={data}
          onChange={onChangeContent}
        />
      </Box>
    </Box>        
  ); 
};
