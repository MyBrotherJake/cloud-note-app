import Editor from "rich-markdown-editor";
import styled from "styled-components";
import { SetContent, UpdateNote } from "./SetNote";
/**
 * ノートの作成、編集
 */
export const NoteBody = () => {
  // 本文の取得
  
  const { notesList, setNotesList, note, data, onChangeContent, isChange, setIsChange } = SetContent("body");
  
  if (isChange) {    
    UpdateNote(notesList, setNotesList, note);    
    setIsChange(false);
  } 
   
  return (
    <>
      <EditorArea>
        <Editor                    
          key={note["noteId"]}         
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