import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            studentname : "",
            studentID : "",
            department: "",
            authFlag : false,
            isDisabled:true
        }
        //Bind the handlers to this class
        this.studentnameChangeHandler = this.studentnameChangeHandler.bind(this);
        this.studentIDChangeHandler = this.studentIDChangeHandler.bind(this);
        this.departmentChangeHandler = this.departmentChangeHandler.bind(this);
        this.submitStudentInfo = this.submitStudentInfo.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            authFlag : false
        })
    }
    //username change handler to update state variable with the text entered by the user
    studentnameChangeHandler = (e) => {
        this.setState({
            studentname : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    studentIDChangeHandler = (e) => {
        this.setState({
            studentID : e.target.value
        })
    }
    departmentChangeHandler = (e) => {
        this.setState({
            department : e.target.value
        })
    }
    // if(this.state.studentname!="" && this.state.studentID!="" && this.state.department!="") {
    //     this.setState({
    //         isDisabled:true
    //       })
    //     }
    submitStudentInfo = (e) => {
         let redirectVar = null;
        //prevent page from refresh
        e.preventDefault();
        const data = {
            studentname : this.state.studentname,
            studentID : this.state.studentID,
            department : this.state.department
        }
        if(this.state.studentname=="" || this.state.studentID=="" || this.state.department=="") {
           alert("Form is not filled");
        }
        else {
            
        console.log("studentName",data.studentname);
        console.log("studentID",data.studentID);
        console.log("department",data.department);
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/home',data)
            .then(response => {
                    console.log(data); 
                    this.setState({
                        authFlag : true
                    })        
            });
        }
    }
    
    render() {
       let redirectVar = null;
         if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        }
          if(this.state.authFlag) {
            redirectVar = <Redirect to= "/userReport"/>
        }
        return(
            
           <div className="wrapper">{redirectVar}
        <div className="form">
        <form className="homeForm">
            
            <div className="form-group col-lg-12">
                <input onChange = {this.studentnameChangeHandler} type="text" className="form-control col-lg-5" placeholder="Student Name" name="Studentname" required></input>
            </div>
            <div className="form-group col-lg-12">
                <input onChange = {this.studentIDChangeHandler} type="text" className="form-control" placeholder="Student ID" name="studentID" required></input>
            </div>
            <div className="form-group col-lg-12">
                <input onChange = {this.departmentChangeHandler} type="text" className="form-control" placeholder="Department" name="department" required></input>
            </div>
            <div className="center-block">
            <button type="reset" value="reset" id="reset" className="btn btn-primary">Reset</button>
            <button disabled={!this.state.isDisabled} onClick = {this.submitStudentInfo} type="submit" value="Add a User" id="addUser" className="btn btn-primary">Submit</button>
            </div>
        </form>
        </div>
        </div>)
   }
}
export default Home;
