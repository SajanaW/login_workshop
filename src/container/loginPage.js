import React, { Component } from 'react';


// import 'react-select/dist/react-select.css';
import './login.css'

//Example of how to import images from assets
import logo from '../Assets/imp-log.png'
import backdrop from '../Assets/banner.png'


class LoginPage extends Component {
    constructor(props){
        super(props)
        this.state = {
           email: "",
           password: "",
           displayName: "",
           error: "",
           login: true,
           user_dp: "https://i.imgur.com/n7NqNRA.png",
        };

        this.handleUser = this.handleUser.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.changeLoginState = this.changeLoginState.bind(this);
      }

    //Builds on setting the state from react work shop 1
    handleUser(event) {
        this.setState({email: event.target.value, error: ""});
    }

    handlePassword(event) {
        this.setState({password: event.target.value, error: ""});
    }

    handleName(event) {
        this.setState({displayName: event.target.value, error: ""});
    }


    //Passing functions around
    handleLogin(event){
        this.props.firebaseLogin(this.state, this.firebaseCallBack.bind(this));
    }

    handleSignup(event) {
        this.props.firebaseSignup(this.state, this.firebaseCallBack.bind(this));
        //We need to hear back?
    }

    firebaseCallBack(message){
        this.setState({error: message});
    }

    changeLoginState(){
        this.setState({login: !this.state.login});
    }

    loginCard(){
      return(
        <form className="flexCol" onSubmit={this.handleSubmit}>
            <div className="loginWidth">
                <input className="taskinput" placeholder="email"type="text" value={this.state.email} onChange={this.handleUser} />
                <input className="taskinput" placeholder="password" type="password" value={this.state.password} onChange={this.handlePassword} />
            </div>
                 <div id="errorMessage">{this.state.error}</div>
            <div onClick={this.handleLogin} className="flexRow flex-end"> <div className="addBtn flx-end"> Login </div> </div>
            <div onClick={this.changeLoginState} className="small-ud">Don't have an account? Sign up</div>
        </form>
      );
    }

    signUpCard(){
        return(
            <form className="flexCol" onSubmit={this.handleSubmit}>
                <div className="loginWidth">
                    <input className="taskinput" placeholder="Display Name" type="text" value={this.state.displayName} onChange={this.handleName} />
                    <input className="taskinput" placeholder="email" type="text" value={this.state.email} onChange={this.handleUser} />
                    <input className="taskinput" placeholder="password" type="password" value={this.state.password} onChange={this.handlePassword} />
                </div>
                <div id="errorMessage">{this.state.error}</div>
                <div onClick={this.handleSignup} className="flexRow flex-end"> <div className="addBtn flx-end"> Sign Up </div> </div>
            </form>
        );
    }

    render() {
        return (
           <div className= "flexRow height">
            <div className="loginBanner"><img className="bannerimg" src={backdrop}/></div>
            <div className="login flexCol justifyRow">
                <div><img className="logologin" src={logo}/></div>
              <div className="flexRow justifyRow">
              {this.state.login ?  this.loginCard():this.signUpCard() }
              </div>
            </div>
          </div>
        );
    }
}
export default LoginPage;