import { useContext, useState } from "react";
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
    // Update State                                
    //setNote({...note, body: content()});        
    //setNote([ ...note, { body: content() }]);   
  };     

  return (
    <>
      <EditorArea>
        <Editor          
          key={note[0].noteId}
          defaultValue={note[0].body}                    
          onChange={onChangeBody}          
        />        
      </EditorArea>    
    </>    
  );  
};

const EditorArea = styled.div`
  margin: 20px;
`;



