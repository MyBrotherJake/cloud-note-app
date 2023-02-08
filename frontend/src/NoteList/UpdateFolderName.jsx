import { useContext } from "react";
import axios from "axios";
import { ShowNoteContext } from "../Providers/ShowNoteProvider";
import  styled  from "styled-components";
/**
 * @returns TextBox
 */
export const FolderName = (props) => {

  const { folders, setFolders } = useContext(ShowNoteContext);
  const { folderId, folderName } = props;
   
  /**
   * axios
   */
  const onChangeText = async (element) => {
    const resData = await axios.patch(`/folders/${folderId}`, {name: element.target.value});    
    await updateFolder(folderId, resData.data.name);    
  };
  /**
   * Update state
   */
  const updateFolder = async (id, name) => {
    // GET index
    const index = folders.findIndex(({folderId}) => folderId === id);
    // Update
    folders[index]["folderId"] = id;
    folders[index]["folderName"] = name;
    // State更新用
    const newFolders = folders.slice();
    await setFolders(newFolders);         
  }

  return (
    <InputArea onChange={onChangeText} defaultValue={folderName} />
  );
};

const InputArea = styled.input`
  border: none;
`;