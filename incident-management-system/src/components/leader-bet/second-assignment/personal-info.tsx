import React, { useState } from "react";
import "./styles/assignments.css";
import { ReactComponent as Time } from "./styles/imgs/time.svg";
import { ReactComponent as Cherry } from "./styles/imgs/cherry.svg";
import { ReactComponent as Cash } from "./styles/imgs/cash.svg";
import { ReactComponent as Dollar } from "./styles/imgs/dollar.svg";
import { ReactComponent as GreenUser } from "./styles/imgs/user-green.svg";
import { ReactComponent as Cancel } from "./styles/imgs/cancel.svg";

import Popup from "reactjs-popup";

export const PersonalInfo: React.FC<{
  setIsClickedOnViewHistory: React.Dispatch<React.SetStateAction<boolean>>;
}> = (props) => {
  return (
    <>
      <div className="personalInfo">
        <div style={{ width: "100%", textAlign: "right" }}>
          <button
            className="timeButton"
            onClick={() => props.setIsClickedOnViewHistory(true)}
          >
            <Time style={{ marginRight: 4 }} />
            ისტორია
          </button>
        </div>
        <div className="moneyAvatar">
          <Cherry style={{ color: "#FFFF00" }} />
        </div>
        <span> Muscul Bones</span>
        <div className="monCont">
          <div className="iconandLab">
            <Cash style={{ marginRight: 8 }} />
            ბალანსი
          </div>
          <div>995.65 GEL</div>
        </div>
        <div className="monCont" style={{ background: "#217C8B" }}>
          <div className="iconandLab">
            <Dollar style={{ marginRight: 8 }} />
            უფასო სპინები
          </div>
          <div>18 GEL</div>
        </div>
      </div>
    </>
  );
};

export const UserHistory: React.FC<{
  setIsClickedOnViewHistory: React.Dispatch<React.SetStateAction<boolean>>;
}> = (props) => {
  return (
    <div className="historyContainer">
      <span>
        ისტორია{" "}
        <Cancel
          style={{ cursor: "pointer" }}
          onClick={() => props.setIsClickedOnViewHistory(false)}
        />
      </span>
      <div className="header">
        <div className="button">თარიღი</div>
        <div className="button">ღირებუ.ი</div>
        <div className="button">რა Xი</div>
        <div className="button">რაოდენობა</div>
        <div className="button" style={{ width: 205, textAlign: "left" }}>
          მონაწილეები
        </div>
        <div className="button">ადგილი</div>
        <div className="button">მოგებული</div>
      </div>
      {new Array(9).fill(0).map((u, i) => (
        <OneUserHistory key={i} />
      ))}
    </div>
  );
};

const OneUserHistory: React.FC<{}> = (props) => {
  return (
    <div className="oneHistoryContainer">
      <div className="button">23 იანვ.</div>
      <div className="button">2 ლარი</div>
      <div className="button">100X</div>
      <div className="button">5 კაციანი</div>
      <div className="buttonUsers">
        <GreenUser />
        <span> ნოდარა, ელდარა, ემზარა, ზაირა,მერაბა</span>
      </div>
      <div className="button">10</div>
      <div className="button">5000 ლარი</div>
    </div>
  );
};
