import { useContext, useState } from "react";
import { axios } from "axios";
import { ShowNoteContext } from "../Providers/ShowNoteProvider";
/**
 * NoteTitle および NoteBody の共通処理
 * 
 */
export function GetContent (target) {
  
  const { note, setNote, noteId } = useContext(ShowNoteContext);  

  const [ isChange, setIsChange ] = useState(false);
  // 現在選択されているノートの情報をIDから取得
  const noteData = note.find(element => element["noteId"] === noteId)
  // データが取得できた場合
  let data = "";
  if (noteData) {
    data = noteData[target];
  }; 
  /**
   * onChangeイベント
   */
  const onChangeContent = (element) => {
    // 配列のインデックスをnoteIdから取得
    const index = note.findIndex(({noteId}) => noteId === noteData["noteId"]);    

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
      note[index][target] = targetValue;
    }
    setIsChange(true);
    setNote(note);    
  } 

  return { noteId, data, isChange, setIsChange, onChangeContent };
};
/**
 * API PATCH 処理
 */
export function UpdateNote () {  

  const { note, noteId } = useContext(ShowNoteContext);
// 配列のインデックスをnoteIdから取得
  const index = note.findIndex(({noteKey}) => noteKey === note["noteId"]);    
  // 値をセット
  /*const title = note[index]["title"];
  const body = note[index]["body"];
  */
  console.log(note[index]);
  /*
  const title = note[index]["title"];
  const body = note[index]["body"];

  const updateData = async () => {
    await axios.patch(`/notes/${noteId}`, { noteId, title, content: body } );
  };

  updateData();
  */
 
};