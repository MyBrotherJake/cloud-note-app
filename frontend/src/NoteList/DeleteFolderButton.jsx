import { XCircleIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import axios from "axios";
import { ShowNoteContext } from "../Providers/ShowNoteProvider";

export const DeleteFolderButton = (props) => {

  const { folders, setFolders } = useContext(ShowNoteContext);
  const { folderId, iconStyle } = props;
 
  
  /**
   * Delete処理
   */
  const onClickDelete = async () => {
    if (window.confirm("フォルダを削除します。よろしいですか？") === true) {
      const resData = await axios.delete(`/folders/${folderId}`);
      await deleteFolder(folderId);
      return resData;
    };
    return;    
  };

  const deleteFolder = async (id) => {
    const index = folders.findIndex(({folderId}) => folderId === id);
     // 指定した要素を削除        
     if (delete folders[index] === true) {      
      // state更新用に新しい配列を作成
      const newFoldersList = folders.filter((element) => element);        
      // State更新
      await setFolders(newFoldersList);           
    };
  };  

  return (    
    < XCircleIcon onClick={onClickDelete} style={iconStyle}  />
  );
}