import app from 'firebase/app';
import 'firebase/firestore';
require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId
};

console.log(firebaseConfig);

if (!app.apps.length) {
  app.initializeApp(firebaseConfig);
}

const db = app.firestore();
export { db };
export default app;
