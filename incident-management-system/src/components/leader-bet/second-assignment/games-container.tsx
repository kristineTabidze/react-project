import React, { useState, useEffect, useCallback } from "react";
import { ReactComponent as GreenUser } from "./styles/imgs/user-green.svg";
import { ReactComponent as BlackUser } from "./styles/imgs/user-black.svg";
import { ReactComponent as LightGreenUser } from "./styles/imgs/light-green.svg";
import { ReactComponent as Cancel } from "./styles/imgs/cancel.svg";

import "./styles/assignments.css";
import { LinearProgress } from "@material-ui/core";
import { useHistory } from "react-router";

export const GamesContainer: React.FC<{ isClickedOn5Players: boolean }> = (
  props
) => {
  const [isClickedOnStartGame, setIsClickedOnStartGame] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsClickedOnStartGame(true);
    }, 30 * 1000);
  }, []);

  return (
    <div>
      {props.isClickedOn5Players && !isClickedOnStartGame && <LoadingGame />}
      {isClickedOnStartGame && <FivePlayersCard />}
      <div className="gamesContainer">
        {new Array(8).fill(0).map((game, i) => (
          <Game key={i} />
        ))}
      </div>
    </div>
  );
};

const Game: React.FC<{}> = (props) => {
  const history = useHistory();

  const redirectToRegistrationPage = useCallback(() => {
    history.push("/registration");
  }, [history]);

  return (
    <div className="gameContainer">
      <div className="gameBoxTitleContaier">
        <span>5 კაციანი</span>
        <div className="circleAndLineContainer">
          <div className="line" />
          <div className="circle" />
        </div>
      </div>
      <div className="secondaryTitle">
        <div className="price">
          <div className="priceNum">5000</div>
          GEL
        </div>
        მაქს.მოგება
      </div>
      <div className="userIconsContaier">
        {new Array(2).fill(0).map((u, i) => (
          <GreenUser key={i} />
        ))}
        {new Array(3).fill(0).map((u, i) => (
          <BlackUser key={i} />
        ))}
      </div>
      <button className="priceButton">5 ლარი</button>
      <button className="regbutton" onClick={redirectToRegistrationPage}>
        რეგისტრაცია
      </button>
    </div>
  );
};

const FivePlayersCard: React.FC<{}> = (props) => {
  const [startGame, setStartGame] = useState(false);

  return (
    <>
      <div className="fivePlayersCard">
        <div className="header">
          <span>
            5 კაციანი
            <span>
              <div className="line" />
              <div className="circle" />
            </span>
          </span>
          <button className="pB">5 ლარი</button>
          <div>
            5000 <span>GEL</span>
          </div>
        </div>
        <div className="boxesContainer">
          <div className="box">
            5X
            <span>კოეფიციენტი</span>
          </div>
          <div className="boxWithPoster">
            <span>კოეფიციენტი</span>
          </div>
        </div>
        <div className="usersContainer">
          {new Array(5).fill(0).map((b, i) => (
            <LightGreenUser key={i} style={{ color: "#17ff4d" }} />
          ))}
          <button onClick={() => setStartGame(true)}>დაწყება</button>
        </div>
      </div>
      {startGame && <StartGame setStartGame={setStartGame} />}
    </>
  );
};

const LoadingGame: React.FC<{}> = (props) => {
  const [number, setNumber] = useState(30);
  useEffect(() => {
    const timer = setInterval(() => {
      setNumber((x) => x - 1);
    }, 1 * 1000);
    return () => clearInterval(timer);
  }, [number]);

  return (
    <div className="fivePlayersCard">
      <div className="header">
        <span>
          5 კაციანი
          <span>
            <div className="line" />
            <div className="circle" />
          </span>
        </span>
        <button className="pB">5 ლარი</button>
        <div>
          5000 <span>GEL</span>
        </div>
      </div>
      <div style={{ margin: "0 auto" }}>გთხოვთ დაელოდოთ მოწინააღმდეგეს</div>
      <div className="usersContainer">
        {new Array(3).fill(0).map((b, i) => (
          <LightGreenUser key={i} style={{ color: "#17ff4d" }} />
        ))}
        {new Array(2).fill(0).map((b, i) => (
          <LightGreenUser key={i} style={{ color: "#1b606b" }} />
        ))}
      </div>
      <div className="progressBarWithLabel">
        {`სავარაუდო მოლოდინის დრო: ${number} წამი`}
        <LinearProgress
          className="linearProgressBar"
          classes={{
            colorPrimary: "colorPrimary",
            barColorPrimary: "barColorPrimary",
          }}
        />
      </div>
      <div className="cancelButtonContainer">
        <button onClick={() => window.location.reload(false)}>გაუქმება</button>
      </div>
    </div>
  );
};

const StartGame: React.FC<{
  setStartGame: React.Dispatch<React.SetStateAction<boolean>>;
}> = (props) => {
  const leftItems = [
    { label: "ხანგრძლივობა", expl: "2 საათი" },
    { label: "ქოინების რაოდენობა", expl: "2 ცალი" },
    { label: "მინიმალური ფასი", expl: "22 ლარი" },
    { label: "მაქსიმალური ფსონი", expl: "78 ლარი" },
  ];

  const rightItems = [
    { label: "1 ადგილი", price: "2000 GEL" },
    { label: "2 ადგილი", price: "2000 GEL" },
    { label: "3 ადგილი", price: "2000 GEL" },
  ];

  const history = useHistory();

  const onRedirectToGame = useCallback(() => {
    history.push("/start-game");
  }, [history]);

  return (
    <div className="startPlayContainer">
      <div className="leftSideContainer">
        <div
          className="leftSideItemContainer"
          style={{ padding: "0px 0 30px 0" }}
        >
          თამაში დაიწყო
        </div>
        <div className="leftSideItemsContainer">
          {leftItems.map((item, i) => (
            <div key={i} className="leftSideItemContainer">
              <div>{item.label}</div>
              <div style={{ color: "#FFE926" }}>{item.expl}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="rightSideContainer">
        <div style={{ textAlign: "right", width: "100%" }}>
          <Cancel
            style={{ cursor: "pointer" }}
            onClick={() => props.setStartGame(false)}
          />
        </div>
        <div className="boxWithPoster">
          <div>JAMING JARS</div>
        </div>
        <span>
          5000 <span>GEL</span>
        </span>
        {rightItems.map((item, i) => (
          <div key={i} className="rightITem">
            <div>
              <GreenUser style={{ marginRight: 9, width: 19 }} />
              {item.label}
            </div>
            <div style={{ color: "#FFE926" }}>{item.price}</div>
          </div>
        ))}
        <div style={{ textAlign: "right", width: "100%" }}>
          {" "}
          <button className="startButton" onClick={onRedirectToGame}>
            დაწყება
          </button>
        </div>
      </div>
    </div>
  );
};
