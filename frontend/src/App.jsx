import { Signin } from './Auth/Signin';
import { Note } from "./Note/Note";
import { NoteList } from "./NoteList/NoteList";
import { useContext } from 'react';
import { AuthContext } from './Providers/AuthProvider';
import styled from 'styled-components';

export const App = () => {
  const { user } = useContext(AuthContext)

  // 初回useEffectでaccessTokenをサーバー側で認証する
  // アクセストークンがあればOKとする。AuthContextでlocalStorageに保管する
  /*
  if (!user.accessToken) {
    return <Signin />
  } else {
    return (
      <NoteContainer>
        <NavigationContainer>
          <div className="logo">
            Cloud Note App
          </div>
          <nav id="nav">        
            <NoteList />
          </nav>
        </NavigationContainer>        
        <div className="editor-container">
          <Note />
        </div>
      </NoteContainer>
    );  
  } 
  */
  return (
    <NoteContainer>
      <NavigationContainer>
        <div className="logo">
          Cloud Note App
        </div>
        <nav id="nav">        
          <NoteList />
        </nav>
      </NavigationContainer>        
      <div className="editor-container">
        <Note />
      </div>
    </NoteContainer>
  );  
}

const NoteContainer = styled.div`
  display: grid;
  grid-template-columns: 300px auto;
`

const NavigationContainer = styled.div`
  height: 100vh;
  resize: horizontal;
  overflow: hidden;
  border-right: solid 1px;  
`
