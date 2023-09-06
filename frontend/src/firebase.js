// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import {getAuth} from 'firebase/auth'
import axios from "axios";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRu53lw3kXH-0uIc_7CmUSQzh3wUrnTUo",
  authDomain: "blog-7b28d.firebaseapp.com",
  projectId: "blog-7b28d",
  storageBucket: "blog-7b28d.appspot.com",
  messagingSenderId: "260494828728",
  appId: "1:260494828728:web:12fb90db6517fd08a9c04d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export {axios, auth, db, storage}