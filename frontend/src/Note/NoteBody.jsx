import { useContext } from "react";
import Editor from "rich-markdown-editor";
import styled from "styled-components";
import { ShowNoteContext } from "../Providers/ShowNoteProvider";
import { SetContent } from "./SetNote";
import { UpdateNote } from "./UpdateNote";
/**
 * ノートの作成、編集
 */
export const NoteBody = () => {
  // タイトルの取得    
  const { noteId, data, onChangeContent, isChange, setIsChange } = SetContent("body");

  if (isChange) {    
    UpdateNote();    
    setIsChange(false);
  } 
   
  return (
    <>
      <EditorArea>
        <Editor                    
          key={noteId}         
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