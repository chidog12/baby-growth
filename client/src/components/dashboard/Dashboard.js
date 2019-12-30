import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import 'typeface-roboto';
import "./Dashboard.scss";
import BabyComponent from "../babyComponent/BabyComponent";
import AppointmentComponent from "../appointmentComponent/AppontmentComponent";
import DataComponent from "../data/DataComponent";
import ViewAppoinmentsComponent from "../proComponents/viewAppoinmentsComponent/ViewAppoinmentsComponent"
import {Container} from "@material-ui/core";
import axios from 'axios';

class Dashboard extends Component {

  constructor(){
    super();
    this.state = {
      user:[],
      type: ""
    }
  }

  componentDidMount(){
    this.getUserType();
  }

  getUserType(){
    axios.get(`/api/users/type/${this.props.auth.user.id}`)
    .then(res => {
      const user = res.data;
      this.setState({user});
    }).then(() =>{
      let type = this.state.user[0].type;
      this.setState({type});
    })
  }

  render() {

    console.log(this.state.type);

    if(this.state.type == "pro"){
      return(
        <div className="dashboard">
          <Container className="main">
            <Container className="content" maxWidth="md">
              <ViewAppoinmentsComponent/>
            </Container>
          </Container>
        </div>
      );
    } else if(this.state.type == "parent"){
      return (
        <div className="dashboard">
          <Container className="main">
            <Container className="content" maxWidth="sm">
              <BabyComponent/>
              <AppointmentComponent/>
              <DataComponent/>
            </Container>
          </Container>
        </div>
      );
    } else {
      return (
        <div className="dashboard">
          <Container className="main">
            <Container className="content" maxWidth="sm">
            </Container>
          </Container>
        </div>
      );
    }
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(Dashboard);
