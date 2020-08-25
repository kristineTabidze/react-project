import React from "react";
import "./styles/assignments.css";
import { ReactComponent as Time } from "./styles/imgs/time.svg";
import { ReactComponent as GreenUser } from "./styles/imgs/user-green.svg";

export const TopSpins: React.FC<{}> = (props) => {
  return (
    <div className="topSpins">
      <span>
        ტოპ სპინები
        <span>
          <div className="line" />
          <div className="circle" />
        </span>
      </span>
      {new Array(5).fill(0).map((s, i) => (
        <TopSpin key={i} />
      ))}
    </div>
  );
};

const TopSpin: React.FC<{}> = (props) => {
  return (
    <div className="spinContainer">
      <div className="date">
        <Time style={{ marginRight: 5 }} />
        23.04.2019 20:33
      </div>
      <div className="price">
        5000<span>GEL</span>
      </div>
      <div className="users">
        <GreenUser style={{ width: 18, marginRight: 5 }} />
        ნოდარა, ელდარა, ემზარა
        <button>
          <span> + </span>
        </button>
      </div>
      1000 X 2
    </div>
  );
};
