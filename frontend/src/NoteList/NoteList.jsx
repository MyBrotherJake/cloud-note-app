import axios from "axios";
import { NoteListItems } from "./NoteListItems";

export const NoteList = () => {  
  let resData = "";
  // APIへの通信
  const instance = axios.create({
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE",
      "Access-Control-Allow-Headers": "Content-Type",
    }      
  });
  instance.get("/notes").then(res => {    
    // Without Folder
    const notesWithoutFolder = res.data["notesWithoutFolder"].map(({id, title}) => {
      return (
        <li id={id} key={id}>{title}</li>
      );
    });
    // With Folder
    const folders = res.data["folders"].map(({id, name, notes}) => {
      return (
        <li key={id} id={id}>
          {name}
          {
            notes.map(({id, title}) => {            
              return (
                <ul>
                  <li id={id} key={id}>{title}</li>
                </ul>
              );              
            }) 
          }          
        </li>
      );
    });
    resData = folders.concat(notesWithoutFolder);
    
  });  
  
  return (
    <>
      <ul>
        <NoteListItems resData={resData} />
      </ul>
    </>
  );
};