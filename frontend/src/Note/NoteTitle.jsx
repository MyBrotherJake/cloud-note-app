import { useContext } from "react";
import styled from "styled-components";
import { ShowNoteContext } from "../Providers/ShowNoteProvider";
/**
 * ノートのタイトル
 */
export const NoteTitle = () => {

  const { note, setNote, noteId } = useContext(ShowNoteContext);
  
  const onChangeTitle = (element) => {
    // ノート名をセット
    //setNote({ title: element.target.value, ...note });    
    
  }
  // 現在選択されているタイトルをIDから取得
  const titleData = note.find(element => element["noteId"] === noteId);
  let title = "";

  if (titleData) {
    title = titleData["title"];    
  }

  
  

  return (
    <TitleArea 
      onChange={onChangeTitle} 
      placeholder="タイトル"
      value={title}
    />
  );
};

const TitleArea = styled.input`
  width: 500px;
  font-size: 24px;
  border: none;
  margin: 20px;
`;