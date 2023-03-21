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
    // State更新処理
    createNote(resData.data);
  };
  // State
  const createNote = (data) => {
     // 一覧に追加
     notesList.push({ 
      noteId: data["id"], 
      title: "新規ノート", 
      body: data["content"], 
      folderId: data["folderId"], 
      updatedAt: data["updatedAt"], 
      createdAt: data["createdAt"] 
    });
    setNotesList(notesList);
    // 選択中にする    
    setNote({ 
      noteId: data["id"], 
      title: "新規ノート", 
      body: data["content"], 
      folderId: data["folderId"] 
    });        
  };

  return (
    onClickCreate
  );
}