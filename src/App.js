import React, { Component } from 'react';
import {auth, database} from 'firebase';


import './App.css';
import { Switch, Route, withRouter, Redirect} from 'react-router-dom';
import LoginPage from './container/loginPage.js';

// import Base from './container/base.js';

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            userObj: {name:"error",user_dp:"error",email:"error" },
            cohorts: "",
            userLoggedIn: false,
        }

        this.createUser   = this.createUser.bind(this);

        //Tells react is we just signed in or not
        this.justSignedIn = false;
        this.justSignedOut = false;
        this.authSubscription = '';
    }

    componentDidMount(){
        //first get user presence
        this.authSubscription = this.trackUserPresence();
    }
    componentWillUnmount(){
        //Unsubscribe from the auth
        this.authSubscription()
    }


    /*Track Presence*/
    trackUserPresence() {
        let unsubscribe = auth().onAuthStateChanged(firebaseUser => {
            if(firebaseUser) {
                console.log('firebaseUser logged in');
                this.justSignedIn = true;
                this.setState({userLoggedIn:true})

            } else {
                console.log('firebaseUser logged out');
                this.justSignedOut = true;
                this.setState({userLoggedIn:false})
                
            }
        });
        return unsubscribe
    }

    /* Sign Up*/
    signUp(state, callback){
        let email = state.email;
        let password = state.password;
        let name = state.displayName;
        let image = state.user_dp;
        auth().createUserWithEmailAndPassword(email, password).then(function() {
            this.createUser({
                name: name,
                email: email,
                dp: image,
            });

        }.bind(this), function(error) {
            callback(error.message)
        }.bind(this));
    }

    /*Create User*/
    createUser(userObject){
        //Create User
        let updates = {};
        updates['/users/' + auth().currentUser.uid] = userObject;

        database().ref().update(updates).catch((err) => {
            console.log('Data could not be saved. ' + err);
        });
    }

    /*Sign out*/
    signOut() {
        auth().signOut().then(function() {
            console.log('User Signed Out');
        }.bind(this), function(error) {
            console.log('Sign Out Error', error);
        }.bind(this));
    }

    /*Sign In*/
    signIn(state, callback){
        let email = state.email;
        let password = state.password;
        auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            callback(error.message)
        }.bind(this));
    }



    render() {
        if(this.justSignedIn){
            this.justSignedIn = false
            return(<Redirect to='/loggedIn' />);
        }  

        if (this.justSignedOut){
            this.justSignedOut = false
            return(<Redirect to='/' />);
        }      

        return (
            <div>
                <Switch>
                    <Route  exact path='/' component={(props) => <LoginPage {...props} firebaseLogin={this.signIn.bind(this)}  firebaseSignup={this.signUp.bind(this)} cohorts={this.state.cohorts}/>}/>
                    <Route exact path='/loggedIn/' component={(props) => <div onClick={this.signOut}>Welcome to logged in page</div>}/>
                </Switch>
            </div>
        );
    }
}

export default withRouter(App);