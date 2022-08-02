import { useState } from "react";
import styled from "styled-components";

export const NoteTitle = () => {

  const [ title, setTitle ] = useState("");

  const onChangeTitle = (e) => {
    // ノート名を取得
    setTitle(e.target.value);
    console.log(title);
  }

  return (
    <TitleArea 
      onChange={onChangeTitle} 
      placeholder="タイトル" 
      value={ title } 
    />
  );
};

const TitleArea = styled.input`
  width: 500px;
  font-size: 24px;
  border: none;
  margin: 20px;
`;