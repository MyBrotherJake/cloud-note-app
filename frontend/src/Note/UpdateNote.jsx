import axios from "axios";
/**
 * API PATCH 処理
 */
export function UpdateNote (notesList, setNotesList, note, setNote) {    
  // 配列のインデックスを取得
  const index = notesList.findIndex(({noteId}) => noteId === note["noteId"]);

  if (index === -1) {
    return;
  }
  // TODO
  /**
   * UPDATE ERROR
   */
  // 値をセット
  const title = notesList[index]["title"];
  const body = notesList[index]["body"];
  const noteId = notesList[index]["noteId"];  
  const folderId = notesList[index]["folderId"];
  // PATCH Data
  const patchData = {    
    title,
    content: body,
    folderId,
  };
  // Update    
  const update = async () => {    
    const resData = await axios.patch(`/notes/${noteId}`, patchData );    
    // NoteList State更新    
    notesList[index]["title"] = resData.data["title"];
    notesList[index]["body"] = resData.data["body"];
    notesList[index]["folderId"] = resData.data["folderId"];
    notesList[index]["updatedAt"] = resData.data["updatedAt"];
    // Note        
    const newNotesList = notesList.slice();
    setNotesList(newNotesList);

    setNote({ 
      noteId, 
      title: resData.data["title"],
      body: resData.data["body"],
      folderId: resData.data["folderId"]
    });    
  };    
 update();        
};