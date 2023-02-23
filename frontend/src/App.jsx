import { Signin } from './Auth/Signin';
import { Note } from "./Note/Note";
import { NoteList } from "./NoteList/NoteList";
import { useEffect, useState } from 'react';
import styled from 'styled-components';

export const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const data = localStorage.getItem('user')
    if (data) setUser(data)
  }, [user])

  if (!user) {
    return (<Signin />)
  }

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
