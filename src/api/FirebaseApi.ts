// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import * as storage from 'firebase/storage'
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCP4P9bEU26SrRc4YrzcXxfxQ-nGeFcTlM',
  authDomain: 'vuuservis.firebaseapp.com',
  projectId: 'vuuservis',
  storageBucket: 'vuuservis.appspot.com',
  messagingSenderId: '89311582585',
  appId: '1:89311582585:web:9af2ae8af73e2c89a377a8',
  measurementId: 'G-6HPK5R4QZJ'
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
storage.getStorage(firebaseApp)

export { firebaseApp, storage }
