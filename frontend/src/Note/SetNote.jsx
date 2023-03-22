import { useState, useContext } from "react";
import { ShowNoteContext } from "../Providers/ShowNoteProvider";
/**
 * NoteTitle および NoteBody の共通処理
 * Title と Body の値を配列から探してセットする
 */
export function SetContent (target) {
  const { note, setNote, notesList, setNotesList } = useContext(ShowNoteContext);  
  // 変更フラグ
  const [ isChange, setIsChange ] = useState(false);        
  // ノートID
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
    setNote(note);
    // 変更フラグを立てる
    setIsChange(true);   
  };   
  return {         
    noteId,               // ノートID
    data,                 // 表示させる値
    onChangeContent,      // onChange Event
    isChange,             // 内容の変更フラグ  
    setIsChange           // 変更フラグ State
  };
};  