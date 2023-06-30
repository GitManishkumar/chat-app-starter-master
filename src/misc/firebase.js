import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/database'

const config={
  apiKey: "AIzaSyAj8nbNRSURd4B7Qt16AzJk-FEgD3riS88",
  authDomain: "chat-web-app-dc01a.firebaseapp.com",
  projectId: "chat-web-app-dc01a",
  storageBucket: "chat-web-app-dc01a.appspot.com",
  messagingSenderId: "92231751385",
  appId: "1:92231751385:web:3d0694d3ca10aa68ad90c8"
};

const app=firebase.initializeApp(config)
export const auth=app.auth()
export const database=app.database()