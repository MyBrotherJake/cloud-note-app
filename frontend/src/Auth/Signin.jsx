import { GoogleAuthProvider } from 'firebase/auth'
import React, { useEffect } from 'react'
import { StyledFirebaseAuth } from 'react-firebaseui'
import styled from 'styled-components'
import { auth } from '../firebase'


export const Signin = () => {
  const setUserInLocalStorage = (data) => {
    const userData = {
      name: data.displayName,
      email: data.email,
      photo: data.photoURL
    }
    
    localStorage.setItem('user', JSON.stringify(userData))
  } 

  useEffect(() => {
    const unRegisterAuthObserver = auth.onAuthStateChanged(user => {
      if (user) setUserInLocalStorage(user)
    })

    return () => unRegisterAuthObserver()
  }, [])

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [GoogleAuthProvider.PROVIDER_ID],
    signInSuccessUrl: '/'
  }

  return (
    <Container>
      <LoginBox>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
      </LoginBox>
    </Container>
  )  
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const LoginBox = styled.div`
  width: 300px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ghostwhite;
`