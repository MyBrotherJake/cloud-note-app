import { Fragment, useContext, useState } from "react";
import axios from "axios";
import { FolderMinusIcon, FolderPlusIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import { ShowNoteContext } from "../Providers/ShowNoteProvider";

/**
 * リスト作成
 */
export const NoteListItems = (props) => {  
  
  const { setNote } = useContext(ShowNoteContext);
  // フォルダ開閉の状態を取得する  
  const [ isOpen, setIsOpen ] = useState(false);  
  const [ folderId, setFolderId ] = useState();
  /*
  TODO 複数フォルダの状態を管理
  const [ folderOpen, setFolderOpen ] = useState({
    folderId: "",
    isOpen: false    
  });
  */

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
  const toggleEvent = (element, folderId) => {           
    // 対象 summary 取得
    const summaryElement = element.target;
    // 親要素 details を取得
    const detailsElement = summaryElement.parentElement;
    // フォルダの状態(開閉) を取得
    detailsElement.addEventListener("toggle", (event) => {
      if (detailsElement.open) {        
        setIsOpen(false);                
      } else {        
        setIsOpen(true);                
      }
    });
    setFolderId(folderId);        
  };
  /**
   * 重複チェック
   */
  /*
  const pushCheck = (id) => {
    const index = folderOpen.findIndex(({folderId}) => folderId === id);
    // ノート新規作成時に重複しないようにチェック
    if (index === -1) {
      return true;      
    }             
    return false;       
  }
  */
  
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
    // フォルダアイコンを変更
    // TODO 複数フォルダの開閉の状態を条件に設定したい
    const FolderIcon = isOpen && folderId === id ? <FolderPlusIcon style={iconStyle} key={id} id={id} /> : <FolderMinusIcon style={iconStyle} key={id} id={id} />;    
    //const FolderIcon = true ? <FolderPlusIcon style={iconStyle} key={id} id={id} /> : <FolderMinusIcon style={iconStyle} key={id} id={id} />;    
    
    return (
      <Fragment key={id}>            
        <li id={id} key={id} onClick={(element) => toggleEvent(element, id)} >                            
          <details open>
            <summary style={summaryStyle}>                        
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
