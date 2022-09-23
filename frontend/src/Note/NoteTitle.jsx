import { useContext } from "react";
import styled from "styled-components";
import { ShowNoteContext } from "../Providers/ShowNoteProvider";
/**
 * ノートのタイトル
 */
export const NoteTitle = () => {

  const { note, setNote } = useContext(ShowNoteContext);
  
  const onChangeTitle = (element) => {
    // ノート名をセット
    setNote({ title: element.target.value, ...note });    
  }

  return (
    <TitleArea 
      onChange={onChangeTitle} 
      placeholder="タイトル" 
      value={note[0].title}
    />
  );
};

const TitleArea = styled.input`
  width: 500px;
  font-size: 24px;
  border: none;
  margin: 20px;
`;