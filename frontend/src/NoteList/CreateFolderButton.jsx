import { FolderOpenIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import axios from "axios";
import { ShowNoteContext } from "../Providers/ShowNoteProvider";
import { Box } from '@mui/system';

export const CreateFolderButton = () => {

  const { folders, setFolders, notesList, setNotesList } = useContext(ShowNoteContext);  
  /**
   * FolderIcon onClick
   */
  const onClickCreateFolder = async () => {    
    // Post
    const resData = await axios.post('/folders', {name: "新規フォルダ"});
    // State 更新
    createFolder(resData.data);       
  };
  /**
   * State 更新処理
   */
  const createFolder = (data) => {   
    // 配列に追加
    folders.push({
      folderId: data["id"], 
      folderName: data["name"], 
      isOpen: true
    });
    // NoteList
    notesList.push({ 
      noteId: "", 
      title: "", 
      body: "", 
      folderId: data["id"], 
      updatedAt: data["updatedAt"], 
      createdAt: data["createdAt"] 
    });
    // 再描画用
    const newList = notesList.slice();
    setFolders(folders);
    setNotesList(newList);     
  };

  return (
    <Box sx={{ width: 50 }}>
      <FolderOpenIcon onClick={onClickCreateFolder} cursor='pointer' />
    </Box>
  );
}