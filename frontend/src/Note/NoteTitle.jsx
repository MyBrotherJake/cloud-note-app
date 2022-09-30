import styled from "styled-components";
import { GetContent, UpdateNote } from "./SetContent";
/**
 * ノートのタイトル
 */
export const NoteTitle = () => {
  // タイトルの取得
  const { noteId, data, isChange, setIsChange, onChangeContent } = GetContent("title");
    
  if (isChange) {
    UpdateNote();
    setIsChange(false);
  }

  return (
    <TitleArea 
      key={noteId}
      onChange={onChangeContent} 
      placeholder="タイトル"            
      defaultValue={data}
    />
  );
};

const TitleArea = styled.input`
  width: 500px;
  font-size: 24px;
  border: none;
  margin: 20px;
`;