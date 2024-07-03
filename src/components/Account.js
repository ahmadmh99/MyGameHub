import React, { Component } from "react";
import AuthUserContext from "./AuthUserContext";
import withAuthorization from "./withAuthorization"; // Redirects to sign in if user not signed in
import { db, auth } from '../firebase/firebase';
import Navigation from "./Navigation";
import Footer from './Footer';
import PasswordChangeForm from './PasswordChange';
import { Container, Table } from "react-bootstrap";
import ChangeDetailsForm from './ChangeDetails'
import Cards from "./Cards";
import { Button } from 'react-bootstrap';
const INITIAL_STATE = {
  name: "",
  email: "",
  favorites: [],
  error: null
};

class AccountPage extends Component {

  state = { ...INITIAL_STATE };

  componentDidMount() {
    // Fetch user profile
    db.ref('users/' + auth.currentUser.uid).once('value')
      .then((snapshot) => {
        if (snapshot) {
          this.setState(snapshot.val());
        }
      })
      .catch(e => {
        alert(e.message);
      });

    // Fetch user favorites
    db.ref('users/' + auth.currentUser.uid + '/favorites').once('value')
      .then((snapshot) => {
        if (snapshot) {
          this.setState({ favorites: snapshot.val() || [] });
        }
      })
      .catch(e => {
        alert(e.message);
      });
  }
  switchToGame(){
    if(auth.currentUser !== null){
      return new Promise(async (resolve, reject) => {
              
        await db.ref('users/' + auth.currentUser?.uid).once('value').then((snapshot) => {
          if (snapshot) {
            this.setState({userDetails: snapshot.val()});
          }
        }).catch( e => {
          alert(e.message);
        })
                    
  
  
       resolve();
       })    
    }
  }

  render() {
    return (
      <div>
        <Navigation userDetails={this.state} />
        <AuthUserContext.Consumer>
          {authUser => (
            <Container style={{ marginTop: "110px" }}>
              <center>
                <div className="div-flex">
                  <div>
                    <h2>Your Profile</h2>
                    <Table striped bordered hover id="mytable">
                      {/* ... Profile table rows ... */}
                    </Table>
                  </div>
                </div>
                <br />
                <ChangeDetailsForm />
                <br />
                <PasswordChangeForm />
                <br></br>
                <br></br>
                <Button id='mybutton' onClick={() => this.switchToGame()}> See your past Orders</Button>
                <div className="cards_together">
            {
              this.state.userDetails ?
              <Cards inShoppingCart = {true} isCategories = {false} results = {this.state.userDetails.shoppingItems} userDetails={this.state.userDetails} />
               : <p></p>
               
          
           }</div>

             
              </center>
            </Container>
          )}
        </AuthUserContext.Consumer>
        <hr />
        <br />
        <Footer />
      </div>
    )
  }
}

const authCondition = authUser =>
  !!authUser && authUser.providerData[0].providerId !== "facebook.com"; // True and false

export default withAuthorization(authCondition)(AccountPage);

