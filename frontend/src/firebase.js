import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAxzVqo0vq5ovRt5oS9WE9CZHfLrxID9BE",
  authDomain: "cloud-note-app-1afc3.firebaseapp.com",
  projectId: "cloud-note-app-1afc3",
  storageBucket: "cloud-note-app-1afc3.appspot.com",
  messagingSenderId: "727543404031",
  appId: "1:727543404031:web:69e14cd1b4713062f6c3ca"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
