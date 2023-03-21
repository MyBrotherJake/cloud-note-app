import { TrashIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import axios from "axios";
import { ShowNoteContext } from "../Providers/ShowNoteProvider";
/**
 * 削除ボタン
 */
export const DeleteNoteButton = () => {

  const { note, setNote, notesList, setNotesList } = useContext(ShowNoteContext);
  /**
   * 削除アイコンクリック
   */
  const onClickDelete = async () => {    
    // ノートが選択されていない場合
    if (note["noteId"] === "") return;
    // 確認ダイアログ表示
    if (window.confirm("ノートを削除してもよろしいですか？") === true) {            
      try {
        const resData = await deleteNote(note["noteId"]);      
        return resData;
      } catch (error) {    
        // Error        
        window.alert(`Error 削除に失敗しました: ${error.message}`);
      }            
    };    
  };
  /**
   * 削除APIの呼び出し
   */
  const deleteNote = async (noteId) => {
    // 削除処理    
    const resData = await axios.delete(`/notes/${noteId}`);            
    // State 更新
    updateNoteList(noteId);    
    return resData;    
  };
  /**
   * 削除後のState更新
   */  
  const updateNoteList = (id) => {
    // 配列のインデックスを取得
    const index = notesList.findIndex(({noteId}) => noteId === id);    
    // 指定した要素を削除        
    if (delete notesList[index] === true) {      
      // state更新用に新しい配列を作成
      const newNotesList = notesList.filter((element) => element);    
      // State更新      
      setNotesList(newNotesList);                       
      // 現在の選択をクリア
      setNote({noteId: "", title: "", body: "", folderId: ""});          
    };    
  };

  return (
    <TrashIcon onClick={onClickDelete} />          
  );
};
