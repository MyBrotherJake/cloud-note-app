import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { ShowNoteProvider } from "./Providers/ShowNoteProvider";

const root = createRoot(document.getElementById("root"));
root.render(<ShowNoteProvider><App /></ShowNoteProvider>)

