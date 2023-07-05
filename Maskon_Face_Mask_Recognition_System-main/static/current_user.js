import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
    import { getAuth ,onAuthStateChanged,signOut} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
    import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
    var firebaseConfig = {
    apiKey: "AIzaSyAnmorM4fVspYLwyB2oBLlp6Pvo09Qmkdo",
    authDomain: "login-db-bd13b.firebaseapp.com",
    projectId: "login-db-bd13b",
    storageBucket: "login-db-bd13b.appspot.com",
    messagingSenderId: "476183715653",
    appId: "1:476183715653:web:dd60bf70e8f91f4922e82c"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    const dbRef = ref(getDatabase());
get(child(dbRef, `users/${uid}`)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val().name);
    document.getElementById('username').innerHTML= snapshot.val().name;
  } else {
    console.log("No data available");
    
  }
}).catch((error) => {
  console.error(error);
});
    
    // ...
  } else {
    // User is signed out
    // ...
  }
});

logout.addEventListener('click',(e)=>{
    signOut(auth).then(() => {
        // Sign-out successful.
        
        alert("Logged out");
        window.location="/";
        
      }).catch((error) => {
        // An error happened.
        const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      });
});
 