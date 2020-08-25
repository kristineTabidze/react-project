import React, { useState } from "react";
import "./styles/assignments.css";
import { ReactComponent as GreenUser } from "./styles/imgs/user-green.svg";

export const AssignmentHeader: React.FC<{
  setHasBlur: React.Dispatch<React.SetStateAction<boolean>>;
}> = (props) => {
  const [activeButton, setActiveButton] = useState<"all" | "3" | "5">("all");

  const Buttons: { isActive: boolean; label: string; onClick: () => void }[] = [
    {
      isActive: activeButton === "all",
      label: "ALL GAMES",
      onClick: () => setActiveButton("all"),
    },
    {
      isActive: activeButton === "3",
      label: "ONLY 3 PLAYER",
      onClick: () => setActiveButton("3"),
    },
    {
      isActive: activeButton === "5",
      label: "ONLY 5 PLAYER",
      onClick: () => {
        setActiveButton("5");
        props.setHasBlur(true);
      },
    },
  ];

  return (
    <div className="assignmentHeaderContainer">
      {Buttons.map((b, i) => (
        <HeaderButtonsSelector
          isActive={b.isActive}
          label={b.label}
          key={i}
          onClick={b.onClick}
        />
      ))}
      <span>
        <GreenUser style={{ marginRight: 8 }} />
        Online Players: 4364
      </span>
    </div>
  );
};

const HeaderButtonsSelector: React.FC<{
  isActive: boolean;
  label: string;
  onClick: () => void;
}> = ({ isActive, label, onClick }) => {
  return (
    <div
      className={isActive ? "activeButton" : "aHeaderButton"}
      onClick={onClick}
    >
      <span>{label}</span>
      {isActive && <div className="dividedLine" />}
    </div>
  );
};
