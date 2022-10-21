import { TrashIcon } from "@heroicons/react/24/outline"
import { useContext } from "react";
import axios from "axios";
import { ShowNoteContext } from "../Providers/ShowNoteProvider";
/**
 * 削除ボタン
 */
export const DeleteNoteButton = () => {

  const { note, setNote } = useContext(ShowNoteContext);
  /**
   * 削除アイコンクリック
   */
  const onClickDelete = async () => {
    // TODO 削除ボタンクリック
    if (window.confirm("ノートを削除してもよろしいですか？") === true) {      
      await deleteNote(note["noteId"]);
    }    
  }
  const deleteNote = async (noteId) => {
    // 削除日
    const now = new Date();
    // PATCH Data
    const patchData = {
      noteId,
      archivedAt: now
    };
    // TODO 削除処理
    const resData = await axios.patch(`/notes/${noteId}`, patchData );        
    return resData
  }

  return (
    <TrashIcon onClick={onClickDelete} />          
  );
};
