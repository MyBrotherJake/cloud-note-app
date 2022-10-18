import { createContext, useState } from "react";

export const ShowNoteContext = createContext({});

export const ShowNoteProvider = props => {
  const { children } = props;

  // ノートの情報  
  const [ note, setNote ] = useState({
    noteId: "",
    title: "",
    body: "",
  });   
  // ノートの一覧情報
  const [ notesList, setNotesList ] = useState(
    [
      {
        noteId: "",
        title: "",
        body: "",
      }
    ]    
  );

  return (
    <ShowNoteContext.Provider value={{ notesList, setNotesList, note, setNote }}>
      {children}
    </ShowNoteContext.Provider>
  );
};