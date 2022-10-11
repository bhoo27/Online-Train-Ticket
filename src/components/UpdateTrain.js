import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";

export default class UpdateTrain extends Component {
  state = {
    id:this.props.location.state.id || '',
    trainNumber: this.props.location.state.trainNumber || '',
    origin: this.props.location.state.origin || '',
    destination: this.props.location.state.destination || '',
    trainDate:this.props.location.state.trainDate || '',
    isTrainFilled: false
  };

 
  handleid = event => {
    this.setState({ id: event.target.value });
  }


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
    console.log(event.target.value, 'event.target.value');

  }



  handleSubmit = event => {
    event.preventDefault();

    const UpdateTrain = {
      id: this.state.id,
      trainNumber: this.state.trainNumber,
      origin: this.state.origin,
      destination: this.state.destination,
      trainDate: this.state.trainDate,
    
    };

    axios
      .put(
        "http://localhost:9091/search/{id}" +
        this.props.match.params.id,
        UpdateTrain
      )
      .then(response => response)
      .catch(error => error.message);
      window.alert("Train update successfully");
    this.setState({
      id:"",
        trainNumber: "",
        origin: "",
        destination: "",
        trainDate:"",
    
      isTrainFilled: true
    });
  };

  cancel(){
    this.props.history.push('/AllTrainadmin');
    }

  render() {
    if (this.state.isTrainFilled) {
      return <Redirect to="/AllTrainadmin" />;
    }
    console.log(this.props.adminId === "");
    if (this.props.adminId === "") {
      return <Redirect to="/update-train" />;
    }

    return (
      <div className="bg">
          <div className="outer">
          <div className="inner">
            <form onSubmit={this.handleSubmit}>
                <h3>Update Train</h3>

                <div className="form-group">
                    <label>Train Id</label>
                    <input type="text" className="form-control" placeholder="Enter Train id"  
                   onChange={this.handleid} value={this.state.id} required />
                </div>
                
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

                

                <button className="btn btn-success">Update</button>
                <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
            </form>
           
          </div>
          </div>
          </div>   
    );
  }
}