import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch, useHistory, useLocation } from "react-router-dom";
import { LoginPage } from "./components/log-in/log-in";
import { MainTable } from "./components/main-table";
import { AddNewAccident } from "./components/add-new-accident";
import { Bla } from "./components/add-new-accident/bla";

export default function App() {
  const history = useHistory();
  // const location = useLocation();
  return (
    <Router>
      <div>
        <div className="section">
          <Switch>
            {/* <Route
              path="/"
              exact={false}
              component={LoginPage}
              // location={location}
            ></Route> */}
            {/* <Route
              path="/"
              exact={false}
              component={MainTable}
              // location={location}
            /> */}
            <Route path="/" exact={false} component={Bla} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}
