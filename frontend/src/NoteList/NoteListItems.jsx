import { useContext } from "react";
import { ShowNoteContext } from "../Providers/ShowNoteProvider";
import axios from "axios";
/**
 * リスト作成
 */
export const NoteListItems = (props) => {  

  const { note, setNote } = useContext(ShowNoteContext);
  // From NoteList
  const notesData = props.notesData;  
  // 空のリストを返す
  if (!notesData) {
    return (
      <ul></ul>
    );
  };   
  /**
   * onClick時にAPI呼び出し
   */
  const onClickTitle = (element) => {    
    // ノートID取得    
    const noteId = element.target.id;
    // APIから詳細を取得    
    getNoteContents(noteId);    
  };   
  /**
   * noteId をキーにAPIから値取得
   */  
  const getNoteContents = (noteId) => {
    // GET       
    (async () => {
      const resNote = await axios.get(`/notes/${noteId}`);
      // タイトル, 内容 をセット
      const { title, content } = resNote.data;
      // update useContext
      const data = { ...note, noteId, title, body: content };
      setNote(data);      
    })();
  };
  /**
   * Create NoteList
   */
  // Without Folder    
  const notesWithoutFolder = notesData["notesWithoutFolder"].map(({id, title}) => {
    return (
      <li id={id} key={id} onClick={onClickTitle}>{title}</li>
    );
  });  
  // With Folder
  const folders = notesData["folders"].map(({id, name, notes}) => {
    return (
      <li key={id} id={id}>
        {name}
        {
          notes.map(({id, title}) => {            
            return (
              <ul>
                <li id={id} key={id} onClick={onClickTitle}>{title}</li>
              </ul>
            );              
          }) 
        }          
      </li>
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
