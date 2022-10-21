import { TrashIcon } from "@heroicons/react/24/solid"
import styled from "styled-components";

export const DeleteNoteButton = () => {

  return (
    <>
      <TrashArea>
        <TrashIcon />
      </TrashArea>
    </>
  );
};

const TrashArea = styled.div`
  display: flex;
  width:20px;
  height: 20px;
`;