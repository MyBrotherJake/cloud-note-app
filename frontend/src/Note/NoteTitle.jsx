import { useState, useContext } from "react";
import styled from "styled-components";
import { ShowNoteContext } from "../Providers/ShowNoteProvider";
/**
 * ノートのタイトル
 */
export const NoteTitle = () => {

  const { values, setValues } = useContext(ShowNoteContext);
  
  const onChangeTitle = (e) => {
    // ノート名を取得
    setValues({...values, title: e.target.value});    
  }

  return (
    <TitleArea 
      onChange={onChangeTitle} 
      placeholder="タイトル" 
      value={values.title}
    />
  );
};

const TitleArea = styled.input`
  width: 500px;
  font-size: 24px;
  border: none;
  margin: 20px;
`;