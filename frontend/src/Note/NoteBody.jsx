import { useState, useContext } from "react";
import Editor from "rich-markdown-editor";
import styled from "styled-components";
import { ShowNoteContext } from "../Providers/ShowNoteProvider";
/**
 * ノートの作成、編集
 */
export const NoteBody = () => {

  const { values, setValues } = useContext(ShowNoteContext);
  /**
   * values.body が 空文字 になる  
   * console.log では中を確認できる
   */
  const test = `# NoteBody from NoteTitle 1
  ## Dummy Text
  Lorem ipsum dolor sit amet, 
  consectetur adipiscing elit, 
  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam, 
  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
  Excepteur sint occaecat cupidatat non proident, 
  sunt in culpa qui officia deserunt mollit anim id est laborum.    
`;
  let test2 = "";

  if (values.body === "") {
    test2 = test;
  } else {
    test2 = values.body;
  }

  console.log(test2);
  // ノートの内容を取得
  const onChangeBody = (value) => {    
    setValues({...values, body: value()});        
  }

  return (
    <>
      <EditorArea>
        <Editor placeholder="何か入力してください"           
          onChange={onChangeBody}
          defaultValue={test2}
        />        
      </EditorArea>    
    </>    
  );
  
};

const EditorArea = styled.div`
  margin: 20px;
`;



