import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";

export default class AddTrain extends Component {
  state = {
    
    trainNumber: this.props.location.state.trainNumber || '',
    origin: this.props.location.state.origin || '',
    destination: this.props.location.state.destination || '',
    trainDate:this.props.location.state.trainDate || '',
    bookingDate:"",
    isTrainFilled: false
  };

 
  

  handletrainNumber = event => {
    this.setState({ trainNumber: event.target.value });
  }

  handleorigin = event => {
    this.setState({ origin: event.target.value });
  }

  handledestination = event => {
    this.setState({ destination: event.target.value });
  }

  handletrainDate = event => {
    this.setState({ trainDate: event.target.value });

  }

  handlebookingDate = event => {
    this.setState({ bookingDate: event.target.value });
  }



  handleSubmit = event => {
    event.preventDefault();

    const BookTrain = {
     
      trainNumber: this.state.trainNumber,
      origin: this.state.origin,
      destination: this.state.destination,
      trainDate: this.state.trainDate,
      bookingDate: this.state.bookingDate,
    
    };

    axios
      .post(
        "http://localhost:9092/booking/",
        BookTrain
      )
      .then(response => response)
      .catch(error => error.message);
    this.setState({
     
        trainNumber: "",
        origin: "",
        destination: "",
        trainDate:"",
        bookingDate:"",
    
      isTrainFilled: true
    });
  };

  cancel(){
    this.props.history.push('/AllTrain');
    }

  render() {
    if (this.state.isTrainFilled) {
      return <Redirect to="/Passenger-Detail" />;
    }
    console.log(this.props.adminId === "");
    if (this.props.adminId === "") {
      return <Redirect to="/Book-Ticket" />;
    }

    return (
      <div className="bg">
          <div className="outer">
          <div className="inner">
            <form onSubmit={this.handleSubmit}>
                <h3>Book Ticket</h3>

                <div className="form-group">
                    <label>Train Number</label>
                    <input type="text" className="form-control" placeholder="Enter Train Number"  
                   onChange={this.handletrainNumber} value={this.state.trainNumber} required />
                </div>

                <div className="form-group">
                    <label>Origin</label>
                    <input type="text" className="form-control" placeholder="Enter Origin"  
                    onChange={this.handleorigin} value={this.state.origin} required />
                </div>

                <div className="form-group">
                    <label>Destination</label>
                    <input type="text" className="form-control" placeholder="Enter Destination"  
                    onChange={this.handledestination} value={this.state.destination} required />
                </div>

                <div className="form-group">
                    <label>Train Date</label>
                    <input type="date" className="form-control"  
                    onChange={this.handletrainDate} value={this.state.trainDate} required />
                </div>

                <div className="form-group">
                    <label>Booking Date</label>
                    <input type="date" className="form-control"  
                    onChange={this.handlebookingDate} required />
                </div>

                

                <button className="btn btn-success">Next</button>
                <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
            </form>
           
          </div>
          </div>
          </div>   
    );
  }
}