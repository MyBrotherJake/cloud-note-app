import Editor from "rich-markdown-editor";
import styled from "styled-components";
import { GetContent, UpdateNote } from "./SetContent";
/**
 * ノートの作成、編集
 */
export const NoteBody = () => {
  // 本文の取得
  const { note, noteId, data, isChange, setIsChange, onChangeContent } = GetContent("body");

  console.log(data);
  if (isChange) {
    setIsChange(false);
    UpdateNote(note);    
  }

  return (
    <>
      <EditorArea>
        <Editor          
          key={noteId}
          //value={data}
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



