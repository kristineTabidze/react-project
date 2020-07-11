import React from "react";
import "./test.css";

interface IMiyvarxarmec {
  age: number;
  name: string;
}

const test: IMiyvarxarmec = {
  age: 1,
  name: "Daniel+Krisitne",
};

export const Test: React.FC<{}> = (props) => {
  return (
    <>
      <div className={"bla"}>miyvarxar</div>
      <div>{test.age}</div>
      <div>{test.name}</div>
    </>
  );
};
