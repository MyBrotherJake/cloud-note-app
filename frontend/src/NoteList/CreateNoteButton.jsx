import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import { ShowNoteContext } from "../Providers/ShowNoteProvider";
import { CreateNote } from "../Note/CreateNote";
import { Box } from '@mui/system';

export const CreateNoteButton = () => {

  const { setNote, notesList, setNotesList } = useContext(ShowNoteContext);  
  // ノート新規作成処理
  const onClickCreate = CreateNote(setNote, notesList, setNotesList);  
  
  return (
    <Box sx={{ width: 50 }}>
      <DocumentPlusIcon onClick={onClickCreate} cursor='pointer' />
    </Box>
  )
};