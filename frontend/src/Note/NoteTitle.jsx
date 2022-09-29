import { useContext } from "react";
import styled from "styled-components";
import { ShowNoteContext } from "../Providers/ShowNoteProvider";
/**
 * ノートのタイトル
 */
export const NoteTitle = () => {

  const { note, setNote, noteId } = useContext(ShowNoteContext);
    
  const onChangeTitle = (element) => {
    // ノートIDをキーに配列からインデックスを取得    
    const index = note.findIndex(({noteId}) => noteId === titleData["noteId"]);

    if (index !== -1) {        
      // 対象のノートのタイトルを変更
      note[index]["title"] = element.target.value;
    }                  
    setNote(note);
  };  

  // 現在選択されているタイトルをIDから取得      
  const titleData = note.find(element => element["noteId"] === noteId);      
  
  let title = "";  
  // タイトルがあれば表示
  if (titleData) {
    title = titleData["title"];        
  }; 

  return (
    <TitleArea 
      key={noteId}
      onChange={onChangeTitle} 
      placeholder="タイトル"            
      defaultValue={title}
    />
  );
};

const TitleArea = styled.input`
  width: 500px;
  font-size: 24px;
  border: none;
  margin: 20px;
`;