import { FolderOpenIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import axios from "axios";
import { ShowNoteContext } from "../Providers/ShowNoteProvider";
import { AuthContext } from "../Providers/AuthProvider";

export const CreateFolderButton = () => {

  const { folders, setFolders } = useContext(ShowNoteContext);
  const { user } = useContext(AuthContext);
  /**
   * FolderIcon onClick
   */
  const onClickCreateFolder = async () => {
    // UserID    
    const userId = user["id"];
    // 認証が現在通らないので、あらかじめ作ったダミーデータを利用する
    //const userId = "8a940d80-2d62-4e59-885e-5b67df590f8a";
    // Post
    const resData = await axios.post('/folders', {userId: userId, name: "新規フォルダ"});
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
    <FolderOpenIcon onClick={onClickCreateFolder} />
  );
}
