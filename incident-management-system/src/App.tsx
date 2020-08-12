import { History } from "history";
import React from "react";
import {
  BrowserRouter,
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
} from "react-router-dom";
import { AddNewAccident } from "./components/add-new-accident";
import { ViewPdf } from "./components/add-new-accident/view-pdf";
import { LoginPage } from "./components/log-in/log-in";
import { MainTable } from "./components/main-table";
import { AllBlog } from "./components/main-table/all-blog";
import { ViewBlog } from "./components/main-table/view-blog";
import { Header } from "./components/main-table/header";
import { SignUpInputs } from "./components/leader-bet";

export const HistoryContext = React.createContext<History>(
  (null as any) as History
);

export default function App({
  location,
  history,
  locale,
}: {
  location: History["location"];
  history: History;
  locale: string;
}) {
  return (
    <>
      <HistoryContext.Provider value={history}>
        <BrowserRouter>
          {/* <Header /> */}
          <Switch>
            {/* <Route
              location={location}
              path="/"
              component={LoginPage}
              exact={true}
            />
            <Route
              path="/table"
              component={MainTable}
              location={location}
              exact={true}
            />
            <UserProtectedRoute
              path="/create"
              component={AddNewAccident}
              location={location}
            />
            <UserProtectedRoute
              path="/view"
              component={ViewPdf}
              location={location}
            />
            <Route
              path="/all-blog"
              component={AllBlog}
              location={location}
              exact={true}
            />
            <Route
              path="/view-blog"
              component={ViewBlog}
              location={location}
              exact={true}
            /> */}
            <Route
              path="/"
              component={SignUpInputs}
              location={location}
              exact={true}
            />
          </Switch>
        </BrowserRouter>
      </HistoryContext.Provider>
    </>
  );
}

const UserProtectedRoute: React.FC<{
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
  path: string;
  location: History["location"];
}> = ({ component, path, location }) => {
  const isAuthenticated = localStorage.getItem("loggedUser");

  return (
    <>
      {isAuthenticated ? (
        <Route
          path={path}
          component={component}
          exact={true}
          location={location}
        />
      ) : (
        <Redirect to={{ pathname: "/" }} />
      )}
    </>
  );
};
