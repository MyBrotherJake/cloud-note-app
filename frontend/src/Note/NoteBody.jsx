import { useContext } from "react";
import Editor from "rich-markdown-editor";
import styled from "styled-components";
import { ShowNoteContext } from "../Providers/ShowNoteProvider";
/**
 * ノートの作成、編集
 */
export const NoteBody = () => {

  const { note, setNote, noteId } = useContext(ShowNoteContext);   
  // ノートの編集内容をアップデート  
  const onChangeBody = (content) => {
    // ノートIDをキーに配列からインデックスを取得    
    const index = note.findIndex(({noteId}) => noteId === bodyData["noteId"]);

    if (index !== -1) {        
      // 対象のノート本文を変更
      note[index]["body"] = content();      
    }                    
    setNote(note);
  };  

  // 現在選択されている本文をIDから取得      
  const bodyData = note.find(element => element["noteId"] === noteId);      
  
  let body = "";  
  // タイトルがあれば表示
  if (bodyData) {
    body = bodyData["body"];        
  };   

  return (
    <>
      <EditorArea>
        <Editor          
          key={noteId}
          value={body}
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



