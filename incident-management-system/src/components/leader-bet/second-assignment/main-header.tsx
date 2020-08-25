import "./styles/assignments.css";
import React from "react";
import { ReactComponent as Cherry } from "./styles/imgs/cherry.svg";
import { ReactComponent as Cash } from "./styles/imgs/cash-black.svg";
import { ReactComponent as Settings } from "./styles/imgs/settings.svg";

export const MainHeader: React.FC<{}> = (props) => {
  return (
    <div className="mainHeaderContainer">
      <Cherry style={{ color: "#FFFF00", marginRight: 190 }} />
      <JackPot />
      <div style={{ marginLeft: 80 }}>
        <JackPot />
      </div>
      <div className="settingContainer">
        <button>
          <Cash style={{ marginRight: 8 }} />
          Cashier
        </button>
        <Settings />
      </div>
    </div>
  );
};

const JackPot: React.FC<{}> = (props) => {
  const bigNumbers = [8, 2, 5, 9, 1];
  const smallNumbers = [9, 2];

  return (
    <div className="jackpotContainer">
      <div>
        {bigNumbers.map((num, i) => (
          <div className="bigNumber" key={i}>
            {num}
          </div>
        ))}
        .
        {smallNumbers.map((num, i) => (
          <div key={i} className="smallNumber">
            {num}
          </div>
        ))}
      </div>
      <span>LEADER JACKPOT</span>
    </div>
  );
};
