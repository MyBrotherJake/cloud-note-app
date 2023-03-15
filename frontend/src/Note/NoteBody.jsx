import { useContext } from "react";
import Editor from "rich-markdown-editor";
import styled from "styled-components";
import { ShowNoteContext } from "../Providers/ShowNoteProvider";
import { SetContent } from "./SetNote";
import { UpdateNote } from "./UpdateNote";
/**
 * ノートの作成、編集
 */
export const NoteBody = (props) => {
//export const NoteBody = () => {
  // 本文の取得  
  const { notesList, setNotesList, note } = props;
  //const { notesList, setNotesList, note } = useContext(ShowNoteContext);
  // タイトルの取得    
  const { data, onChangeContent, isChange, setIsChange } = SetContent("body", notesList, setNotesList, note);

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