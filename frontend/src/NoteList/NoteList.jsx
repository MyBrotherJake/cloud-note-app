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
    axios.get("/notes").then(res => {            
      // 取得した値でステートを更新
      setNotes(res.data);      
    });            
  },[]);  
  
  return (
    <>
      <ul>
        <NoteListItems notesData={notes} />
      </ul>
    </>
  );     
};