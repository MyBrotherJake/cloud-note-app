import { NoteTitle } from "./NoteTitle";
import { NoteBody } from "./NoteBody";
import { DeleteNoteButton } from "./DeleteNoteButton";
import { SelectFolder } from "./SelectFolder";
import styled from "styled-components";

export const Note = () => {
 
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
};

const OptionArea = styled.div`
  width: 200px;
  height: 30px;
  display: flex;  
  margin-left: auto;
`;
