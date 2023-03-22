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
  
  const { note, setNote, notesList, setNotesList, folders } = useContext(ShowNoteContext);    
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
  // 配列を整理して notesList を更新する
  // フォルダなし      
  notes["notesWithoutFolder"].forEach(({ id, title, content, folderId, updatedAt }) => {                          
    // 配列のインデックスを取得
    const noteIndex = notesList.findIndex(({noteId}) => noteId === id);
    // ノート新規作成時に重複しないようにチェック
    if (noteIndex === -1) {
      // 配列に追加
      notesList.push({ noteId: id, title, body: content, folderId, updatedAt, createdAt: "" });      
    }                
  });  
  // フォルダあり  
  notes["folders"].forEach(({id, name, createdAt, updatedAt, notes}) => {                   
    // 重複チェック
    const folderIndex = folders.findIndex(({folderId}) => folderId === id);
    const folderSubId = id;

    if (folderIndex === -1) {
      // 存在しない場合は追加
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
        // フォルダ内にノートが存在しない場合も、フォルダ情報をnotesListに追加して表示
        notesList.push({ noteId: "", title:"", body: "", folderId: folderSubId, updatedAt, createdAt }); 
      }      
    }           
  });         
  // 空のデータは削除
  if (notesList.length > 0 && notesList[0]["noteId"] === "") {
    notesList.shift();
  };      
  if (folders.length > 0 && folders[0]["folderId"] === "") {
    folders.shift();
  };    
  // 更新日順にソート               
  const sortList = notesList.filter((element) => element["noteId"] !== "").sort((a, b) => (a.updatedAt > b.updatedAt) ? -1 : 1);   

  if (sortList.length === 0 && note["noteId"] === "") {
    // ノートがない場合、新規作成
    const createNewNote = CreateNote(setNote, notesList, setNotesList);
    createNewNote();             
  } else if (sortList.length > 0 && note["noteId"] === "") {          
    // 最新のノートをセット    
    const noteId = sortList[0]["noteId"];
    const title = sortList[0]["title"];
    const body = sortList[0]["body"];
    const folderId = sortList[0]["folderId"];        
    // 選択中にする        
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