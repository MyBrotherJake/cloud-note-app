import { XCircleIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import axios from "axios";
import { ShowNoteContext } from "../Providers/ShowNoteProvider";

export const DeleteFolderButton = (props) => {

  const { notesList, setNotesList, folders, setFolders } = useContext(ShowNoteContext);
  const { folderId, iconStyle } = props;
 
  
  /**
   * Delete処理
   */
  const onClickDelete = async () => {
    if (window.confirm("フォルダを削除します。よろしいですか？") === true) {
      const resData = await axios.delete(`/folders/${folderId}`);
      deleteFolder(folderId);
      return resData;
    };
    return;    
  };

  const deleteFolder = (id) => {
    const index = folders.findIndex(({folderId}) => folderId === id);            
     // 指定した要素を削除        
    if (delete folders[index] === true) {      
      // state更新用に新しい配列を作成
      const newFoldersList = folders.filter((element) => element);
      // フォルダ削除後、フォルダ内に合ったノートのフォルダIDを消す
      notesList.forEach(({noteId, folderId}) => {
        if (folderId === id && noteId !== "") {
          const noteSubId = noteId
          const noteIndex = notesList.findIndex(({noteId}) => noteId === noteSubId);
          notesList[noteIndex]["folderId"] = null;
        }
      });
      const listIndex = notesList.findIndex(({folderId}) => folderId === id);
      delete notesList[listIndex];
      const newNotesList = notesList.filter((element) => element);             
      // State更新
      setFolders(newFoldersList);           
      setNotesList(newNotesList);           
    };
  };  

  return (    
    < XCircleIcon onClick={onClickDelete} style={iconStyle}  />
  );
}