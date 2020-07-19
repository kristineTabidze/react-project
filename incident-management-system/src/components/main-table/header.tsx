import React, { useCallback } from "react";
import { useHistory } from "react-router";
import "./styles/accident.css";

export const Header: React.FC<{}> = (props) => {
  const history = useHistory();
  const redirectToTable = useCallback(() => {
    history.push("/table");
  }, [history]);

  const redirectToCreate = useCallback(() => {
    history.push("/create");
  }, [history]);

  return (
    <div className="headerContainer">
      <div onClick={redirectToTable} className="headerButton">
        ინციდენტების ჩამონათვალი
      </div>
      <div onClick={redirectToCreate} className="headerButton">
        ინციდენტის შექმნა
      </div>
    </div>
  );
};
