import React from "react";
import { ListHeader } from "./list-header";
import "./styles/assignments.css";
import { ReactComponent as Cherry } from "./styles/imgs/cherry.svg";
import { ReactComponent as Time } from "./styles/imgs/time.svg";
import { ReactComponent as GreenUser } from "./styles/imgs/user-green.svg";

export const ListContainer: React.FC<{}> = (props) => {
  return (
    <div>
      <ListHeader />
      <List />
    </div>
  );
};

const List: React.FC<{}> = (props) => {
  const items: {
    id: string;
    time: string;
    user: string;
    price: string;
    cf: string;
  }[] = [
    {
      id: "#4412452",
      time: "12:33",
      user: "Nodarard...",
      price: "33.55",
      cf: "2.37",
    },
  ];

  return (
    <div>
      {new Array(9).fill(items[0]).map((item, i) => (
        <ListItem
          key={i}
          id={item.id}
          price={item.price}
          time={item.time}
          user={item.user}
          cf={item.cf}
          bgColor={i % 2 === 0 ? "#252630" : "#272936"}
        />
      ))}
    </div>
  );
};

const ListItem: React.FC<{
  id: string;
  time: string;
  user: string;
  price: string;
  cf: string;
  bgColor: string;
}> = (props) => {
  return (
    <div className="listItem" style={{ background: props.bgColor }}>
      <div className="listButton">
        <Cherry style={{ color: "#454FB4", width: 23 }} />
        <div className="dl" />
        {props.id}
      </div>
      <div className="listButton">
        <Time style={{ marginRight: 8 }} />
        {props.time}
      </div>
      <div className="listButton">
        <button className="cfButton">{props.cf}</button>
      </div>
      <div className="listButton">
        <GreenUser style={{ marginRight: 8 }} />
        {props.user}
      </div>
      <div className="listButton">
        <button className="priceButton">{props.price}</button>
      </div>
    </div>
  );
};
