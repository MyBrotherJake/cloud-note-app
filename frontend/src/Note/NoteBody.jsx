import { useContext } from "react";
import Editor from "rich-markdown-editor";
import styled from "styled-components";
import { ShowNoteContext } from "../Providers/ShowNoteProvider";
/**
 * ノートの作成、編集
 */
export const NoteBody = () => {

  const { values, setValues } = useContext(ShowNoteContext);
  // ノートの編集内容をアップデート
  const onChangeBody = (value) => {      
    // エディタ自身で 内部的に State を管理しているため、onChange での State変更は 予期しない動作になる    
    //setValues({...values, body: value()});        
  } 
  
  return (
    <>
      <EditorArea>
        <Editor 
          placeholder=""
          onChange={onChangeBody}          
          value={values.body}
          readOnly={false}
        />        
      </EditorArea>    
    </>    
  );
  
};

const EditorArea = styled.div`
  margin: 20px;
`;



