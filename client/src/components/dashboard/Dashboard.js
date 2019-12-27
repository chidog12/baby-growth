import React, { Component } from "react";
import 'typeface-roboto';
import "./Dashboard.scss";
import BabyComponent from "../babyComponent/BabyComponent";
import {Container} from "@material-ui/core";

class Dashboard extends Component {

  render() {

    return (
      <div className="dashboard">
        <Container>
          <BabyComponent/>
        </Container>
      </div>
    );
  }
}

export default Dashboard;
