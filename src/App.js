import React, { Component } from 'react';
import logo from './logo.svg';
import { Button } from 'antd';
import { Route, Switch, Link } from 'react-router-dom';
import './App.css';


import CustomerList from './components/customerList/customerList';
import AddCustomer from './components/addCustomer/addCustomer';
import DailyCollection from './components/dailyCollection/dailyCollection';
import CustomerLoan from './components/customerLoan/customerLoan';

const Home = () => <div>Home</div>
const About = () => <div>About</div>
const Contact = () => <div>Contact</div>

const Status = ({ code, children }) => (
  <Route render={({ staticContext }) => {
    if (staticContext)
      staticContext.status = code
    return children
  }}/>
)

const NotFound = () => (
  <Status code={404}>
    <div>
      <h1>Sorry, can’t find that.</h1>
    </div>
  </Status>
)

class App extends Component {
  render() {
    return (
      <div>
        <Link to='/'>Home</Link>
        <Link to='/addcustomer'>Add</Link>
        <Link to='/collection'>Collection</Link>
        <Link to='/customerloan'>Customer Loan</Link>
        <hr/>
        <Switch>
          <Route exact path='/' component={CustomerList}/>
          <Route path='/addcustomer' component={AddCustomer}/>
          <Route path='/collection' component={DailyCollection}/>
          <Route path='/customerloan' component={CustomerLoan}/>
          <Route component={NotFound}/>
        </Switch>
      </div>
    );
  }
}

export default App;
