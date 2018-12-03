import React, { Component } from 'react';
import logo from './logo.svg';
import { Button } from 'antd';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import './App.css';


import CustomerList from './components/customerList/customerList';
import AddCustomer from './components/addCustomer/addCustomer';
import DailyCollection from './components/dailyCollection/dailyCollection';
import CustomerLoan from './components/customerLoan/customerLoan';
import ViewInstallment from './components/viewInstallment/viewInstallment';
import AddLoan from './components/addLoan/addLoan';
import Login from './components/login/login';
import Register from './components/register/register';

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
  state = {
    singleLoanDetail:{
    }
  }
  changeState (stateName , value) {
    let a = {}
    a[stateName] = value
    this.setState(a)
  }
  render() {
    return (
      <div>
        
        
        
        {/* <Link to='/viewinstallment'>View Installment</Link>
        <Link to='/addloan'>Add Loan</Link> */}
        {/* <Link to='/collection'>Collection</Link>
        <Link to='/customerloan'>Customer Loan</Link> */}

        <Switch>
          <Route exact path='/' component={Login}/>
          <Route exact path='/register' component={Register}/>
          <Route exact path='/home' component={CustomerList}/>
          <Route path='/addcustomer' component={AddCustomer}/>
          <Route path='/addloan/:customerId' component={AddLoan}/>
          <Route path='/viewinstallment/:loanId'  render = {(props)=><ViewInstallment {...props} loanDetail={this.state.singleLoanDetail}/>} />
          <Route path='/collection/:loanId' render = {(props)=><DailyCollection {...props} loanDetail={this.state.singleLoanDetail}/>} />
          <Route path='/customerloan/:customerId'  render = {(props)=><CustomerLoan {...props} changeState= {this.changeState.bind(this)}/>} />
          <Route component={NotFound}/>
        </Switch>
      </div>
    );
  }
}

export default App;
