import React, { Component, lazy, Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import './App.css';
import Navbar from './components/navbar';
import ErrorBoundry from './components/errorboundry';

// lazy loading
const Home = React.lazy(() => import('./components/home'));
const DashBoard = React.lazy(() => import('./components/dashboard'));
const Login = React.lazy(() => import('./components/login'));
const Register = React.lazy(() => import('./components/register'));




export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false,
    }
  }


  render() {
    return (
      <ErrorBoundry>
        <Navbar ></Navbar>
        <main>
          <div className="container">
            <Switch>
              <Suspense fallback={<div>Loading...</div>}>
                <Route exact path='/' component={Home} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
                {/* <Route path='/dashboard'
                render={(props) => <DashBoard isAuthed={true} />}
              /> */}
              </Suspense>
            </Switch>
          </div>
        </main>
      </ErrorBoundry>
    );
  }

}


