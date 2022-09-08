import React, { useContext, useEffect, useState } from 'react'
import { GoogleLogin } from 'react-google-login'
import { AuthContext } from '../Providers/AuthProvider'
import axios from 'axios'
import styled from 'styled-components'
import { gapi } from 'gapi-script'

export const Signin = () => {
  const { setUser } = useContext(AuthContext)
  const [authClientId, setAuthClientId] = useState()
  
  useEffect(() => {
    const getAuthClientId = async () => {
      const { data } = await axios.get('/auth/client')
      setAuthClientId(data)
      // react-google-loginが新しいSDKに対応していない
      // https://github.com/anthonyjgrove/react-google-login/issues/536
      gapi.load('client:auth2', () => {
        gapi.client.init({
          clientId: data,
          plugin_name: 'cloud-note-app',
        })
      })
    }
    getAuthClientId()
  }, [])

  const handleSuccess = async (res) => {
    if (!('accessToken' in res)) {
      alert('ログインに失敗しました')
      return
    }

    const { data } = await axios.post('/auth', {
      token: res.accessToken
    })

    setUser({
      id: data.id, 
      name: data.name,
      email: data.email,
      accessToken: res.accessToken
    })
  }

  const handleFailure = (res) => {
    console.log(res)
    alert('sign in failure with your google account')
  }

  return (
    <Container>
      <LoginBox>
        {authClientId &&
          <GoogleLogin 
            clientId={authClientId}
            buttonText="Login"
            onSuccess={handleSuccess}
            onFailure={handleFailure}
            cookiePolicy={'single_host_origin'}
          />
        }
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