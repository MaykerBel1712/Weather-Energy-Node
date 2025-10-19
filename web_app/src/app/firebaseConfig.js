// Importar Firebase
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyADKMpJWBlT8VtQbGcQ7II07ufsBrCLpl4",
    authDomain: "prueba-74889.firebaseapp.com",
    databaseURL: "https://prueba-74889-default-rtdb.firebaseio.com",
    projectId: "prueba-74889",
    storageBucket: "prueba-74889.appspot.com",
    messagingSenderId: "348761305785",
    appId: "1:348761305785:web:6887e9374787c899246168",
    measurementId: "G-64192M2X0B"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export {database};