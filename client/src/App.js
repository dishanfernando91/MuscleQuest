import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import NotFound from './components/layout/NotFound'
import Navbar from './components/layout/Navbar';
import LandingPage from './components/layout/LandingPage';
import EditMember from './components/members/EditMember';
import CreateMember from './components/members/CreateMember';
import MemberList from './components/members/MemberList';
import MemberDetail from './components/members/MemberDetail';
import CreatePackage from './components/packages/CreatePackage';
import CreatePayment from './components/payments/CreatePayment';
import PaymentHistory from './components/payments/PaymentHistory';

function App() {
  return (
    <>
    <Router>
        <Navbar />
        <br />
        <Switch>
          <Route path='/' exact component = {LandingPage} /> 
          <Route path='/create' exact component = {CreateMember} />
          <Route path='/show/' exact component = {MemberList} />
          <Route path='/show/:id' exact component = {MemberDetail} />
          <Route path='/edit/:id' exact component = {EditMember} />
          <Route path='/packages' exact component = {CreatePackage} />
          <Route path='/payments' exact component = {CreatePayment} />
          <Route path='/payments/history' exact component = {PaymentHistory} />
          <Route exact component = {NotFound} />
        </Switch>
    </Router>
   </>
  );
}

export default App;
