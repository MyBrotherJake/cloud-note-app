import { useContext, useEffect } from "react";
import { ShowNoteContext } from "../Providers/ShowNoteProvider";
import axios from "axios";
/**
 * ノート一覧表示
 */
 export const NoteListItems = () => {
  
  const { values, setValues } = useContext(ShowNoteContext);
  /**
   * noteId をキーにAPIから値取得
   */
  const getNoteContents = (noteKey) => {
    // axios setting
    const instance = axios.create({      
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE",
        "Access-Control-Allow-Headers": "Content-Type",
      }      
    });
    // GET
    instance.get("/notes/" + noteKey).then(res => {

      const noteTitle = res.data["title"];
      const noteBody = res.data["content"];
      const userId = res.data["userId"];

      const newValues = {...values, noteId: noteKey, title: noteTitle, body: noteBody};
      setValues(newValues);
    });        
  };
  /**
   * onClick時にAPI呼び出し
   */
  const onClickList = (e) => {    
    // ノートID, タイトルを取得    
    const noteKey = e.target.id;
    // APIから取得    
    getNoteContents(noteKey);    
  };
  /**
   * フォルダの有無で処理を分け、後でジョインする。
   */
  let prevId = ""; // フィルタ用
  // フォルダのないものだけ
  const notFolder = dummyNotes.map(({noteId, title, body, folderId, folderName}) => {
    if (folderId === "0") {
      return (
        <li id={noteId} onClick={onClickList}>{title}</li>
      );
    } else {
      return null;
    }    
  });
  // フォルダのあるものだけを抽出
  // mapで作った配列から undefined を 除外 する
  const newFolderList = dummyNotes.map(({folderId, folderName}) => {
    // フォルダが設定されていて、かつ新しいフォルダだった場合    
    if (folderId !== "0" && prevId !== folderId) {
      // 前のIDを保持
      prevId = folderId;
      // 新しい配列を作成
      return (
        {folderKey: folderId, folderName: folderName}
      );
    } else {
      return null;
    }
  }).filter(Boolean);  
  // フォルダのあるものだけ
  const withFolder  = newFolderList.map(({folderKey, folderName}) => {
    return (
      <li key={folderKey}>
        {folderName}
        {
          dummyNotes.map(({noteId, title, body, folderId}) => {
            if (folderKey === folderId && folderId !== "0") {
              return (
                <ul>
                  <li id={noteId} onClick={onClickList}>{title}</li>
                </ul>
              );              
            } else {
              return null;
            } 
          })
        }
      </li>
    );
  });
  
  // ここで Joinする
  const notesList = withFolder.concat(notFolder);
  
  return (
    <>
      <ul>
        {notesList}
      </ul>        
    </>          
  );   
};
// ノート一覧
const dummyNotes = [
  {
    noteId: "0746bda6-5e32-4a6e-8008-a622027e8d5a",
    title: "NoteTitle 1",
    body: `# NoteBody from NoteTitle 1\n ## DummyText is\n
    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
    Excepteur sint occaecat cupidatat non proident, 
    sunt in culpa qui officia deserunt mollit anim id est laborum.
    `
    ,
    folderId: "0",    
    folderName: ""
  },
  {
    noteId: "9a05aab2-0e77-499a-bf25-64e688458826",
    title: "NoteTitle 2",
    body: `
      NoteBody from NoteTitle 2    
      Lorem ipsum dolor sit amet, 
      consectetur adipiscing elit, 
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
      Ut enim ad minim veniam, 
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
      Excepteur sint occaecat cupidatat non proident, 
      sunt in culpa qui officia deserunt mollit anim id est laborum.
    `,
    folderId: "0",
    folderName: "",    
  }, 
  {
    noteId: "ee0a29f0-139f-409b-afb3-b1b458fc2588",
    title: "タイトル 3",
    body: `# 本文 3
      ** Lorem ipsum dolor sit amet, ** 
      ** consectetur adipiscing elit, **
      # sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
      Ut enim ad minim veniam, 
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
      Excepteur sint occaecat cupidatat non proident, 
      sunt in culpa qui officia deserunt mollit anim id est laborum.    
    `,
    folderId: "0",
    folderName: "",
  },
  {
    noteId: "4",
    title: "NoteTitle 4",
    body: "Hello World",
    folderId: "1",    
    folderName: "FolderName 1",
  },
  {
    noteId: "5",
    title: "",
    body: "# 吾輩はねこである",
    folderId: "1",    
    folderName: "FolderName 1",
  },
  {
    noteId: "6",
    title: "NoteTitle 6",
    body: `
      ## Dummy Text
      * datat non proident, *
      ** sunt in culpa qui officia deserunt mollit anim id est laborum.**
    `,
    folderId: "1",    
    folderName: "FolderName 1",
  },
  {
    noteId: "7",
    title: "NoteTitle 7",
    body: "# NoteBody from NoteTitle 7",
    folderId: "2",    
    folderName: "フォルダ 2",
  },
  {
    noteId: "8",
    title: "NoteTitle 8",
    body: "## NoteBody from NoteTitle 8",
    folderId: "2",    
    folderName: "フォルダ 2",
  },
];
// フォルダ
const dummyFolder = [
  {
    folderKey: "1",
    folderName: "FolderName 1",
  },
  {
    folderKey: "2",
    folderName: "フォルダ 2",
  },
];
