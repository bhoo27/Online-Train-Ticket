import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default class AddTrain extends Component {
  state = {
    id:'',
    trainNumber:'',
    origin:'',
    destination:'',
    trainDate:'',
    istrainFilled: false
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

  }



  handleSubmit = event => {
    event.preventDefault();

    const AddTrain = {
      id: this.state.id,
      trainNumber: this.state.trainNumber,
      origin: this.state.origin,
      destination: this.state.destination,
      trainDate: this.state.trainDate,
    
    };

    axios
      .post(
        "http://localhost:9091/search/",
        AddTrain
      )
      .then(response => response)
      .catch(error => error.message);
      window.alert("Train added successfully");
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
    if (this.state.isFlightFilled) {
      return <Redirect to="/AllTrainadmin" />;
    }
    console.log(this.props.adminId === "");
    if (this.props.adminId === "") {
      return <Redirect to="/add-train" />;
    }

    return (
      <div className="bg">
          <div className="outer">
          <div className="inner">
            <form onSubmit={this.handleSubmit}>
                <h3>Add Train</h3>

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

                

                <button className="btn btn-success">Add</button>
                <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
            </form>
           
          </div>
          </div>
          </div>   
    );
  }
}