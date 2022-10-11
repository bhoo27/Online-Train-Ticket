import axios from "axios";
import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";


export const FIRSTNAME = "FIRSTNAME";
export const LASTNAME = "LASTNAME";
export const GENDER= "GENDER";
export const NOOFTICKETS = "NOOFTICKETS";
export const PASSENGER_ID = "PASSENGER_ID"

class PassengerDetails extends Component {
  constructor(props) {
    super(props);

    this.checkfirstName = this.checkfirstName.bind(this);
    this.checklastName = this.checklastName.bind(this);
    this.checkgender=this.checkgender.bind(this);
    this.checkTickets = this.checkTickets.bind(this);
    this.storeDetails = this.storeDetails.bind(this);

  
    this.state = {
    
      
      firstName: "",
      lastName: "",
      gender:"",
      nooftickets: ""
    };
  }
  

  checkfirstName(e) {
    var fNList = document.getElementById("fNList").value;
    this.setState({
      firstName: e.target.value
    });
    console.log("firstName : " + fNList);
  }
  checklastName(e) {
    var lNList = document.getElementById("lNList").value;
    this.setState({
      lastName: e.target.value
    });
    console.log("lastName : " + lNList);
  }
  checkgender(e) {
    var gList = document.getElementById("gList").value;
    this.setState({
      gender: e.target.value
    });
    console.log("gender : " + gList);
  }
  checkTickets(e) {
    var tickets = document.getElementById("tickets").value;
    this.setState({
      nooftickets: e.target.value
    });
    console.log("No of Tickets : " + tickets);
  }

  
  storeDetails(e) {
    e.preventDefault();
  
    axios.post("http://localhost:9093/passenger/", this.state).then(
      (response) => {
        console.log(response)
        let firstName = this.state.firstName;
        let lastName = this.state.lastName;
        let gender=this.state.gender;
        let nooftickets = this.state.nooftickets;

        sessionStorage.setItem(FIRSTNAME, firstName);
        sessionStorage.setItem(LASTNAME, lastName);
        sessionStorage.setItem(GENDER, gender);
        sessionStorage.setItem(NOOFTICKETS, nooftickets);
        sessionStorage.setItem(PASSENGER_ID, response.data.id);
        this.props.history.push(`/payment`);
      })

   
  }

  render() {
    return (
      <Router>
         <div className="bg">
          <div className="outer">
          <div className="inner">
            <form onSubmit={this.storeDetails}>
                <h3>Enter Your Details</h3>

                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" id="fNList" className="form-control" placeholder="Enter First Name"  
                   onChange={this.checkfirstName}/>
                </div>

                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" id="lNList" className="form-control" placeholder="Enter Last Name"  
                    onChange={this.checklastName}/>
                </div>

                <div className="form-group">
                    <label>Gender</label>
                    <input type="text" id="gList" className="form-control" placeholder="Enter Gender"  
                   onChange={this.checkgender}/>
                </div>

                <div className="form-group">
                    <label>No. Of Ticket</label>
                    <input type="text" id="tickets" className="form-control"   
                     onChange={this.checkTickets} />
                </div>

                <button type="submit" className="btn btn-success">Submit</button>
                
            </form>
           
          </div>
          </div>
          </div>   
      </Router>
    );
  }
}

export default PassengerDetails;	