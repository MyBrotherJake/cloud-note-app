import {useState, useEffect} from "react";
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
  
  return (
    <>
      <ul>
        <NoteListItems notesData={notes} />
      </ul>
    </>
  );     
};