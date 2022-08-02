import React from "react";
import { createRoot } from "react-dom/client";
import { Note } from "./Note/Note";
import { NoteList } from "./NoteList/NoteList";

// エディタ
const editorRoot = createRoot(document.getElementById("editor"));
editorRoot.render(<Note />);

// 一覧
const listRoot = createRoot(document.getElementById("nav"));
listRoot.render(<NoteList />);

