import React, { Component } from "react";
import 'typeface-roboto';
import "./Dashboard.scss";
import BabyComponent from "../babyComponent/BabyComponent";
import AppointmentComponent from "../appointmentComponent/AppontmentComponent";
import DataComponent from "../data/DataComponent";
import {Container} from "@material-ui/core";

class Dashboard extends Component {

  render() {

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
  }
}

export default Dashboard;
