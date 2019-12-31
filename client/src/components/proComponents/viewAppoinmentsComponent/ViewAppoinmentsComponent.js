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
import "../viewAppoinmentsComponent/ViewAppoinmentsComponent.scss"


class ViewAppoinmentsComponent extends Component {

    constructor(){
        super();
        this.state = {
            appointments: [],
            babies: [],
            users: []
        }

        this.createRows = this.createRows.bind(this);
    }

    componentDidMount(){
        this.getAppointments();
        this.getBabies();
        this.getUsers();
    }

    getAppointments(){
        axios.get(`/api/appointments/get`)
        .then(res => {
            console.log(res);
            console.log(res.data);
            const appointments = res.data;
            this.setState({appointments});
        })
    }

    getBabies(){
        axios.get(`/api/babies/get`)
        .then(res => {
            console.log(res);
            console.log(res.data);
            const babies = res.data;
            this.setState({babies});
        })
    }

    getUsers(){
        axios.get(`/api/users`)
        .then(res => {
            console.log(res);
            console.log(res.data);
            const users = res.data;
            this.setState({users});
        })
    }

    createRows(){
        let rows = []
        let length = this.state.appointments.length;

        for(let i=0; i < length; i++){
            console.log((this.state.babies.find(o => o._id === this.state.appointments[i].babyId) == undefined ? '' :
            this.state.babies.find(o => o._id === this.state.appointments[i].babyId).name));
            rows[i] = this.createData(
                (this.state.users.find(o => o._id === this.state.appointments[i].parentId) == undefined ? '' :
                 this.state.users.find(o => o._id === this.state.appointments[i].parentId).name)
                ,
                (this.state.babies.find(o => o._id === this.state.appointments[i].babyId) == undefined ? '' :
                 this.state.babies.find(o => o._id === this.state.appointments[i].babyId).name)
                , (this.state.babies.find(o => o._id === this.state.appointments[i].babyId) == undefined ? '' :
                this.state.babies.find(o => o._id === this.state.appointments[i].babyId).weight)
               , (this.state.babies.find(o => o._id === this.state.appointments[i].babyId) == undefined ? '' :
               this.state.babies.find(o => o._id === this.state.appointments[i].babyId).age)
              , (this.state.appointments[i] == undefined ? '' : this.state.appointments[i].date)
              , (this.state.appointments[i] == undefined ? '' : this.state.appointments[i].babyId))
        }

        return rows;
    }



    createData(parentName, babyName, babyWeight, babyAge, date, babyId) {
        return { parentName, babyName, babyWeight, babyAge, date, babyId};
        }

        useStyles = makeStyles({
            table: {
              minWidth: 650,
            },
          });

    render(){

        const rows = this.createRows();

        return(
            <div className="ViewAppoinmentsComponent-container">
                <Container classname="container" maxWidth="md">
                    <div className="title">
                        <p><strong>Upcoming Appointments</strong></p>
                    </div>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Parent Name</TableCell>
                                <TableCell align="right">Baby Name</TableCell>
                                <TableCell align="right">Baby Weight</TableCell>
                                <TableCell align="right">Baby Age</TableCell>
                                <TableCell align="right">Date</TableCell>
                                <TableCell align="right">BabyId</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {rows.map(row => (
                                <TableRow key={row.parentName}>
                                <TableCell component="th" scope="row">
                                <strong>
                                    {row.parentName}
                                </strong>
                                </TableCell>
                                <TableCell align="right">{row.babyName}</TableCell>
                                <TableCell align="right">{row.babyWeight}</TableCell>
                                <TableCell align="right">{row.babyAge}</TableCell>
                                <TableCell align="right">{row.date}</TableCell>
                                <TableCell align="right">{row.babyId}</TableCell>
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

ViewAppoinmentsComponent.propTypes = {
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps
  )(ViewAppoinmentsComponent);