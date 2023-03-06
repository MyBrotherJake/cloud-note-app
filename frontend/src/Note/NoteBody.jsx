import { Box, InputLabel } from '@mui/material';
import Editor from "rich-markdown-editor";
import { SetContent, UpdateNote } from "./SetNote";
/**
 * ノートの作成、編集
 */
export const NoteBody = () => {
  // 本文の取得
  
  const { notesList, note, data, onChangeContent, isChange, setIsChange } = SetContent("body");
  
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
