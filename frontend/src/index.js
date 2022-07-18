import React from "react";
import reactDOM from "react-dom";
import Editor from "rich-markdown-editor";


function App () {
  return (
    <>
      <h1>Cloud Note Application</h1>
      <Editor />
    </>
  );
};

const root = document.getElementById("root");
reactDOM.render(<App />, root);