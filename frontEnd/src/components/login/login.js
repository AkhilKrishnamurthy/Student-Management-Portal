import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            username : "",
            password : "",
            authFlag : false
        }
        //Bind the handlers to this class
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            authFlag : false
        })
    }
    //username change handler to update state variable with the text entered by the user
    usernameChangeHandler = (e) => {
        this.setState({
            username : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }
    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            username : this.state.username,
            password : this.state.password
        }
        if(data.username=="" || data.password =="")  {
            alert("Provide login details");
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/login',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    this.setState({
                        authFlag : true
                    })
                }else{
                    this.setState({
                        authFlag : false
                    })
                }
            });
    }


    render() {
         //redirect based on successful login
         let redirectVar = null;
         if(cookie.load('cookie')){
             console.log("redirecting");
             redirectVar = <Redirect to= "/home"/>
         }
        return(
            <div>
                {redirectVar}
            <div className="wrapper">
    <div className="form"> 
        
            <div className="form-group col-lg-5">
              <label htmlFor="username">USERNAME</label>
              <input onChange = {this.usernameChangeHandler} type="text" className="form-control" placeholder="Enter username" name="username" required></input>
            </div>
            <div className="form-group col-lg-5">
              <label htmlFor="pwd">PASSWORD:</label>
              <input onChange = {this.passwordChangeHandler} type="password" className="form-control" placeholder="Enter password" name="password" required></input>
            </div>
            <button onClick = {this.submitLogin} type="submit" className="btn btn-primary">Submit</button>
</div>
</div>
</div>)
    }
}

export default Login;