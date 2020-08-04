import React, { useState } from "react";
import { ImageListType } from "react-images-uploading";
import { IBlogBody } from "../add-new-accident";
import { useHistory } from "react-router";
import "./styles/accident.css";
import FirstBlogPhoto from "./styles/imgs/solar-system.jpg";

export interface IBlog {
  title: string;
  blogMainPhoto: ImageListType | string;
  blogBody: IBlogBody[];
}

const blogs: IBlog[] = [
  {
    title: "მზის სისტემა",
    blogBody: [
      {
        id: "0",
        text:
          "მზის სისტემა შედგება მზისა და მის გარშემო მოძრავი გრავიტაციულად ჩაჭერილი ასტრონომიული ობიექტებისაგან. მზის სისტემის ფორმირება 4,6 მილიარდი წლის წინ, მოლეკულური ღრუბლის კოლაფსის შედეგად მოხდა. სისტემის მასის უმეტესობას (99,86%) მზე შეიცავს. ოთხი შედარებით პატარა შიდა პლანეტა — მერკური, ვენერა, დედამიწა და მარსი (მათ ასევე მოიხსენიებენ, როგორც კლდოვანი პლანეტები), ძირითადად, ქვისა და მეტალისგან შედგება, ხოლო ორი უდიდესი პლანეტა — იუპიტერი და სატურნი, ძირითადად, წყალბადითა და ჰელიუმითაა გაჯერებული. ორ უშორეს პლანეტაზე — ურანსა და ნეპტუნზე მეთანის, წყალბადისა და ამიაკის ყინულების დიდი მარაგია, რის გამოც მათ ზოგჯერ „ყინულის გიგანტებად“ მოიხსენიებენ. მზის სისტემაში ასევე არის რეგიონები, სადაც შედარებით პატარა ობიექტები ბინადრობს. ასტეროიდული სარტყელი, რომელიც მარსსა და იუპიტერს შორის მდებარეობს, კლდოვანი პლანეტების მსგავსია, რადგან მათ შედგენილობაში ძირითადად ქვა და მეტალი შედის, თუმცა ზომით ძალიან პატარებია, პლანეტებად რომ ჩაითვალოს.[1] ნეპტუნის ორბიტის გაღმა კოიპერის სარტყელი — მიმოფანტული დისკო მდებარეობს. მასში ე. წ. ტრანს-ნეპტუნისეული ობიექტები ბინადრობს, რომლებიც წყლის, მეთანისა და ამიაკის ყინულებითაა გაჯერებული. ამ არეალში 5 ცალკეული ობიექტი გამოიყოფა: ცერერა, პლუტონი ჰომეა, მაკემაკე და ერისი. ისინი საკმარისად დიდებია იმისთვის, რომ თავიანთი გრავიტაციით მრგვალი (მთლად მრგვალი არა, მომრგვალო) ფორმა მიიღონ.[1] სწორედ ამიტომ, მათ ჯუჯა პლანეტებად მოიხსენიებენ.",
      },
    ],
    blogMainPhoto: FirstBlogPhoto,
  },
];

export const AllBlog: React.FC<{ blog: IBlog }> = ({ blog }) => {
  const retrievedBlog = localStorage.getItem("newBlog");
  const retrievedBlogObject: IBlog = retrievedBlog && JSON.parse(retrievedBlog);
  const history = useHistory();
  return (
    <div className="allBlogContainer">
      {blogs.map((blog, index) => (
        <Blog key={index} blog={blog} />
      ))}
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
            typeof retrievedBlogObject.blogMainPhoto[0] !== "string"
              ? retrievedBlogObject.blogMainPhoto[0].dataURL
              : ""
          }
          className="blogMainPhoto"
        />
        <div
          onClick={() => history.push("/view-blog")}
          className="enterBlogButton"
        >
          ბლოგის ნახვა
        </div>
      </div>
    </div>
  );
};

const Blog: React.FC<{ blog: IBlog }> = ({ blog }) => {
  const [isClickedOnViewBlog, setClickedOnViewWholeBlog] = useState(false);
  return (
    <div className="blogContainer">
      <div>{blog.title}</div>
      <img
        src={
          blog.blogMainPhoto && typeof blog.blogMainPhoto === "string"
            ? blog.blogMainPhoto
            : ""
        }
        className="blogMainPhoto"
      />
      <div
        // onClick={() => history.push("/view-blog")}
        onClick={() => setClickedOnViewWholeBlog(true)}
        className="enterBlogButton"
      >
        ბლოგის ნახვა
      </div>
    </div>
  );
};
