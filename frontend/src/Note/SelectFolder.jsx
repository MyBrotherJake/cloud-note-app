import { useContext } from "react";
import { UpdateNote } from "./SetNote";
import { ShowNoteContext } from "../Providers/ShowNoteProvider";
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
    await updateNotes(folderId, note);
  }
  /**
   * PATCH
   */
  const updateNotes = async(folderId, note) => {
    // notesList から Index 取得
    const index = notesList.findIndex(({noteId}) => noteId === note["noteId"]);
    // フォルダIDをセット
    notesList[index]["folderId"] = folderId;    
    // State更新用配列    
    const newNotesList = notesList.slice();
    setNotesList(newNotesList);        
    // Update
    const resData = await UpdateNote(notesList, note);    
    return resData;
  }
  /**
   * Folder List
   */  
  const foldersList = folders.map(({folderId, folderName}) => {
    return (
      <option value={folderId} key={folderId}>{folderName}</option>
    );
  }); 
  /**
   * Select Style
   */
  const selectStyle = {
    "margin": "auto"
  };  
 
  return (
    <select name="select-folder" style={selectStyle} onChange={onSelect}>
      <option value="">--フォルダ未選択--</option>
      {foldersList}
    </select>
  );
  
}