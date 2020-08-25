import React, { useState } from "react";
import { Dashboard } from "./dashboard";
import { GamesContainer } from "./games-container";
import { AssignmentHeader } from "./header";
import { PersonalInfo, UserHistory } from "./personal-info";
import "./styles/assignments.css";
import { TopSpins } from "./top-spins";
import { MainHeader } from "./main-header";

export const MainPage: React.FC<{}> = (props) => {
  const [hasBlur, setHasBlur] = useState(false);
  const [isClickedOnViewHistory, setIsClickedOnViewHistory] = useState(false);

  return (
    <div className="headerAndAssignmentContainer">
      <MainHeader />
      <div className="assignmentMainPageContainer">
        {hasBlur && <div className="blurBlackDiv" />}
        <div className="assignmentMainPage">
          <AssignmentHeader setHasBlur={setHasBlur} />
          <GamesContainer isClickedOn5Players={hasBlur} />
          <Dashboard setIsClickedOnViewHistory={setIsClickedOnViewHistory} />
        </div>
        <div className="personalInfoAndSpinsContainer">
          <PersonalInfo setIsClickedOnViewHistory={setIsClickedOnViewHistory} />
          ,
          <TopSpins />
        </div>
        {isClickedOnViewHistory && (
          <UserHistory setIsClickedOnViewHistory={setIsClickedOnViewHistory} />
        )}
      </div>
    </div>
  );
};
