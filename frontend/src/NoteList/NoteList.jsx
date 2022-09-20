import { useState, useEffect } from "react";
import axios from "axios";
import { NoteListItems } from "./NoteListItems";
/**
 * ノート一覧の表示
 */
export const NoteList = () => {  
  
  const [ notes, setNotes ] = useState("");  
  // 再描画の制御に useEffectを使う
  useEffect(() => {    
    // ノート一覧APIにアクセス    
    (async () => {
      const resNotes = await axios.get("/notes");
      setNotes(resNotes.data);      
    })();
  },[]);    
  
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