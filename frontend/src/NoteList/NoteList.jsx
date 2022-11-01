import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { NoteListItems } from "./NoteListItems";
import { ShowNoteContext } from "../Providers/ShowNoteProvider";

/**
 * ノート一覧の表示
 */
export const NoteList = () => {  
  
  const { notesList, setNotesList } = useContext(ShowNoteContext);    
  const [ notes, setNotes ] = useState();    
  // 再描画の制御  
  useEffect(() => {
    (async () => {
      const resNotes = await axios.get("/notes");
      // APIから取得したデータをそのまま props として渡す
      const notesData = resNotes.data;
      setNotes(notesData);          
      // 配列を整理して notesList を更新する
      // フォルダなし    
      notesData["notesWithoutFolder"].forEach(({ id, title, content }) => {            
        // 配列に追加
        notesList.push({ noteId: id, title, body: content });      
      });
      // フォルダあり
      notesData["folders"].forEach(({notes}) => {      
        notes.forEach(({ id, title, content }) => {        
          // 配列に追加
          notesList.push({ noteId: id, title, body: content });        
        });
      }); 
      // 空のデータは削除
      if (notesList[0]["noteId"] === "") {
        notesList.shift();
      }      
      // State更新
      setNotesList(notesList);                   
    })();
  }, [notesList, setNotesList]);         
  /**
   * list-style: none;
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