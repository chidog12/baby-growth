import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Container} from "@material-ui/core";
import axios from 'axios';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';
import {
    calcBabyWeightNextMonth, calcCurrentDiaperSize} from "../../utils/dataProcessing";

class DataComponent extends Component {
    constructor(){
        super();
        this.state = {
            value: 0,
            babies: [],
            numOfBabies: 0,
            weight: 0,
            age: 0
        }
        this.babiesList = this.babiesList.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
    }

    componentDidMount(){
        this.getBabiesList();
    }

    getBabiesList(){
        axios.get(`/api/babies/get/parent/${this.props.auth.user.id}`)
        .then(res => {
          const babies = res.data;
          this.setState({babies});
          let numOfBabies = this.state.babies.length;
          this.setState({
              numOfBabies
            });
        })
      }

      handleTabChange = (event, newValue) => {
        this.setState({
            value: newValue,
            weight: this.state.babies[newValue].weight,
            age: this.state.babies[newValue].age
        })
      };

    createData(name, value) {
        return { name, value};
        }

    useStyles = makeStyles({
        table: {
          minWidth: 650,
        },
      });

      babiesList(){
        console.log(this.state.babies)

        const babies = this.state.babies && this.state.babies.map((babies) =>
            <Tab key={babies._id} label={babies.name} />
        );
        return(
            babies
        );
    }
    

    render() {
        const rows = [
            this.createData('Current Weight', this.state.weight+ ' lbs'),
            this.createData('Recommended Diaper Size', calcCurrentDiaperSize(this.state.weight)),
            this.createData('Estimated Next Month Weight', calcBabyWeightNextMonth(this.state.weight, this.state.age)+ ' lbs'),
            this.createData('Estimated Next Month Diaper Size', calcCurrentDiaperSize(calcBabyWeightNextMonth(this.state.weight, this.state.age)))
          ];

        return(
            <div className="DataComponent-container">
                <Container maxWidth="sm">
                    <Paper className="root">
                        <Tabs
                            value={this.state.value}
                            onChange={this.handleTabChange}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                        >
                        {this.babiesList()}
                        </Tabs>
                    </Paper>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableBody>
                            {rows.map(row => (
                                <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                <strong>
                                    {row.name}
                                </strong>
                                </TableCell>
                                <TableCell align="right">{row.value}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </div>
        );
    }
}

DataComponent.propTypes = {
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps
  )(DataComponent);