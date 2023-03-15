import { NoteTitle } from "./NoteTitle";
import { NoteBody } from "./NoteBody";
import { DeleteNoteButton } from "./DeleteNoteButton";
import { SelectFolder } from "./SelectFolder";
import styled from "styled-components";
import { useContext } from "react";
import { ShowNoteContext } from "../Providers/ShowNoteProvider";

export const Note = () => {
  
  const { notesList, setNotesList, note, setNote } = useContext(ShowNoteContext);

  return (      
    <> 
      <OptionArea>   
        <SelectFolder />             
        <DeleteNoteButton />        
      </OptionArea>
      <NoteTitle notesList={notesList} setNotesList={setNotesList} note={note} setNote={setNote} />               
      <NoteBody notesList={notesList} setNotesList={setNotesList} note={note} setNote={setNote} />             
    </>
  );
  
 /*
  return (      
    <> 
      <OptionArea>   
        <SelectFolder />             
        <DeleteNoteButton />        
      </OptionArea>
      <NoteTitle />               
      <NoteBody />             
    </>
  );
  */

};

const OptionArea = styled.div`
  width: 200px;
  height: 30px;
  display: flex;  
  margin-left: auto;
`;
