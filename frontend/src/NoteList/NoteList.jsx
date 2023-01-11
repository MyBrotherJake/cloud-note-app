import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { NoteListItems } from "./NoteListItems";
import { CreateNoteButton } from "./CreateNoteButton";
import { CreateFolderButton } from "./CreateFolderButton";
import { ShowNoteContext } from "../Providers/ShowNoteProvider";
import { AuthContext } from "../Providers/AuthProvider";
import { CreateNote } from "../Note/SetNote";
/**
 * ノート一覧の表示
 */
export const NoteList = () => {  
  
  const { note, setNote, notesList, setNotesList, folders, setFolders } = useContext(ShowNoteContext);  
  const { user } = useContext(AuthContext);  
  const [ notes, setNotes ] = useState();  
   
  // 再描画の制御  
  useEffect(() => {
    (async () => {
      const resNotes = await axios.get("/notes");
      // APIから取得したデータをそのまま props として渡す
      const notesData = resNotes.data;
      setNotes(notesData);
      
      // 新規作成処理
      if (notesData["notesWithoutFolder"].length === 0 && notesData["folders"].length === 0) {
        const createNote = async () => {
          // UserID    
          //const userId = user["id"];
          // 認証が現在通らないので、あらかじめ作ったダミーデータを利用する
          const userId = "8a940d80-2d62-4e59-885e-5b67df590f8a";
          // ユーザーIDを渡して、新規ノート作成
          const resData = await axios.post(`/notes`, {userId: userId});
          // ノートIDを取得
          const noteId = resData.data["id"];    
          // State更新処理
          // 選択中にする
          setNote({ noteId, title: "新規ノート", body: "" });        
          // 一覧に追加
          notesList.push({ noteId, title: "新規ノート", body: "" }); 
          // State更新用の配列をコピー
          const newNotesList = notesList.slice();
          // 一覧のState更新
          setNotesList(newNotesList);              
        }
        createNote();              
      }
      // 配列を整理して notesList を更新する
      // フォルダなし    
      notesData["notesWithoutFolder"].forEach(({ id, title, content, folderId, updatedAt }) => {            
        // 配列のインデックスを取得
        const noteIndex = notesList.findIndex(({noteId}) => noteId === id);
        // ノート新規作成時に重複しないようにチェック
        if (noteIndex === -1) {
          // 配列に追加
          notesList.push({ noteId: id, title, body: content, folderId, updatedAt });      
        }                
      });
      // フォルダあり
      notesData["folders"].forEach(({id, name, notes}) => {     
        // 重複チェック
        const folderIndex = folders.findIndex(({folderId}) => folderId === id);
        const folderSubId = id;

        if (folderIndex === -1) {
          folders.push({ folderId: folderSubId,folderName: name });
        }        
        notes.forEach(({ id, title, content, updatedAt }) => {        
          // 配列のインデックスを取得
          const noteIndex = notesList.findIndex(({noteId}) => noteId === id);
          // ノート新規作成時に重複しないようにチェック
          if (noteIndex === -1) {
            // 配列に追加
            notesList.push({ noteId: id, title, body: content, folderId: folderSubId, updatedAt });      
          }                  
        });        
      });       

      // 空のデータは削除
      if (notesList.length > 0 && notesList[0]["noteId"] === "") {
        notesList.shift();
      }      
      if (folders.length > 0 && folders[0]["folderId"] === "") {
        folders.shift();
      }      
      // ノートIDが取得できない場合
      if (notesList.length > 0 && note["noteId"] === "") {
        /**
        * 更新日順にソート
        */
        notesList.sort((a, b) => (a.updatedAt > b.updatedAt) ? -1 : 1);
        // 最新のノートをセット
        const noteId = notesList[0]["noteId"];
        const title = notesList[0]["title"];
        const body = notesList[0]["body"];
        const folderId = notesList[0]["folderId"];
        setNote({ noteId, title, body, folderId });
      }
      // TODO ノート新規作成
      /*        
        const createNote = async () => {
          // UserID    
          //const userId = user["id"];
          // 認証が現在通らないので、あらかじめ作ったダミーデータを利用する
          const userId = "8a940d80-2d62-4e59-885e-5b67df590f8a";
          // ユーザーIDを渡して、新規ノート作成
          const resData = await axios.post(`/notes`, {userId: userId});
          // ノートIDを取得
          const noteId = resData.data["id"];    
          // State更新処理
          // 選択中にする
          setNote({ noteId, title: "新規ノート", body: "" });        
          // 一覧に追加
          notesList.push({ noteId, title: "新規ノート", body: "" }); 
          // State更新用の配列をコピー
          const newNotesList = notesList.slice();
          // 一覧のState更新
          setNotesList(newNotesList);              
        }
        createNote();        
      }
      */           
      // State更新
      setNotesList(notesList);    
      setFolders(folders);                          
    })();    
  }, [user, note, setNote, notesList, setNotesList, folders, setFolders]);      
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