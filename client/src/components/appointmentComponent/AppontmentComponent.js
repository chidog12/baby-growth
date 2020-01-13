import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios';
import {Container} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import "./AppointmentComponent.scss";


class AppointmentComponent extends Component {

    constructor(){
        super();
        this.state = {
            value: 0,
            name: "",
            date: "",
            parentId: "",
            babyId: "",
            babies: [],
            appointments: [],
            babyName: ''
        }
    }

    handleTabChange = (event, newValue) => {
        this.setState({
            value: newValue
        })
      };

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    componentDidMount(){
        this.setState({parentId: this.props.auth.user.id});
        this.getAppointments();
      }

    checkValid(){
        if(
            this.state.name != '' && this.state.name != undefined &&
            this.state.babyName != '' && this.state.babyName != undefined &&
            this.state.babyId != 0 && this.state.babyId != undefined &&
            this.state.parentId != '' && this.state.parentId != undefined &&
            this.state.date != 0 && this.state.date != undefined
        ){
            return true;
        } else {
            return false;
        }
    }

    getAppointments(){
        axios.get(`/api/appointments/get/${this.state.parentId}`)
        .then(res => {
            const appointments = res.data;
            this.setState({appointments});
        })
    }

    appointmentsList(){
        const appointments = this.state.appointments && this.state.appointments.map((appointments) =>
            <div key={appointments._id}>
                <div style={{textAlign: 'center'}} className="appointmentText">
                    <p> <strong>Child:</strong> {appointments.babyName} | Date: {appointments.date}</p>
                </div>
            </div>
        );
        return(
            appointments
        );
    }

    onSubmit = e => {
        e.preventDefault();

        axios.get(`/api/babies/get/baby/${this.state.name}/${this.state.parentId}`)
        .then(res => {
            let babyId = (res.data != '' ? res.data[0]._id : '');
            let name = (res.data != '' ? res.data[0].name : '');
            this.setState({
                babyName: name
            });
            this.setState({babyId});
        }).then(() => {
            const newAppointment = {
                parentId: this.state.parentId,
                babyId: this.state.babyId,
                babyName: this.state.babyName,
                date: this.state.date,
                done: false
              };
    
    
            if(this.checkValid()){
                axios.post(`/api/appointments/post`,newAppointment)
                    .then(res => {
                    })
                    .then(() => {
                        alert("Appointment Scheduled");
                        window.location.reload();
                    })
                    .catch((err) => {
                        console.log(err)
                        }
                    )
            } else{
                alert("Appointment Error");
            }
        })
    };

    returnForm(){
        return(
            <Container maxWidth="sm" className="form">
                <form onSubmit={this.onSubmit}>
                    <div>
                    <TextField id="outlined-basic" variant="outlined"label="Baby Name" 
                        onChange={this.onChange}
                        value={this.state.name}
                        id="name"
                        type="text"
                    />
                    </div><div>
                    <TextField
                        id="date"
                        label="date"
                        type="date"
                        onChange={this.onChange}
                        value={this.state.date}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    </div>
                    <Button type="submit" variant="contained" color="primary">
                        Done
                    </Button>
                </form>
            </Container>
        );
    }

    render() {
        return (
          <div className="AppointmentComponent-container">
          <Container maxWidth="sm">
            <Paper className="root">
                <Tabs
                    value={this.state.value}
                    onChange={this.handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Appointments" />
                    <Tab label="New Appointment" />
                </Tabs>
            </Paper>
        
            {this.state.value == 0 ? this.appointmentsList() : this.returnForm()}
        </Container>
          </div>
        );
      }

}

AppointmentComponent.propTypes = {
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps
  )(AppointmentComponent);