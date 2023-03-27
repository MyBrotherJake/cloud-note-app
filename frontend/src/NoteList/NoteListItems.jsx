import { Fragment, useContext, useState } from "react";
import axios from "axios";
import { FolderMinusIcon, FolderPlusIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';

import { ShowNoteContext } from "../Providers/ShowNoteProvider";
import { FolderName } from "./UpdateFolderName";
import { DeleteFolderButton } from "./DeleteFolderButton";
import { ListItemIcon } from '@mui/material';
/**
 * リスト作成
 */
export const NoteListItems = () => {  
  
  const { setNote, notesList, folders, setFolders } = useContext(ShowNoteContext);    
  // 削除アイコンの表示を管理する
  const [ isDisplay, setIsDisplay ] = useState({
    folderId: "", 
    isDisplay: false
  });      
  // Icon Style  
  const iconStyle = {
    "width": "22px",
    "height": "22px",        
  };    
  // Icon DisplayStyle
  const display = {
    "width": "20px",
    "height": "20px",        
    "display": "inline",
  }
  const notDisplay = {
    "width": "20px",
    "height": "20px",        
    "display": "none",
  }
  // データが取得できない場合  
  if (!notesList) {   
    // 空のリストを返す
    return (
      <li></li>
    );
  };        
  /**
   * onClick時にAPI呼び出し
   */
  const onClickTitle = async (noteId) => {                
    // APIから詳細を取得        
    // GET
    const resNote = await axios.get(`/notes/${noteId}`);
    // タイトル, 内容 をセット
    const { title, content, folderId } = resNote.data;     
    // 現在選択されたノート
    setNote({ noteId, title, body: content, folderId });      
  };     
  /**
   * フォルダアイコン Clickイベント
   */
  const onClickFolder = (index) => {
    // フォルダの開閉フラグ
    folders[index]["isOpen"] = !folders[index]["isOpen"];
    // 再描画用配列
    const newFolders = folders.slice();    
    setFolders(newFolders);
  };
  /**
   * 削除アイコンの表示・非表示
   */
  const onMouseOver = (id) => {
    setIsDisplay({folderId: id, isDisplay: true})
  };
  const onMouseLeave = (id) => {
    setIsDisplay({folderId: id, isDisplay: false})
  };
  /**
   * -------------------------------------------------Create NoteList-------------------------------------------------------
   * notesList から配列を再加工して、最初にAPIから受け取ったオブジェクトの形にする
   */
  const notesWithoutFolder = notesList.map(({noteId, title, folderId, updatedAt}) => {
    if (folderId === null) {
      return ({id: noteId, title, folderId, updatedAt});      
    }  else {
      return undefined;
    }
  }).filter((element) => element);    

  const withFolder = folders.map(({folderId, folderName, createdAt}) => {
    const folderSubId = folderId;
    
    // 同一フォルダのノート配列を取得
    const newNotesList = notesList.filter(({folderId}) => folderId === folderSubId);
    // note 配列の生成
    const noteContents = newNotesList.map(({noteId, title, updatedAt}) => {
      return (              
        {
          "id": noteId,
          "title": title,
          "updatedAt": updatedAt
        }        
      );      
    }).filter(({id}) => id);

    return ({
      "id": folderId,
      "name": folderName,
      "createdAt": createdAt,
      "notes": noteContents
    });
  });    
  // Without Folder       
  // 更新日でソート後、リストを作成  
  const notesWithoutFolderList = notesWithoutFolder.sort((a, b) => {
    return (a.updatedAt < b.updatedAt) ? -1 : 1
  }).map(({id, title}) => {   
   return (
    <Fragment key={id}>
      <ListItemButton id={id} key={id} onClick={ () => onClickTitle(id) }>
        <ListItemIcon sx={{ minWidth: 28 }}>
          <DocumentTextIcon style={iconStyle} key={id} />
        </ListItemIcon>
        <ListItemText primaryTypographyProps={{ noWrap: true }}>
          {title}
        </ListItemText>
      </ListItemButton>     
    </Fragment>
   );
  });  
  // With Folder    
  // フォルダは作成日、ノートは更新日でそれぞれソート  
  const foldersList = withFolder.sort((a, b) => {
    return (a.createdAt < b.createdAt) ? -1 : 1
  }).map(({id, name, notes}) => {        
    // 対象フォルダのインデックス取得
    const index = folders.findIndex(({folderId}) => folderId === id);    
    // 検索に引っ掛からなかった場合    
    if (index === -1) {
      return (
        <Fragment key={id}></Fragment>
      );
    }    
      // フォルダアイコンを変更
    const FolderIcon = folders[index]["folderId"] === id && folders[index]["isOpen"] ? <FolderMinusIcon style={iconStyle} key={id} id={id} /> : <FolderPlusIcon style={iconStyle} key={id} id={id} />;                
    // 削除アイコンの表示・非表示
    const DeleteIcon = id === isDisplay["folderId"] && isDisplay["isDisplay"] ? <DeleteFolderButton folderId={id} iconStyle={display} /> : <DeleteFolderButton folderId={id} iconStyle={notDisplay}  />
    
    return (
      <Fragment key={id}>      
        <ListItemButton id={id} key={id} onClick={() => onClickFolder(index)} onMouseOver={() => onMouseOver(id)} onMouseLeave={() => onMouseLeave(id)} sx={{ pb: 0 }}>
          <ListItemIcon sx={{ minWidth: 28 }}>
            { FolderIcon }
          </ListItemIcon>
          <ListItemText>                    
            <FolderName folderId={id} folderName={name} />
          </ListItemText>
          { DeleteIcon }
        </ListItemButton>
        <Collapse in={folders[index]["isOpen"]} timeout="auto" unmountOnExit>
          <List component="div" disablePadding >        
            <ListItemButton sx={{ pl: 4, pt: 0 }} style={{display: 'inherit'}}>                                     
              {
                notes.sort((a, b) => {
                  return (a.updatedAt < b.updatedAt) ? -1 : 1
                }).map(({id, title}) => {
                  return (
                    <ListItemButton id={id} key={id} onClick={() => onClickTitle(id)} sx={{ pb: 0 }}>
                      <ListItemIcon sx={{ minWidth: 28 }}>
                        <DocumentTextIcon style={iconStyle} key={id} />
                      </ListItemIcon>
                      <ListItemText primaryTypographyProps={{ noWrap: true }}>
                        {title}
                      </ListItemText>                        
                    </ListItemButton>                     
                  );              
                })            
              }         
            </ListItemButton>
          </List>
        </Collapse>      
      </Fragment>
    );
  });  
  // Join With Folder + Without Folder
  const items = foldersList.concat(notesWithoutFolderList);
  

  return (
    <>
      { items }
    </>    
  );
}