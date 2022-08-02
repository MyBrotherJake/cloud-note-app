import { useState } from "react";
import Editor from "rich-markdown-editor";
import styled from "styled-components";
/**
 * ノートの作成、編集
 */
export const NoteBody = () => {

  const [ body, setBody ] = useState("");

  // ノートの内容を取得
  const onChangeBody = (values) => {
    setBody(values);    
    console.log(body);    
  }

  return (
    <>
      <EditorArea>
        <Editor placeholder="何か入力してください" 
          defaultValue={body}
          onChange={onChangeBody}          
        />
      </EditorArea>    
    </>    
  );
  
};

const EditorArea = styled.div`
  margin: 20px;
`;



