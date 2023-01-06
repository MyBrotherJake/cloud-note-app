import { useContext, useState } from "react";
import axios from "axios";
import { ShowNoteContext } from "../Providers/ShowNoteProvider";
/**
 * NoteTitle および NoteBody の共通処理
 * Title と Body の値を配列から探してセットする
 */
export function SetContent (target) {
  // State を取得
  const { notesList, setNotesList, note } = useContext(ShowNoteContext);
  // 変更フラグ
  const [ isChange, setIsChange ] = useState(false);    
  // noteId
  const noteId = note["noteId"];
  // NoteListからIDをもとに ノート詳細を取得  
  const noteData = notesList.find(element => element && element["noteId"] === noteId);
  // データ取得
  let data = "";  
  // ノート新規作成時の null 回避 (inputタグおよびエディタでのエラー回避)
  if (noteData && noteData[target]) {
    data = noteData[target];
  }
  /**
   * onChange
   */
  const onChangeContent = async (element) => {    
    // 配列のインデックスをnoteIdから取得    
    const index = notesList.findIndex(({noteId}) => noteId === noteData["noteId"]);    
    
    if (index === -1){
      return;
    }
    
    // useEffect の再レンダリングの条件として、違うオブジェクトを参照させるため、配列をコピー
    const newList =notesList.slice()
    let targetValue = "";        
    // NoteTitle, NoteBody からの呼び出しを判定
    // それぞれ値をセット
    switch (target) {
      case "title":
        targetValue = element.target.value;        
        break;
      case "body":
        targetValue = element();
        break;
      default:
        targetValue = "";
        break;
    };    
    // 配列にセット
    if (index !== -1) {
      newList[index][target] = targetValue;                  
    }    
    setNotesList(newList);     
    // 変更フラグを立てる
    setIsChange(true);   
  };   
  return { 
    notesList,            // ノート一覧データ
    note,                 // 現在選択されているノートのデータ
    noteId,               // 現在選択されているノートID
    data,                 // 表示させる値
    onChangeContent,      // onChange Event
    isChange,             // 内容の変更フラグ  
    setIsChange           // 変更フラグ State
  };
};  
/**
 * API PATCH 処理
 */
export function UpdateNote (notesList, note) {    
  // 配列のインデックスを取得
  const index = notesList.findIndex(({noteId}) => noteId === note["noteId"]);

  if (index === -1) {
    return;
  }
  // 値をセット
  const title = notesList[index]["title"];
  const body = notesList[index]["body"];
  const noteId = notesList[index]["noteId"];  
  const folderId = notesList[index]["folderId"];
  // PATCH Data
  const patchData = {
    noteId,
    title,
    content: body,
    folderId,
  };
  // Update    
  const update = async () => {    
    const resData = await axios.patch(`/notes/${noteId}`, patchData );        
    return resData
  };  
  update();      
};
