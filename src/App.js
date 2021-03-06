import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Collapsible from './Collapsible';

class App extends Component {

  constructor(props){
          super(props);
          this.state = {
              isLoading: true,
              contacts: []
          }
  }

  fetchData(){

       this.setState({
           isLoading: true,
           contacts: []
       })

       fetch('https://randomuser.me/api/?results=10&nat=us,dk,fr,gb')
       .then(response => response.json())
       .then(parsedJSON => parsedJSON.results.map(user => (
           {
               name: `${user.name.first}`,
               username: `${user.login.username}`,
               email: `${user.email}`,
               location: `${user.location.street}, ${user.location.city}`
           }
       )))
       .then(contacts => this.setState({
           contacts,
           isLoading: false
       }))
       .catch(error => console.log('parsing failed', error))

}


  render() {
      const {isLoading, contacts} = this.state;
      return (
          <div>
              <header>
                  <h1>Fetching Data <button className="btn btn-sm btn-danger" onClick={(e) => {
                      this.fetchData();
                  }}>Fetch now</button></h1>
              </header>
              <div className={`content ${isLoading ? 'is-loading' : ''}`}>
                  <div className="panel-group">
                      {
                          !isLoading && contacts.length > 0 ? contacts.map(contact => {
                              const {username, name, email, location} = contact;
                              return <Collapsible key={username} title={name}>
                                  <p>{email}<br />{location}</p>
                              </Collapsible>
                          }) : null
                      }
                  </div>
                  <div className="loader">
                      <div className="icon"></div>
                  </div>
              </div>
          </div>
      );
  }
}

export default App;
