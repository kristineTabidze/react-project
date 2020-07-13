import React, {
  useState,
  useCallback,
  useEffect,
  ReactEventHandler,
  useRef,
} from "react";
import "./styles/accident.css";
import Pagination from "react-js-pagination";
import { MailInput } from "../input/auth-input";
// import SearchBar from "react-js-search";
// import ReactSearchBox from "react-search-box";
// import SearchField from "react-search-field";

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
    title: "1 ინციდენტი",
    author: "ქრისტინე ტაბ",
    createdAt: new Date("2019-06-28"),
    isFixed: false,
    id: "1",
  },
  {
    title: "2 ინციდენტი",
    author: "ქრისტ ტაბ",
    createdAt: new Date("2019-06-10"),
    isFixed: true,
    id: "2",
  },
  {
    title: "3 ინციდენტი",
    author: "ქ ტაბ",
    createdAt: new Date("2019-06-22"),
    isFixed: false,
    id: "3",
  },
  {
    title: "4 ინციდენტი",
    author: "ქრისტინე ტაბ",
    createdAt: new Date("2019-06-28"),
    isFixed: true,
    id: "4",
  },
  {
    title: "5 ინციდენტი",
    author: "ქრისტინე ტაბ",
    createdAt: new Date("2019-06-28"),
    isFixed: false,
    id: "5",
  },
  {
    title: "6 ინციდენტი",
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

  const onClick = useCallback(() => {
    for (const accident of accidents) {
      if (accident.title.indexOf(searchText.current) > -1) {
        const index = accidents.indexOf(accident);
        console.log(searchText);
        const newPage = Math.ceil((index + 1) % itemDisplay);
        handlePageChange(newPage);
        console.log(activePage, "activePage", newPage);
      }
    }
  }, [activePage, handlePageChange]);

  const sortByKey = useCallback((value: any) => {
    if (value === "createdAt") {
      const visible = vissibleAccidents.sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      );
      setVissibleAccidents(visible);
      setDescOrder(true);
      console.log(vissibleAccidents, "vissibleAccidents", visible);
    }
  }, []);

  useEffect(() => {
    if (descOrder) {
      const visible = vissibleAccidents.sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      );
      setVissibleAccidents(visible);
    }
  }, [descOrder, vissibleAccidents]);

  return (
    <div>
      <div>
        <MailInput
          placeholder={"ძებნა"}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            (searchText.current = e.target.value)
          }
        />
        <button onClick={onClick}>done</button>
        <div className="accident">
          <div className="accidentTitle">სათაური</div>
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
