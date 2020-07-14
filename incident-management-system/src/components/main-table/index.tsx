import React, { useCallback, useRef, useState } from "react";
import Pagination from "react-js-pagination";
import { MailInput } from "../input/auth-input";
import "./styles/accident.css";

const getDate = (date: Date) => {
  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

interface IAccident {
  title: string;
  author: string;
  createdAt: Date;
  isFixed: boolean;
  id: string;
}

const accidents: IAccident[] = [
  {
    title: "ბბბბ",
    author: "ქრისტინე ტაბ",
    createdAt: new Date("2019-06-5"),
    isFixed: false,
    id: "1",
  },
  {
    title: "აააა",
    author: "ქრისტ ტაბ",
    createdAt: new Date("2019-06-10"),
    isFixed: true,
    id: "2",
  },
  {
    title: "ღდ",
    author: "ქ ტაბ",
    createdAt: new Date("2019-06-22"),
    isFixed: false,
    id: "3",
  },
  {
    title: "გასას",
    author: "ქრისტინე ტაბ",
    createdAt: new Date("2019-06-28"),
    isFixed: true,
    id: "4",
  },
  {
    title: "წქქ",
    author: "ქრისტინე ტაბ",
    createdAt: new Date("2019-06-28"),
    isFixed: false,
    id: "5",
  },
  {
    title: "6 incidenti",
    author: "ქრისტ ტაბ",
    createdAt: new Date("2019-06-28"),
    isFixed: true,
    id: "6",
  },
  {
    title: "7 ინციდენტი",
    author: "ქ ტაბ",
    createdAt: new Date("2019-06-28"),
    isFixed: false,
    id: "7",
  },
  {
    title: "8 ინციდენტი",
    author: "ქრისტინე ტაბ",
    createdAt: new Date("2019-06-28"),
    isFixed: true,
    id: "8",
  },
  {
    title: "9 ინციდენტი",
    author: "ქრისტ ტაბ",
    createdAt: new Date("2019-06-28"),
    isFixed: true,
    id: "9",
  },
  {
    title: "10 ინციდენტი",
    author: "ქ ტაბ",
    createdAt: new Date("2019-06-28"),
    isFixed: false,
    id: "10",
  },
  {
    title: "11 ინციდენტი",
    author: "ქრისტინე ტაბ",
    createdAt: new Date("2019-06-28"),
    isFixed: true,
    id: "11",
  },
  {
    title: "12 ინციდენტი",
    author: "ქრისტინე ტაბ",
    createdAt: new Date("2019-06-28"),
    isFixed: false,
    id: "12",
  },
];

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
  const AccidentKeys = Object.keys(myAccidents[0]);
  const [activePage, setActivePage] = useState(1);

  const totalPages = itemLength / itemDisplay;

  const handlePageChange = useCallback((pageNumber: number) => {
    setActivePage(pageNumber);
    setVissibleAccidents(
      accidents.slice((pageNumber - 1) * itemDisplay, pageNumber * itemDisplay)
    );
  }, []);

  const onFindSearchText = useCallback(() => {
    for (const accident of accidents) {
      if (accident.title.indexOf(searchText.current) > -1) {
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
    (value: any) => {
      if (value === "createdAt") {
        const visible = vissibleAccidents.sort((a, b) => {
          if (descOrder) {
            setDescOrder(false);
            return a.createdAt.getTime() - b.createdAt.getTime();
          } else {
            setDescOrder(true);
            return b.createdAt.getTime() - a.createdAt.getTime();
          }
        });
        setVissibleAccidents(visible);
      } else if (value === "title") {
        const visible = vissibleAccidents.sort((a, b) => {
          if (descOrder) {
            setDescOrder(false);
            return a.title.localeCompare(b.title);
          } else {
            setDescOrder(true);
            return b.title.localeCompare(a.title);
          }
        });
        console.log(visible, "vis");
        setVissibleAccidents(visible);
      }
    },
    [vissibleAccidents, descOrder]
  );

  return (
    <div>
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
        <div className="accident">
          <div className="accidentTitle" onClick={() => sortByKey("title")}>
            სათაური
          </div>
          <div className="accidentauthor">ავტორი</div>
          <div className="accidentisFixed">მოგვარებულია</div>
          <div className="accidentDate" onClick={() => sortByKey("createdAt")}>
            თარიღი
          </div>
        </div>
        {vissibleAccidents.map((accident) => (
          <Accident key={accident.id} accident={accident} />
        ))}
        <div>
          <Pagination
            activePage={activePage}
            itemsCountPerPage={itemDisplay}
            totalItemsCount={itemLength}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

const Accident: React.FC<{ accident: IAccident }> = ({ accident }) => {
  return (
    <div className="accident">
      <div className="accidentTitle">{accident.title}</div>
      <div className="accidentauthor">{accident.author} </div>
      <div className="accidentisFixed">{accident.isFixed ? "კი" : "არა"}</div>
      <div className="accidentDate">{getDate(accident.createdAt)}</div>
    </div>
  );
};
