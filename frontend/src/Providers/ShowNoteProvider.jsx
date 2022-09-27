import { createContext, useState } from "react";

export const ShowNoteContext = createContext({});

export const ShowNoteProvider = props => {
  const { children } = props;

  // ノートの情報
  /*
  const [ note, setNote ] = useState({
    noteId: "",
    title: "",
    body: "",
  });    
*/
  const [ note, setNote ] = useState(
    [
      {
        noteId: "",
        title: "",
        body: "",
      }
    ]    
  );

  const [ noteId, setNoteId ] = useState(
    {
      noteId: ""
    }
  );

  return (
    <ShowNoteContext.Provider value={{ note, setNote, noteId, setNoteId }}>
      {children}
    </ShowNoteContext.Provider>
  );
};