import { Note } from "./Note/Note";
import { NoteList } from "./NoteList/NoteList";

export const App = () => {
  return (
    <>
    <div className="navigation-container">
      <div className="logo">
        Cloud Note App
      </div>
      <nav id="nav">        
        <NoteList />
      </nav>
    </div>
    
    <div className="editor-container">
      <Note />
    </div>
    </>
  );
};