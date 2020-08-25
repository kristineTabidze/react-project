import React, { useState } from "react";
import "./styles/assignments.css";

const Buttons: { label: string }[] = [
  {
    label: "ნომერი",
  },
  {
    label: "დრო",
  },
  {
    label: "კოეფიციენტი",
  },
  {
    label: "მომხმარებელი",
  },
  {
    label: "მოგებული თანხა",
  },
];

export const ListHeader: React.FC<{}> = (props) => {
  return (
    <div className="listHeader">
      {Buttons.map((b, i) => (
        <div key={i} className="listButton">
          {b.label}
        </div>
      ))}
    </div>
  );
};
