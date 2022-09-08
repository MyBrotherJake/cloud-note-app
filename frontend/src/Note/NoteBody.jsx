import { useContext } from "react";
import Editor from "rich-markdown-editor";
import styled from "styled-components";
import { ShowNoteContext } from "../Providers/ShowNoteProvider";
/**
 * ノートの作成、編集
 */
export const NoteBody = () => {

  const { note, setNote } = useContext(ShowNoteContext);
  // ノートの編集内容をアップデート
  const onChangeBody = (content) => {      
    // エディタ自身で 内部的に State を管理しているため、onChange での State変更は 予期しない動作になる    
    //setNote({...note, body: content()});        
  } 
  
  return (
    <>
      <EditorArea>
        <Editor 
          placeholder=""
          onChange={onChangeBody}          
          value={note.body}
          readOnly={false}
        />        
      </EditorArea>    
    </>    
  );
  
};

const EditorArea = styled.div`
  margin: 20px;
`;



