import { useContext } from "react";
import { UpdateNote } from "./UpdateNote";
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
    const resData = UpdateNote(notesList, setNotesList, note);     
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
    <select name="select-folder" style={selectStyle} onChange={onSelect} defaultValue={note["folderId"]} key={note["folderId"]}>
      <option value="">--フォルダ未選択--</option>
      {foldersList}
    </select>
  );
  
}