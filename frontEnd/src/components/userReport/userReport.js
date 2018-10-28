import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';


class userReport extends Component{

    constructor() {
        super();
        this.state = {
            books: [],
            authFlag : false
                }
    }
    componentWillMount(){
        this.setState({
            authFlag : false
        })
    }
    componentDidMount() {
        axios.get('http://localhost:3001/userReport')
                .then((response) => {
                    console.log(response);
                this.setState({
                    books : this.state.books.concat(response.data)
                });
            });
    }
      handleRemoveSpecificRow = (idx) => (event) => {   
        event.preventDefault();
          var data = {
              "id": idx
          };
          console.log(idx);
        const books = [...this.state.books]
        books.splice(idx, 1);
        this.setState({ 
            books : books
        });
        
         console.log(data);
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/userReport',data)
           .then(response => {
            this.setState({
                authFlag : true
            })  
           });
      }

    render() {
        let redirectVar = null;
         if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        }
         if(this.state.authFlag){
             console.log("redirecting");
             redirectVar = <Redirect to= "/home"/>
         }
        return(
            <div className="wrapper">{redirectVar}
        <div className="form">
         <table className="table col-sm-6 userReportTable">
            <thead>
            <tr>
                <th>Name</th>
                <th>Student ID</th>
                <th>Department</th>
                <th></th>
            </tr>
            </thead>
             <tbody>
            {this.state.books.map((book,idx) => (
            <tr id="addr0" key={idx}>
            <td name="name" value={this.state.books[idx].Name}>{this.state.books[idx].Name}</td>
            <td value={this.state.books[idx].studentID}>{this.state.books[idx].studentID}</td>
            <td value={this.state.books[idx].Department}>{this.state.books[idx].Department}</td>
            <td><Link to="/home"><input type="submit" className="deleteSubmit" onClick={this.handleRemoveSpecificRow(this.state.books[idx].studentID)} value="delete" name="<%= i %>"/></Link></td>
        </tr>



            ))}</tbody>
        </table>
         </div>
         </div>)
    }
}
export default userReport;