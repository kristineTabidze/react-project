import React from "react";
import { IWholeText } from "../add-new-accident";

export const ViewBlog: React.FC<{}> = (props) => {
  const retrieved = localStorage.getItem("viewBlog");
  if (!retrieved) return null;
  const retrievedObject: IWholeText = JSON.parse(retrieved);

  return (
    <div className="pdfContainer">
      <div>{retrievedObject.title}</div>
      {retrievedObject.body.map((text, index) => (
        <div
          key={index}
          dangerouslySetInnerHTML={{
            __html: `${text.text}`,
          }}
          className="text"
        />
      ))}
    </div>
  );
};
