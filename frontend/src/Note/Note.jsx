import { NoteTitle } from "./NoteTitle";
import { NoteBody } from "./NoteBody";
import { DeleteNoteButton } from "./DeleteNoteButton";

export const Note = () => {
  
  return (      
    <>
      <DeleteNoteButton />
      <NoteTitle />               
      <NoteBody />             
    </>
  );  
};