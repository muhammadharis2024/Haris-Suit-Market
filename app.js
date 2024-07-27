document.addEventListener('DOMContentLoaded', () => {
    // Tab switching
    const tabs = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');

            tabs.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === targetTab) {
                    content.classList.add('active');
                }
            });

            tab.classList.add('active');
        });
    });

    // Form submission handling
    // const loginForm = document.getElementById('login-form');
    // const signupForm = document.getElementById('signup-form');

    // if (loginForm) {
    //     loginForm.addEventListener('submit', (event) => {
    //         event.preventDefault();
    //         const username = loginForm.username.value;
    //         const password = loginForm.password.value;
    //         console.log('Login:', { username, password });
    //         // Here you would send login data to your server
    //         // Example: fetch('/login', { method: 'POST', body: JSON.stringify({ username, password }) })
    //     });
    // }

    // if (signupForm) {
    //     signupForm.addEventListener('submit', (event) => {
    //         event.preventDefault();
    //         const username = signupForm.username.value;
    //         const email = signupForm.email.value;
    //         const password = signupForm.password.value;
    //         console.log('Sign Up:', { username, email, password });
    //         // Here you would send signup data to your server
    //         // Example: fetch('/signup', { method: 'POST', body: JSON.stringify({ username, email, password }) })
    //     });
    // }

    // Tab link click handling
    const tabLinks = document.querySelectorAll('.tab-link');
    tabLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetTab = link.getAttribute('data-tab');
            const targetButton = document.querySelector(`.tab-button[data-tab="${targetTab}"]`);
            if (targetButton) {
                targetButton.click();
            }
        });
    });
});


// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB3OjBd2oN3458_JqpkQthk15bkIDZBXBE",
    authDomain: "website-8e364.firebaseapp.com",
    projectId: "website-8e364",
    storageBucket: "website-8e364.appspot.com",
    messagingSenderId: "1093900744922",
    appId: "1:1093900744922:web:8ea6704c06e6e2a9550de3",
    measurementId: "G-KMQHPGVEDS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);



let userName = document.getElementById("signup-username")
let email = document.getElementById("signup-email")
let password = document.getElementById("signup-password")
let loginEmail = document.getElementById("login-email")
let loginPassword = document.getElementById("login-password")
// let signup = document.getElementById("signup")


window.signUpFunc = function () {
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            if (user) {
                window.location.href = "/";
                console.log(user.uid);
            } else {
                window.location.href = "/pages/auth.html";
                console.log("signed out");
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    // onAuthStateChanged(auth, (user) => {
    // });
}

window.loginFunc = function () {
    signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            if (user) {
                window.location.href = "/";
                console.log(user.uid);
            } else {
                window.location.href = "/pages/auth.html";
                console.log("signed out");
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
}


window.signOutFunc = function () {
    signOut(auth).then(() => {
        // Sign-out successful.
        alert("Signed out!")
    }).catch((error) => {
        // An error happened.
        console.log(error);
    });
    onAuthStateChanged(auth, (user) => {
        if (user) {
            window.location.href = "/";
            console.log(user.uid);
        } else {
            window.location.href = "/pages/auth.html";
            console.log("signed out");
        }
    });
}
// signup.addEventListener("click", signUpFunc)

