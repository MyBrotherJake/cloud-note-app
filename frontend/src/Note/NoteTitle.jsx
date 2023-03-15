import { useContext } from "react";
import styled from "styled-components";
import { ShowNoteContext } from "../Providers/ShowNoteProvider";
import { SetContent } from "./SetNote";
import { UpdateNote } from "./UpdateNote";
/**
 * ノートのタイトル
 */
export const NoteTitle = (props) => {
//export const NoteTitle = () => {
  //const { notesList, setNotesList, note } = useContext(ShowNoteContext);
  const { notesList, setNotesList, note } = props;
  // タイトルの取得    
  const { data, onChangeContent, isChange, setIsChange } = SetContent("title", notesList, setNotesList, note);
  
  if (isChange) {    
    UpdateNote(notesList, setNotesList, note);    
    setIsChange(false);
  }

  return (
    <TitleArea 
      key={note["noteId"]}
      onChange={onChangeContent} 
      placeholder="タイトル"            
      value={data}
    />
  );
};

const TitleArea = styled.input`
  width: 500px;
  font-size: 24px;
  border: none;
  margin: 20px;
`;