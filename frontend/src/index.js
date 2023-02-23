import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { ShowNoteProvider } from "./Providers/ShowNoteProvider";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(  
  <ShowNoteProvider>
    <App />        
  </ShowNoteProvider>
);


