import "./styles/assignments.css";
import React, { useState } from "react";
import { ReactComponent as Cherry } from "./styles/imgs/cherry.svg";
import { ReactComponent as Winner } from "./styles/imgs/winner.svg";
import { ReactComponent as LightGreenUser } from "./styles/imgs/light-green.svg";

const users = [
  {
    id: "322145",
    username: "Alberto",
    coin: 3264,
  },
  {
    id: "322145",
    username: "Alberto",
    coin: 3264,
  },
  {
    id: "322145",
    username: "Alberto",
    coin: 3264,
  },
  {
    id: "322145",
    username: "Davitich",
    coin: 3264,
  },
  {
    id: "322145",
    username: "Alberto",
    coin: 3264,
  },
];

export const StartGame: React.FC<{}> = (props) => {
  const [isClicked, setIsClicked] = useState(true);
  return (
    <div className="startGamePage">
      <div className="leftSide">
        <div className="upperBox">
          <Cherry style={{ color: "#FFFF00" }} />
          <span>
            5000 <span>GEL</span>
          </span>
          საპრიზო ფონდი
        </div>
        <div style={{ margin: "20px 0", display: "flex" }}>
          <Winner style={{ marginRight: 8 }} />
          ლიდერბორდი
        </div>
        <div>
          {users.map((user, i) => (
            <div
              key={i}
              className={i === 3 ? "userContainerActive" : "userContainer"}
              onClick={() => (i === 3 ? setIsClicked(true) : {})}
            >
              <button className="circle"> {i + 1} </button>
              <div className="userNameContainer">
                <div>
                  <LightGreenUser className="icon" />
                  {user.username}
                </div>
                {user.id}
              </div>
              <div className="coin">
                {user.coin}
                <span> COIN</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="rightSideContainer">
        {isClicked && (
          <div className="congratsBox">
            <Winner />
            <br />
            გილოცავთ ! <br /> თქვენ დაიკავეთ პირველი ადგილი
            <button className="prButton">
              <span>
                5000 <span>GEL</span>
              </span>
              <div>მოგებული თანხა</div>
            </button>
            <div className="closeButtonContainer">
              <button onClick={() => setIsClicked(false)}>დახურვა</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
