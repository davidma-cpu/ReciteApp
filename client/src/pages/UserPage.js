import React, { Component } from "react";
// import React from "react";
import { Col, Row, Container } from "../components/Grid";
// import Wrapper from "../components/Wrapper";
// import { List, ListItem } from "../components/List";
// import { Link } from "react-router-dom";
import API from "../utils/API";
import Login from "../components/Login";
import Register from "../components/Register";


class User extends Component {
    state = {
      regusername:"",
      regpassword:"",
      logusername:"",
      logpassword:"",
      registered: 0,
      regmessage: "",
      login: 0,
      logmessage: "",
    };

    componentDidMount() {
        API.checkToken()
            .then(res => {
            if (res.status === 200) {
              this.props.history.push('/Search');
            } 
            })
            .catch(err => {
            console.error(err);
            });
    }

    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
          [name]: value
        });
    }
    // componentDidMount() {
    //     API.searchAllUsers()
    //         .then(results => {
    //             this.setState({  results: results.results})
    //         })
    //         .catch(err => { console.log(err) });
    //     API.searchAllUserById(this.state.results.id)
    //         .then(results => {
    //             console.log(results.results);
    //         })
    // }

    handleRegisterSubmit = (event) => {
        event.preventDefault();
        API.registerUser({
            username: this.state.regusername,
            password: this.state.regpassword
        })
        .then(res => {
        if (res.status === 201) {
          this.setState({registered: 2})
          this.setState({regmessage: res.data})
        } else {
          this.setState({registered: 1})
          this.setState({regmessage: res.data})
        }
        console.log( this.state.registered, this.state.regmessage)
      })
    };

    handleLoginSubmit = event => {
        event.preventDefault();
        API.loginUser({
            username: this.state.logusername,
            password: this.state.logpassword
        })
        .then(res => {
        if (res.status === 201) {
          window.location.reload()
        } else {
          this.setState({login: 1})
          this.setState({logmessage: res.data})
        }
        console.log( this.state.login, this.state.logmessage)
    })
    };

    // //handle user saving 
    // handleSaveUser = item => {
    //     API.saveUser({
    //      //write code
    //     })
    //         .then(res => console.log("saved "))
    //         .catch(err => console.log(err));
    // }

    render() {
        return (

          <Container>
       
            <Row>
                <Col size="lg-4 sm-12">
                
                  <Register
                    handleRegisterSubmit={this.handleRegisterSubmit}
                    handleRegisterChange={this.handleInputChange}
                    username={this.state.regusername}
                    password={this.state.regpassword}
                    message={this.state.regmessage}
                    status={this.state.registered}
                    />

                  
                  </Col>
                          
                <Col size="lg-4 sm-12">
                
                     
                  <Login
                    handleLoginSubmit={this.handleLoginSubmit}
                    handleLoginChange={this.handleInputChange}
                    username={this.state.logusername}
                    password={this.state.logpassword}
                    message={this.state.logmessage}
                    status={this.state.login}
                    />
                  
                </Col>
            </Row>

          </Container>

        )
    }
}

export default User;