import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAep_tnWFDaCoK1suBLuGO-c2BrJOV7cBI",
	authDomain: "db-cities-in-indonesia-by-osm.firebaseapp.com",
	databaseURL: "https://db-cities-in-indonesia-by-osm-default-rtdb.firebaseio.com",
	projectId: "db-cities-in-indonesia-by-osm",
	storageBucket: "db-cities-in-indonesia-by-osm.appspot.com",
	messagingSenderId: "21725985946",
	appId: "1:21725985946:web:1402966303039d1b323323"
};

// Initialize Firebase
const db = initializeApp(firebaseConfig);
export const database = getDatabase(db);

export default db