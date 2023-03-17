import { useContext } from "react";
import styled from "styled-components";
import { ShowNoteContext } from "../Providers/ShowNoteProvider";
import { SetContent } from "./SetNote";
import { UpdateNote } from "./UpdateNote";
/**
 * ノートのタイトル
 */
export const NoteTitle = () => {
  // タイトルの取得    
  const { noteId, data, onChangeContent, isChange, setIsChange } = SetContent("title");
  
  if (isChange) {    
    UpdateNote();    
    setIsChange(false);
  }

  return (
    <TitleArea 
      key={noteId}
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