import { Signin } from './Auth/Signin';
import { Note } from "./Note/Note";
import { NoteList } from "./NoteList/NoteList";
import { gapi } from 'gapi-script'
import { useContext } from 'react';
import { AuthContext } from './Providers/AuthProvider';

// react-google-loginが新しいSDKに対応していない
// https://github.com/anthonyjgrove/react-google-login/issues/536
gapi.load('client:auth2', () => {
  gapi.client.init({
      clientId: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
      plugin_name: 'cloud-note-app',
  });
});

export const App = () => {
  const { user } = useContext(AuthContext)

  // 初回useEffectでaccessTokenをサーバー側で認証する
  // アクセストークンがあればOKとする。AuthContextでlocalStorageに保管する

  return (
    <>
      {user.accessToken ?
        <div>
          <div className="navigation-container">
            <div className="logo">
              Cloud Note App
            </div>
            <nav id="nav">        
              <NoteList />
            </nav>
          </div>        
          <div className="editor-container">
            <Note />
          </div>
        </div>
        : 
        <Signin />
      }
    </>
  );
};