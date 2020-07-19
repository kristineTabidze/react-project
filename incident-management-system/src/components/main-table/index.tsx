import React, { useCallback, useRef, useState } from "react";
import Pagination from "react-js-pagination";
import { MailInput } from "../input/auth-input";
import "./styles/accident.css";
import classNames from "classnames";
import doubleArrow from "./styles/imgs/double-arrow.svg";
import { getDate } from "../helper-functions";
import accidents from "../../accidents.json";
import "bootstrap/dist/css/bootstrap.min.css";

interface IAccident {
  title: string;
  author: string;
  createdAt: string;
  isFixed: boolean;
  id: string;
}

export const MainTable: React.FC<{}> = (props) => {
  const [myAccidents, setMyAccidents] = useState<IAccident[]>(accidents);
  const [descOrder, setDescOrder] = useState<boolean>(false);
  const itemLength = myAccidents.length;
  const startPoint = accidents.slice(0, 5);
  const itemDisplay = 5;
  const [vissibleAccidents, setVissibleAccidents] = useState<IAccident[]>(
    startPoint
  );
  const searchText = useRef("");

  const tableNames: {
    value: "title" | "createdAt" | "author" | "isFixed";
    label: string;
  }[] = [
    { value: "title", label: "სათაური" },
    { value: "author", label: "ავტორი" },
    { value: "isFixed", label: "მოგვარებულია" },
    { value: "createdAt", label: "თარიღი" },
  ];
  const [activePage, setActivePage] = useState(1);

  const handlePageChange = useCallback((pageNumber: number) => {
    setActivePage(pageNumber);
    setVissibleAccidents(
      accidents.slice((pageNumber - 1) * itemDisplay, pageNumber * itemDisplay)
    );
  }, []);

  const onFindSearchText = useCallback(() => {
    for (const accident of accidents) {
      const booleanString = accident.isFixed ? "კი" : "არა";
      const dateString = getDate(accident.createdAt);
      if (accident.title.indexOf(searchText.current) > -1) {
        const index = accidents.indexOf(accident);
        const newPage =
          index < itemDisplay ? 1 : Math.ceil((index + 1) / itemDisplay);
        handlePageChange(newPage);
      } else if (accident.author.indexOf(searchText.current) > -1) {
        const index = accidents.indexOf(accident);
        const newPage =
          index < itemDisplay ? 1 : Math.ceil((index + 1) / itemDisplay);
        handlePageChange(newPage);
      } else if (booleanString.indexOf(searchText.current) > -1) {
        const index = accidents.indexOf(accident);
        const newPage =
          index < itemDisplay ? 1 : Math.ceil((index + 1) / itemDisplay);
        handlePageChange(newPage);
      } else if (dateString.indexOf(searchText.current) > -1) {
        const index = accidents.indexOf(accident);
        const newPage =
          index < itemDisplay ? 1 : Math.ceil((index + 1) / itemDisplay);
        handlePageChange(newPage);
      }
    }
  }, [activePage, handlePageChange, searchText.current]);

  const onEnterClick = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter") {
        onFindSearchText();
      }
    },
    [onFindSearchText]
  );

  const sortByKey = useCallback(
    (value: "title" | "createdAt" | "author" | "isFixed") => {
      let sortedItems: IAccident[] = [] as IAccident[];
      if (value === "createdAt") {
        sortedItems = vissibleAccidents.sort((a, b) => {
          const aDate = new Date(a[value]);
          const bDate = new Date(b[value]);

          if (descOrder) {
            setDescOrder(false);
            return aDate.getTime() - bDate.getTime();
          } else {
            setDescOrder(true);
            return bDate.getTime() - aDate.getTime();
          }
        });
      } else if (value === "isFixed") {
        sortedItems = vissibleAccidents.sort((a, b) => {
          if (descOrder) {
            setDescOrder(false);
            return a[value] === b[value] ? 0 : a[value] ? -1 : 1;
          } else {
            setDescOrder(true);
            return a[value] === b[value] ? 0 : b[value] ? -1 : 1;
          }
        });
      } else {
        sortedItems = vissibleAccidents.sort((a, b) => {
          if (descOrder) {
            setDescOrder(false);
            return a[value].localeCompare(b[value]);
          } else {
            setDescOrder(true);
            return b[value].localeCompare(a[value]);
          }
        });
      }
      setVissibleAccidents(sortedItems);
    },
    [vissibleAccidents, descOrder]
  );

  return (
    <div>
      <div className="searchWithButton">
        <div
          onKeyPress={(e: React.KeyboardEvent<HTMLDivElement>) =>
            onEnterClick(e)
          }
        >
          <MailInput
            placeholder={"ძებნა..."}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              (searchText.current = e.target.value)
            }
          />
        </div>
        <button onClick={onFindSearchText} className="searhButton">
          დასტური
        </button>
      </div>
      <div className="accidentTableContainer">
        <div
          className="accident"
          style={{ padding: "0 15px", background: "#9898ff" }}
        >
          {tableNames.map((table, i) => (
            <div
              key={i}
              onClick={() => sortByKey(table.value)}
              className={classNames(
                table.value === "title"
                  ? "accidentTitle"
                  : table.value === "author"
                  ? "accidentauthor"
                  : "accidentDate",
                "tableName"
              )}
            >
              {table.label}
              <img src={doubleArrow} alt="up" className="doubleArrow" />
            </div>
          ))}
        </div>
        {vissibleAccidents.map((accident) => (
          <Accident
            key={accident.id}
            accident={accident}
            searchedText={searchText.current}
          />
        ))}
        <Pagination
          activePage={activePage}
          itemsCountPerPage={itemDisplay}
          totalItemsCount={itemLength}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

const Accident: React.FC<{ accident: IAccident; searchedText: string }> = ({
  accident,
  searchedText,
}) => {
  const booleanString = accident.isFixed ? "კი" : "არა";
  const dateString = getDate(accident.createdAt);

  return (
    <div className="accident">
      <div className="accidentTitle">
        {accident.title.indexOf(searchedText) > -1 ? (
          <ItemName name={accident.title} searchQuery={searchedText} />
        ) : (
          accident.title
        )}
      </div>
      <div className="accidentauthor">
        {accident.author.indexOf(searchedText) > -1 ? (
          <ItemName name={accident.author} searchQuery={searchedText} />
        ) : (
          accident.author
        )}
      </div>
      <div className="accidentisFixed">
        {booleanString.indexOf(searchedText) > -1 ? (
          <ItemName name={booleanString} searchQuery={searchedText} />
        ) : (
          booleanString
        )}
      </div>
      <div className="accidentDate">
        {dateString.indexOf(searchedText) > -1 ? (
          <ItemName name={dateString} searchQuery={searchedText} />
        ) : (
          dateString
        )}
      </div>
    </div>
  );
};

interface IItemNameProps {
  name: string;
  searchQuery: string;
}
const ItemName: React.FC<IItemNameProps> = (props) => {
  const searchedIndex = props.name.indexOf(props.searchQuery);

  return (
    <>
      <div style={{ display: "inline-block", textAlign: "center" }}>
        {props.name.slice(0, searchedIndex)}
      </div>
      <div style={{ backgroundColor: "yellow", display: "inline-block" }}>
        {props.name.slice(
          searchedIndex,
          searchedIndex + props.searchQuery.length
        )}
      </div>
      <div style={{ display: "inline-block" }}>
        {props.name.slice(searchedIndex + props.searchQuery.length)}
      </div>
    </>
  );
};
