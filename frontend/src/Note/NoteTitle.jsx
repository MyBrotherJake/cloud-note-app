import styled from "styled-components";
import { SetContent, UpdateNote } from "./SetNote";
/**
 * ノートのタイトル
 */
export const NoteTitle = () => {
  // タイトルの取得    
  const { notesList, setNotesList, note, data, onChangeContent, isChange, setIsChange } = SetContent("title");
  
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