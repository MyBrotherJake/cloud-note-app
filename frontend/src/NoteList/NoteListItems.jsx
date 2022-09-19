import { useContext } from "react";
import axios from "axios";
import { FolderMinusIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import { ShowNoteContext } from "../Providers/ShowNoteProvider";

/**
 * リスト作成
 */
export const NoteListItems = (props) => {  

  const { note, setNote } = useContext(ShowNoteContext);
  
  const {notesData, listStyle} = props;
  // Icon Style  
  const iconStyle = {
    "width": "20px",
    "height": "20px",    
    "float": "left",           
  };  
  // 空のリストを返す
  if (!notesData) {
    return (
      <ul></ul>
    );
  };   
  /**
   * onClick時にAPI呼び出し
   */
  const onClickTitle = async (element) => {    
    // ノートID取得    
    const noteId = element.target.id;
    // APIから詳細を取得    
    await getNoteContents(noteId);    
  };   
  /**
   * noteId をキーにAPIから値取得
   */  
  const getNoteContents = async (noteId) => {
    // GET
    const resNote = await axios.get(`/notes/${noteId}`);
    // タイトル, 内容 をセット
    const { title, content } = resNote.data;
    // update useContext
    const data = { ...note, noteId, title, body: content };
    setNote(data);
  };
  /**
   * Create NoteList
   */
  // Without Folder    
  const notesWithoutFolder = notesData["notesWithoutFolder"].map(({id, title}) => {
    return (
      <>        
        <DocumentTextIcon style={iconStyle} />
        <li id={id} key={id} onClick={onClickTitle}>                  
          {title}
        </li>      
      </>
    );
  });  
  // With Folder
  const folders = notesData["folders"].map(({id, name, notes}) => {
    return (
      <>        
        <li><FolderMinusIcon style={iconStyle} /></li>
        <li id={id} key={id} >                  
          {name}
          {
            notes.map(({id, title}) => {            
              return (
                <ul style={listStyle}>
                  <DocumentTextIcon style={iconStyle} />
                  <li id={id} key={id} onClick={onClickTitle}>                                      
                    {title}
                  </li>
                </ul>
              );              
            }) 
          }          
        </li>
      </>
    );
  });
  // Join With Folder + Without Folder
  const items = folders.concat(notesWithoutFolder);

  return (
    <>
      {items}
    </>    
  );
}
