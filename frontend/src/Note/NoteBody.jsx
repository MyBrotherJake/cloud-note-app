import Editor from "rich-markdown-editor";
import styled from "styled-components";
import { GetContent, UpdateNote } from "./SetContent";
/**
 * ノートの作成、編集
 */
export const NoteBody = () => {
  // 本文の取得
  const { noteId, data, isChange, setIsChange, onChangeContent } = GetContent("body");

  if (isChange) {
    UpdateNote();
    setIsChange(false);
  }

  return (
    <>
      <EditorArea>
        <Editor          
          key={noteId}
          value={data}
          defaultValue={data}
          onChange={onChangeContent}          
        />        
      </EditorArea>    
    </>    
  );  
};

const EditorArea = styled.div`
  margin: 20px;
`;



