import { Fragment, useContext } from "react";
import axios from "axios";
import { FolderMinusIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import { ShowNoteContext } from "../Providers/ShowNoteProvider";

/**
 * リスト作成
 */
export const NoteListItems = (props) => {  
  
  const { setNote } = useContext(ShowNoteContext);
  
  const { notesData, listStyle } = props;
  // Icon Style  
  const iconStyle = {
    "width": "20px",
    "height": "20px",        
  };  
  // データが取得できない場合  
  if (!notesData) {   
    // 空のリストを返す
    return (
      <li></li>
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
    const { title, content, folderId } = resNote.data;    
    // 現在選択されたノート
    setNote({ noteId, title, body: content, folderId });        
  };
  /**
   * Create NoteList
   */
  // updatedAt でソート  
  const sortNotesWithoutFolder = notesData["notesWithoutFolder"].sort((a, b) => {
    return (a.updatedAt < b.updatedAt) ? -1 : 1
  });  
  // Without Folder       
  const notesWithoutFolder = sortNotesWithoutFolder.map(({id, title}) => {
    return (
      <Fragment key={id}>        
        <li id={id} key={id} onClick={onClickTitle}>                  
          <DocumentTextIcon style={iconStyle} key={id} />
          {title}
        </li>      
      </Fragment>
    );
  });  
  // With Folder  
  const folders = notesData["folders"].map(({id, name, notes}) => {
    return (
      <Fragment key={id}>        
        <li id={id} key={id} >                  
          <FolderMinusIcon style={iconStyle} key={id} />
          {name}
          {
            notes.map(({id, title}) => {            
              return (
                <ul style={listStyle} key={id}>                  
                  <li id={id} key={id} onClick={onClickTitle}>                                      
                    <DocumentTextIcon style={iconStyle} key={id} />
                    {title}
                  </li>
                </ul>
              );              
            }) 
          }          
        </li>
      </Fragment>
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
