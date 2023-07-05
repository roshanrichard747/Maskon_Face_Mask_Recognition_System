
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword ,signInWithEmailAndPassword,onAuthStateChanged,signOut} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
  import { getDatabase,set,ref,update } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
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
  
  
  signup.addEventListener('click',(e)=>{

    var name = document.getElementById('name').value
    var email = document.getElementById('email').value
    var password = document.getElementById('Password').value
    var con_password = document.getElementById('con-Password').value
if(password==con_password){
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    set(ref(database,'users/'+user.uid),{
        username:email,
        name:name,
    })
    alert('user created')
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
    // ..
  });
}
else{
  alert("Password not matched")
}
   
 

  });

login.addEventListener('click',(e)=>{
    var email = document.getElementById('email').value
    var password = document.getElementById('Password').value
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      const dt =new Date();
      update(ref(database,'users/'+user.uid),{
        last_login:dt,
        
        
    })
    alert("user logged in");
    
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
    
    
}); 


logout.addEventListener('click',(e)=>{
    signOut(auth).then(() => {
        // Sign-out successful.
        window.location="/";
        alert("Logged out");
        
      }).catch((error) => {
        // An error happened.
        const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      });
});

const user = auth.currentUser;
onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      
       window.location="/home";
        
      // ...
    } else {
      
      // User is signed out
      // ...
    }
  });