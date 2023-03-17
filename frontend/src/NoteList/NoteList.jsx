import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import { NoteListItems } from "./NoteListItems";
import { CreateNoteButton } from "./CreateNoteButton";
import { CreateFolderButton } from "./CreateFolderButton";
import { ShowNoteContext } from "../Providers/ShowNoteProvider";
import { CreateNote } from "../Note/CreateNote";
/**
 * ノート一覧の表示
 */
export const NoteList = () => {  
  
  const { note, setNote, notesList, setNotesList, folders, setFolders } = useContext(ShowNoteContext);    
  const [ notes, setNotes ] = useState();   
  // 再描画の制御      
  useEffect(() => {
    (async () => {      
      const resNotes = await axios.get("/notes");      
      const notesData = resNotes.data;
      setNotes(notesData);      
    })();
  }, []); 
  
  if (!notes) {
    return <ul></ul>
  };

  /**
   * folders にノートがあるかをチェック
   */     
  let existNote = false;        
  notes["folders"].forEach(({notes}) => {              
    if (notes.length > 0) {                 
      existNote  = true
      return;
    }
  });       
  if (notes["notesWithoutFolder"].length > 0) {    
    existNote = true;
  }
  if (notesList[0]["noteId"] !== "" && notesList[0]["folderId"] !== "") {    
    existNote = true;
  }  
  // ノートがない場合に新規作成処理         
  if (existNote === false) {    
    const createNewNote = CreateNote(setNote, notesList, setNotesList);
    createNewNote();       
  }  
  // 配列を整理して notesList を更新する
  // フォルダなし      
  notes["notesWithoutFolder"].forEach(({ id, title, content, folderId, updatedAt }) => {                          
    // 配列のインデックスを取得
    const noteIndex = notesList.findIndex(({noteId}) => noteId === id);
    // ノート新規作成時に重複しないようにチェック
    if (noteIndex === -1) {
      // 配列に追加
      notesList.push({ noteId: id, title, body: content, folderId, updatedAt });      
    }                
  });  
  // フォルダあり  
  notes["folders"].forEach(({id, name, createdAt, updatedAt, notes}) => {                   
    // 重複チェック
    const folderIndex = folders.findIndex(({folderId}) => folderId === id);
    const folderSubId = id;

    if (folderIndex === -1) {
      folders.push({ folderId: folderSubId, folderName: name, isOpen: true, createdAt });                  
    } 
    if (notes.length > 0) {
      notes.forEach(({ id, title, content, updatedAt }) => {        
        // 配列のインデックスを取得
        const noteIndex = notesList.findIndex(({noteId}) => noteId === id);
        // ノート新規作成時に重複しないようにチェック
        if (noteIndex === -1) {
          // 配列に追加
          notesList.push({ noteId: id, title, body: content, folderId: folderSubId, updatedAt, createdAt });      
        }                  
      });        
    } else {
      if (folderIndex === -1) {
        notesList.push({ noteId: "", title:"", body: "", folderId: folderSubId, updatedAt, createdAt }); 
      }      
    }           
  });         
  // 空のデータは削除
  if (notesList.length > 0 && notesList[0]["noteId"] === "") {
    notesList.shift();
  }      
  if (folders.length > 0 && folders[0]["folderId"] === "") {
    folders.shift();
  }  
  // State更新                                    
  setNotesList(notesList);          
  setFolders(folders);       
  // ノートIDが取得できない場合 => 画面ロード時の処理    
  if (notesList.length > 0 && note["noteId"] === "") {      
    // 更新日順にソート            
    notesList.filter((element) => element["noteId"] !== "").sort((a, b) => (a.updatedAt > b.updatedAt) ? -1 : 1);        
    // 最新のノートをセット
    const noteId = notesList[0]["noteId"];
    const title = notesList[0]["title"];
    const body = notesList[0]["body"];
    const folderId = notesList[0]["folderId"];    
    // TODO 
    /**
     * Warning: Cannot update a component (`ShowNoteProvider`) while rendering a different component (`NoteList`). 
     * To locate the bad setState() call inside `NoteList`     
     */
    setNote({ noteId, title, body, folderId });    
  };   
  
  return (
    <>      
      <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Notes List
        </ListSubheader>
      }
      >
        <NoteListItems />      
      </List>
      
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