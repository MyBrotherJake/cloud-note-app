import React, { useContext } from 'react'
import { GoogleLogin } from 'react-google-login'
import { AuthContext } from '../Providers/AuthProvider'

const CLIENT_ID = process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID

export const Signin = () => {
  const { user, setUser } = useContext(AuthContext)

  const handleSuccess = (res) => {
    if ('accessToken' in res) {
      setUser({
        email: res.profileObj.email,
        accessToken: res.accessToken
      })
    }
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
