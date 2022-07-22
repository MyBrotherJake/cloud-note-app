import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import Editor from "rich-markdown-editor";
import styled from "styled-components";
/**
 * ノートの作成、編集
 */
const Note = () => {
  
  const [ title, setTitle ] = useState("");
  const [ contents, setContents ] = useState(""); 
  
  // タイトル取得
  const onChangeTitle = (e) => {
    setTitle(e.target.value);
    console.log(title);
  }
  // ノートの内容を取得
  const onChangeContents = (values) => {
    setContents(values);    
    console.log(contents);
    // TODO データの登録・更新処理
  }
  // 一覧から取得したノートの内容は defaultValue にセット
  return (
    <>
      <EditorArea>
        <TitleArea onChange={onChangeTitle} placeholder="タイトル" value={ title } />
        <Editor 
          placeholder="何か入力してください" 
          defaultValue={contents} 
          onChange={onChangeContents}
        />
      </EditorArea>
    </>
  );
};

/**
 * 
 */
const GetList = () => {
  
  const onClick = (e) => {
    //TODO 一覧のタイトルをクリックして、内容を表示
    console.log(e.target.id);
    console.log(e.target.innerText);
    /*
    const postId = e.target.id;
    const title = e.target.innerText;    
    
    return { postId, title };
    */
  };

  return (
    <>
      <ul>
        {noteList.map(({postId, title}) => {
          return (<li id={postId} onClick={onClick}>{title}</li>)
        })}
      </ul>
    </>
  );
};

const noteList = [
  {     
    postId: "1", 
    title: "ノート1",    
    contents: "# Hello World",
  },
  {
    postId: "2",
    title: "ノート2",  
    contents: "# 今日やることリスト",
  },
  {
    postId: "3",
    title: "ノート3",
    contents: "# テストだよ",
  },
  {
    postId: "4",
    title: "ノート4",
    contents: "サンプルです。",
  }
];


const EditorArea = styled.div`
  margin: 30px;
`;


const TitleArea = styled.input`
  width: 600px;
  font-size: 24px;
  border: none;
`;

// ID editor を追加
// Error: Target Container is not a DOM Element 
const editorRoot = createRoot(document.getElementById("editor"));
editorRoot.render(<Note />);
const navRoot = createRoot(document.getElementById("nav"));
navRoot.render(<GetList />);

//reactDOM.render(<Note />, document.getElementById("editor"));
//reactDOM.render(<GetList />, document.getElementById("nav"));