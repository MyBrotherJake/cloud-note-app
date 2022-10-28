import { TrashIcon } from "@heroicons/react/24/outline"
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
    // 確認ダイアログ表示
    if (window.confirm("ノートを削除してもよろしいですか？") === true) {            
      await deleteNote(note["noteId"]);
    };    
  };
  const deleteNote = async (noteId) => {
    // TODO 削除処理
    // Internal Server Error StatusCode 500
    //const resData = await axios.delete(`/notes/${noteId}`);        
    //console.log(resData);
    // State 更新
    updateNoteList(noteId);

    //return resData;    
  };
  // TODO State の更新
  const updateNoteList = (id) => {
    // 配列のインデックスを取得
    const index = notesList.findIndex(({noteId}) => noteId === id);
    // 指定した要素を削除    
    delete notesList[index];    
    // State 更新    
    setNotesList(notesList);
    // 現在の選択をクリア
    setNote({noteId: "", title: "", body: ""});    
  };

  return (
    <TrashIcon onClick={onClickDelete} />          
  );
};
