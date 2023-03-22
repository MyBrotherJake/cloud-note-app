import { useContext } from "react";
import { UpdateNote } from "./UpdateNote";
import { ShowNoteContext } from "../Providers/ShowNoteProvider";
import { FormControl, InputLabel, MenuItem, Select, Box } from '@mui/material';

/**
 * フォルダ移動用プルダウン
 */
export const SelectFolder = () => {
  /**
   * Folders State
   */
  const { folders, note, notesList, setNotesList } = useContext(ShowNoteContext);

  /**
   * onChange Event  
   */
  const onSelect = async (element) => {
    // Get FolderID
    const folderId = element.target.value;
    // Call API
    await updateFolder(folderId);
  };
  /**
   * PATCH   
   */
  const updateFolder = async (folderId) => {
    // notesList から Index 取得
    const index = notesList.findIndex(({noteId}) => noteId === note["noteId"]);
    // フォルダIDをセット
    if (folderId) {
      notesList[index]["folderId"] = folderId;        
      note["folderId"] = folderId;        
    } else {
      notesList[index]["folderId"] = "";
      note["folderId"] = "";
    }
    
    
    // Update
    const resData = UpdateNote(notesList, note);     
    // State更新用配列    
    const newNotesList = notesList.slice();
    setNotesList(newNotesList);     
    return resData;
  };
  /**
   * Folder List
   */  
  const foldersList = folders.map(({folderId, folderName}) => {    
    return (
      <MenuItem value={folderId} key={folderId}>{folderName}</MenuItem>
    );
  }); 
  
  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="folder-select">フォルダ</InputLabel>
        <Select
          labelId="folder-label"
          id="folder-select"
          onChange={onSelect}
          defaultValue={note["folderId"]}
          key={note["folderId"]}
          label="フォルダ"
          displayEmpty>
          <MenuItem value="">フォルダ未選択</MenuItem>
          { foldersList }
        </Select>
      </FormControl>
    </Box>
  );  
}