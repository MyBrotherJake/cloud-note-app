import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { NoteListItems } from "./NoteListItems";
import { CreateNoteButton } from "./CreateNoteButton";
import { CreateFolderButton } from "./CreateFolderButton";
import { ShowNoteContext } from "../Providers/ShowNoteProvider";

/**
 * ノート一覧の表示
 */
export const NoteList = () => {  
  
  const { notesList, setNotesList, folders, setFolders } = useContext(ShowNoteContext);    
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
        // 配列のインデックスを取得
        const noteIndex = notesList.findIndex(({noteId}) => noteId === id);
        // ノート新規作成時に重複しないようにチェック
        if (noteIndex === -1) {
          // 配列に追加
          notesList.push({ noteId: id, title, body: content });      
        }        
      });
      // フォルダあり
      notesData["folders"].forEach(({id, name, notes}) => {     
        // 重複チェック
        const folderIndex = folders.findIndex(({folderId}) => folderId === id);

        if (folderIndex === -1) {
          folders.push({ folderId: id,folderName: name });
        }        
        notes.forEach(({ id, title, content }) => {        
          // 配列のインデックスを取得
          const noteIndex = notesList.findIndex(({noteId}) => noteId === id);
          // ノート新規作成時に重複しないようにチェック
          if (noteIndex === -1) {
            // 配列に追加
            notesList.push({ noteId: id, title, body: content });      
          }                  
        });
      }); 
      // 空のデータは削除
      if (notesList[0]["noteId"] === "") {
        notesList.shift();
      }      
      if (folders[0]["folderId"] === "") {
        folders.shift();
      }
      // State更新
      setNotesList(notesList);    
      setFolders(folders);      
    })();
  }, [notesList, setNotesList, folders, setFolders]);         
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
      <CreateArea>
        <CreateNoteButton />
        <CreateFolderButton />
      </CreateArea>
    </>
  );     
};

const CreateArea = styled.div`
  width: 80px;
  height: 40px; 
  position: fixed;
  bottom: 10px;
  left: 10px;
  display: flex;
`;