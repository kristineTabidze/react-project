import React from "react";
import { ImageListType } from "react-images-uploading";
import { IBlogBody } from "../add-new-accident";
import { useHistory } from "react-router";
import "./styles/accident.css";

export interface IBlog {
  title: string;
  blogMainPhoto: ImageListType;
  blogBody: IBlogBody[];
}

export const AllBlog: React.FC<{}> = (props) => {
  const retrievedBlog = localStorage.getItem("newBlog");
  const retrievedBlogObject: IBlog = retrievedBlog && JSON.parse(retrievedBlog);
  const history = useHistory();
  return (
    <div className="allBlogContainer">
      <div className="blogContainer">
        <div>
          {retrievedBlogObject && retrievedBlogObject.title
            ? retrievedBlogObject.title
            : ""}
        </div>
        <img
          src={
            retrievedBlogObject &&
            retrievedBlogObject.blogMainPhoto &&
            retrievedBlogObject.blogMainPhoto[0] &&
            retrievedBlogObject.blogMainPhoto[0].dataURL
          }
          className="blogMainPhoto"
        />
        <div
          onClick={() => history.push("/view-blog")}
          className="enterBlogButton"
        >
          შესვლა
        </div>
      </div>
    </div>
  );
};
