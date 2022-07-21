import React from "react";
import reactDOM from "react-dom";
import Editor from "rich-markdown-editor";
import styled from "styled-components";


//TODO 一覧のタイトルをクリックして、内容を表示


/**
 * 一覧から読み込んだノートの内容を、defaultValue にセットする
 */
const App = () => {
  return (
    <>      
      <TitleArea placeholder="タイトル" />
      <Editor 
        placeholder="何か入力してください" 
        defaultValue="" 
        dark={false}
      />
    </>
  );
};



const TitleArea = styled.input`
  width: 200px;
  font-size: 16px;
  margin: 10px;
`;

// ID に 変更
// Target Container is not a DOM Element 
reactDOM.render(<App />, document.getElementById("editor"));