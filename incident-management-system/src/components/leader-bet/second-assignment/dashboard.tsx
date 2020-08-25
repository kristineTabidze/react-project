import React, { useState } from "react";
import "./styles/assignments.css";
import { DashboardHeader } from "./dashboard-header";
import { ListContainer } from "./list-containet";

export const Dashboard: React.FC<{
  setIsClickedOnViewHistory: React.Dispatch<React.SetStateAction<boolean>>;
}> = (props) => {
  return (
    <div className="dashboardContainer">
      <DashboardHeader
        setIsClickedOnViewHistory={props.setIsClickedOnViewHistory}
      />
      <ListContainer />
    </div>
  );
};
