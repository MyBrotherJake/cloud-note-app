import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import { ShowNoteContext } from "../Providers/ShowNoteProvider";
import { AuthContext } from "../Providers/AuthProvider";
import { CreateNote } from "../Note/SetNote";

export const CreateNoteButton = () => {

  const { setNote, notesList, setNotesList } = useContext(ShowNoteContext);
  const { user } = useContext(AuthContext);
  // ノート新規作成処理
  const onClickCreate = CreateNote(user, setNote, notesList, setNotesList);
  
  return (
    <DocumentPlusIcon onClick={onClickCreate} />
  )
};