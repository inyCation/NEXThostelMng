import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDdVOxsSybsftR6cDxyTOigSv8mdP78VPE",
  authDomain: "hostelo-ef086.firebaseapp.com",
  projectId: "hostelo-ef086",
  storageBucket: "hostelo-ef086.appspot.com",
  messagingSenderId: "999510208842",
  appId: "1:999510208842:web:735dced5f0d12ee84f91b3",
  measurementId: "G-KF4T46XKKM"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const storage = getStorage(app)

export {storage}