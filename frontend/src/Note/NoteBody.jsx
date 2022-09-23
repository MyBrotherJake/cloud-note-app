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
    const data = note.forEach((noteId) => {           
      if (noteId["noteId"] === note[0].noteId) {        
        console.log("a");        
      }
    });
    setNote(...note[0], content())
    //setNote({...note, body: content()});        
    //setNote([ ...note, { body: content() }]);   
  };     
    
  console.log(note);  

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



