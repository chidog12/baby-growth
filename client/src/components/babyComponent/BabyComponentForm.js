import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import 'typeface-roboto';
import {Container} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import "./BabyComponentForm.scss";
import axios from 'axios';
import Button from '@material-ui/core/Button';

class BabyComponentForm extends Component {

    constructor() {
        super();
        this.state = {
          name: "",
          age: 0,
          parentId: "",
          weight: 0
        };

      }

      componentDidMount(){
        this.setState({parentId: this.props.auth.user.id});
      }

    checkValid(){
        if(
            this.state.name != '' &&
            this.state.age != 0 && this.state.age != undefined &&
            this.state.parentId != '' && this.state.age != undefined &&
            this.state.weight != 0 && this.state.age != undefined
        ){
            return true;
        } else {
            return false;
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
        };

        onSubmit = e => {
            e.preventDefault();
            const newBaby = {
                name: this.state.name,
                age: this.state.age,
                weight: this.state.weight,
                parentId: this.state.parentId
              };
    
            if(this.checkValid()){
                axios.post(`/api/babies/post`,newBaby)
                    .then(res => {
                    })
                    .then(() => {
                        alert("New baby submitted");
                    })
            } else {
                alert("Error in form");
            }
        };

  render() {

    return (
      <div className="form">
        <Container maxWidth="sm">
            <form onSubmit={this.onSubmit}>
                <div>
                <TextField id="outlined-basic" variant="outlined"label="Baby Name" 
                    onChange={this.onChange}
                    value={this.state.name}
                    id="name"
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
      </div>
    );
  }
}

BabyComponentForm.propTypes = {
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps
  )(BabyComponentForm);
