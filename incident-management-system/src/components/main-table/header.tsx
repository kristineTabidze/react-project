import React, { useCallback } from "react";
import { useHistory } from "react-router";
import "./styles/accident.css";

export const Header: React.FC<{}> = (props) => {
  const history = useHistory();
  const redirectToTable = useCallback(() => {
    history.push("/table");
  }, [history]);

  const redirectToCreate = useCallback(() => {
    history.push("/create");
  }, [history]);

  const redirectToAllBlogs = useCallback(() => {
    history.push("/all-blog");
  }, [history]);

  const redirectToLoginPage = useCallback(() => {
    history.push("/");
  }, [history]);

  const logout = useCallback(() => {
    localStorage.removeItem("loggedUser");
    window.open("/", "_self");
  }, []);

  const isAuthenticated = localStorage.getItem("loggedUser");

  return (
    <div className="headerContainer">
      {!isAuthenticated && (
        <div onClick={redirectToLoginPage} className="headerButton">
          შესვლა
        </div>
      )}
      <div onClick={redirectToTable} className="headerButton">
        ბლოგების ცხრილი
      </div>
      {/* <div onClick={redirectToAllBlogs} className="headerButton">
        ბლოგების ჩამონათვალი
      </div> */}
      {isAuthenticated && (
        <div onClick={redirectToCreate} className="headerButton">
          ბლოგის შექმნა
        </div>
      )}
      {isAuthenticated && (
        <div onClick={logout} className="headerButton">
          გამოსვლა
        </div>
      )}
    </div>
  );
};
