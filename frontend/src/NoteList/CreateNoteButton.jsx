import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import axios from "axios";
import { ShowNoteContext } from "../Providers/ShowNoteProvider";
import { AuthContext } from "../Providers/AuthProvider";

export const CreateNoteButton = () => {

  const { setNote, notesList, setNotesList } = useContext(ShowNoteContext);
  const { user } = useContext(AuthContext);
  /**
   * ノート新規作成アイコンクリック
   */
  const onClickCreate = async () => {
    // UserID    
    //const userId = user["id"];
    // 認証が現在通らないので、あらかじめ作ったダミーデータを利用する
    const userId = "8a940d80-2d62-4e59-885e-5b67df590f8a";
    // ユーザーIDを渡して、新規ノート作成
    const resData = await axios.post(`/notes`, {userId: userId});
    // ノートIDを取得
    const noteId = resData.data["id"];    
    // State更新処理
    await createNote(noteId);
  };
  /**
   * Stateの更新処理
   */
  const createNote = async (noteId) => {
    // 選択中にする
    setNote({ noteId, title: "新規ノート", body: "" });        
    // 一覧に追加
    notesList.push({ noteId, title: "新規ノート", body: "" }); 
    // State更新用の配列をコピー
    const newNotesList = notesList.slice();
    // 一覧のState更新
    setNotesList(newNotesList);        
  };

  return (
    <DocumentPlusIcon onClick={onClickCreate} />
  )
};