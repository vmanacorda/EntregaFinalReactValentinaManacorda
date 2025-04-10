// firebaseconfig.js

// Importa los módulos de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA0PUJ_x2-3_GWK5uia5ySoTmFgiISlowA",
  authDomain: "react2-be39e.firebaseapp.com",
  projectId: "react2-be39e",
  storageBucket: "react2-be39e.firebasestorage.app",
  messagingSenderId: "326617489288",
  appId: "1:326617489288:web:d8ad38a29c0ab93128243d"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
const db = getFirestore(app);

// Exporta las funciones y la app
export { app, db, collection, addDoc };
