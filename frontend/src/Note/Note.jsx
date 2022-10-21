import { NoteTitle } from "./NoteTitle";
import { NoteBody } from "./NoteBody";
import { DeleteNoteButton } from "./DeleteNoteButton";
import styled from "styled-components";

export const Note = () => {
  
  return (      
    <>
      <DeleteButtonArea>
        <DeleteNoteButton />
      </DeleteButtonArea>
      <NoteTitle />               
      <NoteBody />             
    </>
  );  
};

const DeleteButtonArea = styled.div`
  width: 20px;
  height: 20px;
  display: flex;  
  margin-left: auto;
`;