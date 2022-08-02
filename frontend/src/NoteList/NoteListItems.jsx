/**
 * ノート一覧表示
 */
 export const NoteListItems = () => {

  /**
   * こういうのを作りたい
   * 
   * <ul>
   *  <li> 
   *    Folder 1
   *    <ul>
   *      <li> Note 4 </li>      
   *      <li> Note 5 </li>
   *      <li> Note 6 </li>
   *    </ul> 
   *  </li>
   *  <li>
   *    Folder 2
   *    <ul>
   *      <li> Note 7 </li>      
   *      <li> Note 8 </li>   
   *    </ul> 
   *  </li>
   *  <li>Note 1</li>
   *  <li>Note 2</li>
   *  <li>Note 3</li>
   * </ul>
   */
  
  /**
   * 配列が分かれてない場合
   */  

  /**
   * フォルダの有無で分ける
   * 後でジョインする
   */

  // フォルダなし
  const notFolder = dummyNotes.map(({noteId, title, body, folderId}) => {    
    if (folderId === "0") {
      return (
        <li key={noteId}>{title}</li>
      );
    }         
  });
  // フォルダあり
  const withFolder  = dummyFolder.map(({folderKey, folderName}) => {
    return (
      <li key={folderKey}>
        {folderName}
        {
          dummyNotes.map(({noteId, title, body, folderId}) => {
            if (folderKey === folderId && folderId != "0") {
              return (
                <ul>
                  <li key={noteId}>{title}</li>
                </ul>
              );              
            } 
          })
        }
      </li>
    );
  });  
  // Join
  const notesList = withFolder.concat(notFolder);

  return (
    <>
      <ul>
        {notesList}
      </ul>        
    </>          
  );   
};

// ダミーデータ
// ノート一覧
const dummyNotes = [
  {
    noteId: "1",
    title: "NoteTitle 1",
    body: `# NoteBody from NoteTitle 1
      ## Dummy Text
      Lorem ipsum dolor sit amet, 
      consectetur adipiscing elit, 
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
      Ut enim ad minim veniam, 
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
      Excepteur sint occaecat cupidatat non proident, 
      sunt in culpa qui officia deserunt mollit anim id est laborum.    
    `,
    folderId: "0",    
    folderName: "",
  },
  {
    noteId: "2",
    title: "NoteTitle 2",
    body: `# NoteBody from NoteTitle 2    
      ## Lorem ipsum dolor sit amet, 
      * consectetur adipiscing elit, 
      * sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
      * Ut enim ad minim veniam, 
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
      Excepteur sint occaecat cupidatat non proident, 
      sunt in culpa qui officia deserunt mollit anim id est laborum.    
    `,
    folderId: "0",    
    folderName: "",
  },
  {
    noteId: "3",
    title: "タイトル 3",
    body: `# 本文 3
      ** Lorem ipsum dolor sit amet, ** 
      ** consectetur adipiscing elit, **
      # sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
      Ut enim ad minim veniam, 
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
      Excepteur sint occaecat cupidatat non proident, 
      sunt in culpa qui officia deserunt mollit anim id est laborum.    
    `,
    folderId: "0",    
    folderName: "",
  },
  {
    noteId: "4",
    title: "NoteTitle 4",
    body: `     
    `,
    folderId: "1",    
    folderName: "FolderName 1",
  },
  {
    noteId: "5",
    title: "",
    body: "# 吾輩はねこである",
    folderId: "1",    
    folderName: "FolderName 1",
  },
  {
    noteId: "6",
    title: "NoteTitle 6",
    body: `
      ## Dummy Text
      * datat non proident, *
      ** sunt in culpa qui officia deserunt mollit anim id est laborum.**
    `,
    folderId: "1",    
    folderName: "FolderName 1",
  },
  {
    noteId: "7",
    title: "NoteTitle 7",
    body: "# NoteBody from NoteTitle 7",
    folderId: "2",    
    folderName: "フォルダ 2",
  },
  {
    noteId: "8",
    title: "NoteTitle 8",
    body: "## NoteBody from NoteTitle 8",
    folderId: "2",    
    folderName: "フォルダ 2",
  },
];
// フォルダ
const dummyFolder = [
  {
    folderKey: "1",
    folderName: "FolderName 1",
  },
  {
    folderKey: "2",
    folderName: "フォルダ 2",
  },
];
