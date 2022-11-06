import "tailwindcss/dist/base.css";
import "styles/globalStyles.css";
import React from "react";
import { css } from "styled-components/macro"; //eslint-disable-line
import UserRoute from "./hocs/UserRoute";
import AdminRoute from "./hocs/AdminRoute";
import Home from "demos/Home.js";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import EventView from "demos/EventView";
import Event from "demos/Event";
import Order from "demos/Order";
import AddEvent from "demos/AddEvent";
// import YourEvents from "demos/YourEvents";


export default function App() {

  return (
    <Router>
      <Switch>
       
      
        <UserRoute exact path="/restaurants" component={Event} />
        <UserRoute path="/place_order" component={EventView} />
        <UserRoute path="/addincidents" component={AddEvent} />

        <AdminRoute  path="/orders" component={Order} />
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
