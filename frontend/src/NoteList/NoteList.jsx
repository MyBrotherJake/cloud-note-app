import {useState, useEffect} from "react";
import axios from "axios";
import { NoteListItems } from "./NoteListItems";
/**
 * ノート一覧の表示
 */
export const NoteList = () => {  
  
  const [ data, setData ] = useState("");
  // 再描画の制御に useEffectを使う
  useEffect(() => {
    // axios でAPIに通信
    const instance = axios.create({
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE",
        "Access-Control-Allow-Headers": "Content-Type",
      }      
    });
    // ノート一覧APIにアクセス
    instance.get("/notes").then(res => {            
      // 取得した値でステートを更新
      setData(res.data);      
    });            
  },[]);  
  
  return (
    <>
      <ul>
        <NoteListItems notesData={data} />
      </ul>
    </>
  );     
};