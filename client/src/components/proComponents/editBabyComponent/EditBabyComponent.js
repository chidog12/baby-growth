import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import 'typeface-roboto';
import {Container} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import axios from 'axios';
import Button from '@material-ui/core/Button';

class EditBabyComponent extends Component {

    constructor() {
        super();
        this.state = {
            babyId: '',
            age: 0,
            weight: 0,
            parentId: '',
            appointments: []
        };

      }

      componentDidMount(){
        this.getBabies();
        this.getAppointments();
    }

    getAppointments(){
        axios.get(`/api/appointments/get`)
        .then(res => {
            const appointments = res.data;
            this.setState({appointments});
        })
    }

      getBabies(){
        axios.get(`/api/babies/get`)
        .then(res => {
            const babies = res.data;
            this.setState({babies});
        })
    }

      onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
        };

        checkValid(){
            if(
                this.state.age != 0 && this.state.age != undefined &&
                this.state.weight != 0 && this.state.age != undefined
            ){
                return true;
            } else {
                return false;
            }
        }

        onSubmit = e => {
            e.preventDefault();
            const newBaby = {
                name: (this.state.babies.find(o => o._id === this.state.babyId) == undefined ? '' :
                this.state.babies.find(o => o._id === this.state.babyId).name),
                age: this.state.age,
                weight: this.state.weight,
                parentId: (this.state.babies.find(o => o._id === this.state.babyId) == undefined ? '' :
                this.state.babies.find(o => o._id === this.state.babyId).parentId)
              };
    
            if(this.checkValid()){
                axios.put(`/api/babies/update/${this.state.babyId}`,newBaby)
                    .then(res => {
                    })
                    .then(() => {
                        const updateAppt = {
                            parentId: (this.state.babies.find(o => o._id === this.state.babyId) == undefined ? '' :
                            this.state.babies.find(o => o._id === this.state.babyId).parentId),
                            babyId: this.state.babyId,
                            babyName: (this.state.appointments.find(o => o.babyId === this.state.babyId) == undefined ? '' :
                            this.state.appointments.find(o => o.babyId === this.state.babyId).babyName),
                            date:  (this.state.appointments.find(o => o.babyId === this.state.babyId) == undefined ? '' :
                            this.state.appointments.find(o => o.babyId === this.state.babyId).date),
                            done: true
                          };


                        axios.put(`/api/appointments/update/${this.state.babyId}`,updateAppt)
                            .then(res => {
                            })
                    }).then(() => {
                        alert("Baby data updated");
                        window.location.reload();
                    })
            } else {
                alert("Error in form");
            }
        };

      render() {
          return(
            <Container classname="container" maxWidth="md">
                <div className="title">
                    <p><strong>Edit Baby Weight</strong></p>
                </div>
                <form onSubmit={this.onSubmit}>
                    <div>
                    <TextField id="outlined-basic" variant="outlined"label="Baby Id" 
                        onChange={this.onChange}
                        value={this.state.babyId}
                        id="babyId"
                        type="text"
                    />
                    </div><div>
                    <TextField id="outlined-basic" variant="outlined" label="age in months" 
                        onChange={this.onChange}
                        value={this.state.age}
                        id="age"
                        type="number"
                    />
                    </div>
                    <div>
                    <TextField id="outlined-basic" variant="outlined" label="weight in lbs" 
                        onChange={this.onChange}
                        value={this.state.weight}
                        id="weight"
                        type="number"
                    />
                    </div>
                    <Button type="submit" variant="contained" color="primary">
                        Done
                    </Button>
                </form>
            </Container>
          );
      }

}

EditBabyComponent.propTypes = {
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps
  )(EditBabyComponent);