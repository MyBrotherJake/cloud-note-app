import axios from "axios";
/**
 * API Create Note
 */
export function CreateNote(setNote, notesList, setNotesList) {
  /**
   * onClick Event
   */
  const onClickCreate = async () => {    
    // ユーザーIDを渡して、新規ノート作成
    const resData = await axios.post(`/notes`);
    // ノートIDを取得
    const noteId = resData.data["id"];    
    // State更新処理
    await createNote(noteId);
  };
  // State
  const createNote = async (noteId) => {
     // 選択中にする
     setNote({ noteId, title: "新規ノート", body: "", folderId: "" });        
     // 一覧に追加
     notesList.push({ noteId, title: "新規ノート", body: "", folderId: "" }); 
     // State更新用の配列をコピー
     const newNotesList = notesList.slice();
     // 一覧のState更新
     setNotesList(newNotesList);                 
  };

  return (
    onClickCreate
  );
}