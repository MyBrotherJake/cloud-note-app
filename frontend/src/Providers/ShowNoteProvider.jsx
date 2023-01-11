import { createContext, useState } from "react";

export const ShowNoteContext = createContext({});

export const ShowNoteProvider = props => {
  const { children } = props;

  // ノートの情報  
  const [ note, setNote ] = useState({
    noteId: "",
    title: "",
    body: "",
    folderId: "",
  });   
  // ノートの一覧情報
  const [ notesList, setNotesList ] = useState(
    [
      {
        noteId: "",
        title: "",
        body: "",
        folderId: "",
        updatedAt: "",
      }
    ]    
  );
  // フォルダ情報
  const [ folders, setFolders ] = useState(
    [
      {
        folderId: "",
        folderName: "",
      }
    ]
  );

  return (
    <ShowNoteContext.Provider value={{ notesList, setNotesList, note, setNote, folders, setFolders }}>
      {children}
    </ShowNoteContext.Provider>
  );
};