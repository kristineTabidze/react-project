import React, { useState } from "react";
import "./styles/assignments.css";

export const DashboardHeader: React.FC<{
  setIsClickedOnViewHistory: React.Dispatch<React.SetStateAction<boolean>>;
}> = (props) => {
  const [activeButton, setActiveButton] = useState<
    "top" | "leaderBoard" | "history" | "terms"
  >("top");

  const Buttons: { isActive: boolean; label: string; onClick: () => void }[] = [
    {
      isActive: activeButton === "top",
      label: "ტოპ მოგებები",
      onClick: () => setActiveButton("top"),
    },
    {
      isActive: activeButton === "leaderBoard",
      label: "ლიდერბორდი",
      onClick: () => setActiveButton("leaderBoard"),
    },
    {
      isActive: activeButton === "history",
      label: "ისტორია",
      onClick: () => {
        setActiveButton("history");
        props.setIsClickedOnViewHistory(true);
      },
    },
    {
      isActive: activeButton === "terms",
      label: "წესები",
      onClick: () => setActiveButton("terms"),
    },
  ];

  return (
    <div className="dashboardHeader">
      {Buttons.map((b, i) => (
        <HeaderButtonsSelector
          isActive={b.isActive}
          label={b.label}
          key={i}
          onClick={b.onClick}
        />
      ))}
    </div>
  );
};

const HeaderButtonsSelector: React.FC<{
  isActive: boolean;
  label: string;
  onClick: () => void;
}> = ({ isActive, label, onClick }) => {
  return (
    <div className={"dashboardHeaderButton"} onClick={onClick}>
      <span>{label}</span>
      {isActive && (
        <div>
          <div className="dashboardLine" /> <div className="dashboardCircle" />
        </div>
      )}
    </div>
  );
};
