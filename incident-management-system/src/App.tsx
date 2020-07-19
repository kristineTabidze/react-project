import { History } from "history";
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { AddNewAccident } from "./components/add-new-accident";
import { ViewPdf } from "./components/add-new-accident/view-pdf";
import { LoginPage } from "./components/log-in/log-in";
import { MainTable } from "./components/main-table";

export const HistoryContext = React.createContext<History>(
  (null as any) as History
);

export default function App({
  location,
  isTeacher,
  isStudent,
  isMainAdmin,
  isAuthenticated,
  history,
  locale,
}: {
  location: History["location"];
  isTeacher: boolean;
  isStudent: boolean;
  isMainAdmin: boolean;
  isAuthenticated: boolean;
  history: History;
  locale: string;
}) {
  return (
    <HistoryContext.Provider value={history}>
      <BrowserRouter>
        <Route
          location={location}
          path="/"
          exact={true}
          component={LoginPage}
        />
        <Route
          location={location}
          path="/table"
          exact={true}
          component={MainTable}
        />
        <Route
          location={location}
          path="/create"
          exact={true}
          component={AddNewAccident}
        />
        <Route
          location={location}
          path="/view"
          exact={true}
          component={ViewPdf}
        />
      </BrowserRouter>
    </HistoryContext.Provider>
  );
}
