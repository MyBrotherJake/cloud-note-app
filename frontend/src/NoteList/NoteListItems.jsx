import { Fragment, useContext, useState } from "react";
import axios from "axios";
import { FolderMinusIcon, FolderPlusIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import { ShowNoteContext } from "../Providers/ShowNoteProvider";

/**
 * リスト作成
 */
export const NoteListItems = (props) => {  
  
  const { setNote } = useContext(ShowNoteContext);
  // TODO 対象となるFolderId を持たせたい
  const [ isOpen, setIsOpen ] = useState(false);  

  const { notesData, listStyle } = props;
  // Icon Style  
  const iconStyle = {
    "width": "20px",
    "height": "20px",        
  };  
  // Summary Style
  const summaryStyle = {
    "display": "block",
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
  const onClickTitle = async (noteId) => {                
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
   * Toggle Event
   */
  const toggleEvent = (element) => {
    // 対象 summary 取得
    const summaryElement = element.target;
    // 親要素 details を取得
    const detailsElement = summaryElement.parentElement;
    // フォルダの状態(開閉) を取得
    detailsElement.addEventListener("toggle", (event) => {
      if (detailsElement.open) {
        // set Close
        setIsOpen(false);        
      } else {
        // set Open
        setIsOpen(true);        
      }
    });     
  }
  /**
   * Create NoteList
   */
  // Without Folder       
  // 更新日でソート後、リストを作成
  const notesWithoutFolder = notesData["notesWithoutFolder"].sort((a, b) => {
    return (a.updatedAt < b.updatedAt) ? -1 : 1
  }).map(({id, title}) => {
    return (
      <Fragment key={id}>        
        <li id={id} key={id} onClick={ () => onClickTitle(id) }>                  
          <DocumentTextIcon style={iconStyle} key={id} />
          {title}
        </li>      
      </Fragment>
    );
  });  
  // With Folder    
  // フォルダは作成日、ノートは更新日でそれぞれソート
  const folders = notesData["folders"].sort((a, b) => {
    return (a.createdAt < b.createdAt) ? -1 : 1
  }).map(({id, name, notes}) => {

    const FolderIcon = isOpen ? <FolderPlusIcon style={iconStyle} /> : <FolderMinusIcon style={iconStyle} />;

    return (
      <Fragment key={id}>            
        <li id={id} key={id} >                            
          <details open>
            <summary style={summaryStyle} onClick={toggleEvent}>
              { FolderIcon }              
              {name}
            </summary>
            {
              notes.sort((a, b) => {
                return (a.updatedAt < b.updatedAt) ? -1 : 1
              }).map(({id, title}) => {
                return (
                  <ul style={listStyle} key={id}>                  
                    <li id={id} key={id} onClick={ () => onClickTitle(id) }>                                      
                      <DocumentTextIcon style={iconStyle} key={id} />
                      {title}
                    </li>
                  </ul>
                );              
              })            
            }
          </details>             
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
