import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import 'typeface-roboto';
import "./BabyComponent.scss";
import BabyComponentForm from "./BabyComponentForm";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import {Container} from "@material-ui/core";
import axios from 'axios';

class BabyComponent extends Component {

    constructor(){
        super();
        this.state = {
            value: 0,
            babies: []
        }

        this.handleTabChange = this.handleTabChange.bind(this);
        this.babiesList = this.babiesList.bind(this);
    }

    componentDidMount(){
        this.getBabiesList();
    }
    
    handleTabChange = (event, newValue) => {
        this.setState({
            value: newValue
        })
      };

    getBabiesList(){
        axios.get(`/api/babies/get/parent/${this.props.auth.user.id}`)
        .then(res => {
          const babies = res.data;
          this.setState({babies});
        })
      }

    babiesList(){
        console.log(this.state.babies)

        const babies = this.state.babies && this.state.babies.map((babies) =>
            <div key={babies._id}>
                <div style={{textAlign: 'center'}} className="babies-text">
                    <h6><strong>Name:</strong> {babies.name}</h6>
                </div>
            </div>
        );
        return(
            babies
        );
    }

  render() {
    return (
      <div className="BabyComponent-container">
        <Container maxWidth="sm">
            <Paper className="root">
                <Tabs
                    value={this.state.value}
                    onChange={this.handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Babies" />
                    <Tab label="Add New Baby" />
                </Tabs>
            </Paper>
            {this.state.value == 0 ? this.babiesList() : <BabyComponentForm/>}
        </Container>
      </div>
    );
  }
}

BabyComponent.propTypes = {
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps
  )(BabyComponent);