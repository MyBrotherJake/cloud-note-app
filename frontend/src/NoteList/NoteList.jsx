import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { NoteListItems } from "./NoteListItems";
import { ShowNoteContext } from "../Providers/ShowNoteProvider";

/**
 * ノート一覧の表示
 */
export const NoteList = () => {  
  
  //const { note, setNote } = useContext(ShowNoteContext);  
  //const { notesList, setNotesList } = useContext(ShowNoteContext);
  const [ notes, setNotes ] = useState("");  
  //const [ notes, setNotes ] = useState({});  
  // 再描画の制御に useEffectを使う
  // => タイトル変更時に再レンダリングしたいので、useEffectは使用しない
  /*
  useEffect(() => {    
    // ノート一覧APIにアクセス    
    (async () => {
      const resNotes = await axios.get("/notes");
      setNotes(resNotes.data);      
    })();
  },[]);      
 */
  (async () => {
    const resNotes = await axios.get("/notes");
    // TODO ここで配列を整理してState を更新する
    setNotes(resNotes.data);      
    //await setOrder(resNotes.data);
  })();
  /*
  const setOrder = async (notesData) => {
    await notesData["notesWithoutFolder"].forEach(({ id, title, content }) => {
      const data = [{ noteId: id, title, body: content }, ...notesList]; 
      setNotesList(data);     
    });
    await notesData["folders"].forEach(({notes}) => {
      notes.forEach(({ id, title, content }) => {
        const data = [{ noteId: id, title, body: content }, ...notesList];        
        setNotesList(data);
      });
    });    
  };
  */  
  const listStyle = {
    "listStyle": "none",    
  };

  return (
    <>
      <ul style={listStyle}>
        <NoteListItems notesData={notes} listStyle={listStyle} />
      </ul>
    </>
  );     
};