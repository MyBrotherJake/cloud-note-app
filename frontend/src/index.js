import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { AuthProvider } from './Providers/AuthProvider';
import { ShowNoteProvider } from "./Providers/ShowNoteProvider";

const root = createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <ShowNoteProvider>
      <App />
    </ShowNoteProvider>
  </AuthProvider>
)
