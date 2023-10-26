import React, { Component } from 'react';
import {
    BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import Dashboard from "./component/Dashboard";
import Login from "./component/Login";
import Registration from "./component/Registration";
import Products from "./component/Products";

export class AppRouting extends Component {

  render() {
    return (
        <>
            <Router>
              <Routes>
                <Route path={`*`} element={<Navigate replace  to="/login"/>}/>
                <Route path={`/login`} element={<Login/>}/>
                <Route path={`/registration`} element={<Registration/>}/>
                <Route path={`/dashboard`} element={<Dashboard/>}/>
                <Route path={`/products`} element={<Products/>}/>
              </Routes>
            </Router>
        </>
    )
  }
}

export default AppRouting
