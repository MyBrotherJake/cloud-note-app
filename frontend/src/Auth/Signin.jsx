import React, { useContext } from 'react'
import { GoogleLogin } from 'react-google-login'
import { AuthContext } from '../Providers/AuthProvider'
import axios from 'axios'

const CLIENT_ID = process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID

export const Signin = () => {
  const { setUser } = useContext(AuthContext)

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
    <>
      <GoogleLogin 
        clientId={CLIENT_ID}
        buttonText="Login"
        onSuccess={handleSuccess}
        onFailure={handleFailure}
        cookiePolicy={'single_host_origin'}
      />        
    </>
  )
}
