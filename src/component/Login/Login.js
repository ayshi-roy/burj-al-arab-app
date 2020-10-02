import React, { useContext } from 'react';

import Button from '@material-ui/core/Button';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

//for meterial button


const Login = () => {    
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
    
    const handleGoogolSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then(function(result) {
            const {displayName, email} = result.user;         
            const signedInUser = {name: displayName, email}
            setLoggedInUser(signedInUser);
            storeAuthTokon();
            history.replace(from); 
            console.log(signedInUser);
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
    }
    
    const storeAuthTokon = () => {
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
        .then(function(idToken) {
            sessionStorage.setItem('token', idToken);
            // Send token to your backend via HTTPS
            // ...
          }).catch(function(error) {
            // Handle error
          });
        // firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
        // .then(function(idToken) {
        //   sessionStorage.setItem('token', idToken);
        //   // Send token to your backend via HTTPS
        //   // ...
        // }).catch(function(error) {
        //   // Handle error
        // });
    }
    return (
        <div>
            <h1>This is log in</h1>
           <Button onClick={handleGoogolSignIn}>Styled with Hook API</Button> 
        </div>
    );
};

export default Login;