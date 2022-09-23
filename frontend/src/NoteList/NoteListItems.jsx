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
  };  
  // データが取得できない場合
  if (!notesData) {   
    // 空のリストを返す
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
    // 空の配列を削除する    
    if (note[0].noteId === "") {
      note.shift();
    }
    // ステートを更新    
    const data = [{ noteId, title, body: content }, ...note];
    setNote(data);    
  };
  /**
   * Create NoteList
   */
  // Without Folder    
  const notesWithoutFolder = notesData["notesWithoutFolder"].map(({id, title}) => {
    return (
      <>        
        <li id={id} key={id} onClick={onClickTitle}>                  
          <DocumentTextIcon style={iconStyle} />
          {title}
        </li>      
      </>
    );
  });  
  // With Folder
  const folders = notesData["folders"].map(({id, name, notes}) => {
    return (
      <>        
        <li id={id} key={id} >                  
          <FolderMinusIcon style={iconStyle} />
          {name}
          {
            notes.map(({id, title}) => {            
              return (
                <ul style={listStyle}>                  
                  <li id={id} key={id} onClick={onClickTitle}>                                      
                    <DocumentTextIcon style={iconStyle} />
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
