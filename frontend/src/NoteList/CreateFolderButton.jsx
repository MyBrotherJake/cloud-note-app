import { FolderOpenIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import axios from "axios";
import { ShowNoteContext } from "../Providers/ShowNoteProvider";
import { Box } from '@mui/system';

export const CreateFolderButton = () => {

  const { folders, setFolders } = useContext(ShowNoteContext);  
  /**
   * FolderIcon onClick
   */
  const onClickCreateFolder = async () => {    
    // Post
    const resData = await axios.post('/folders', {name: "新規フォルダ"});
    // FolderId
    const folderId = resData.data['id'];
    // State 更新
    await createFolder(folderId);
  };
  /**
   * State 更新処理
   */
  const createFolder = async (folderId) => {   
    // 配列に追加
    folders.push({folderId: folderId, folderName: "新規フォルダ"});
    // 再描画用に新規配列
    const newFolders = folders.slice();
    setFolders(newFolders);        
  };

  return (
    <Box sx={{ width: 50 }}>
      <FolderOpenIcon onClick={onClickCreateFolder} cursor='pointer' />
    </Box>
  );
}

