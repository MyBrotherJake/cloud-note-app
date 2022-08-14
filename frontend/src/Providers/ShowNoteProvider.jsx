import { createContext, useState } from "react";

export const ShowNoteContext = createContext({});

export const ShowNoteProvider = props => {
  const { children } = props;

  // ノートの情報
  const [ values, setValues ] = useState({
    noteId: "",
    title: "",
    body: "",
  });    

  return (
    <ShowNoteContext.Provider value={{ values, setValues }}>
      {children}
    </ShowNoteContext.Provider>
  );
};