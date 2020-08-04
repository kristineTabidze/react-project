import React, { useCallback } from "react";
import { ImageListType } from "react-images-uploading";
import { IBlogBody, IWholeText } from "../add-new-accident";
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
  return (
    <div className="allBlogContainer">
      {blogs.map((blog, index) => (
        <Blog key={index} blog={blog} />
      ))}
      <Blog blog={retrievedBlogObject} isNew={true} />
    </div>
  );
};

const Blog: React.FC<{ blog: IBlog; isNew?: boolean }> = ({ blog, isNew }) => {
  const imgSource =
    !isNew && blog.blogMainPhoto && typeof blog.blogMainPhoto === "string"
      ? blog.blogMainPhoto
      : blog &&
        blog.blogMainPhoto &&
        typeof blog.blogMainPhoto !== "string" &&
        blog.blogMainPhoto![0] &&
        blog.blogMainPhoto[0].dataURL &&
        blog.blogMainPhoto[0].dataURL
      ? blog.blogMainPhoto[0].dataURL
      : "";

  const blogWithPhoto: IWholeText = {
    title: blog && blog.title ? blog.title : "",
    body: blog && blog.blogBody ? blog.blogBody : [],
  };

  const onClickViewBlog = useCallback(() => {
    localStorage.setItem("viewBlog", JSON.stringify(blogWithPhoto)); //add to localstorage
    window.open("/view-blog", "_self");
  }, [blogWithPhoto]);

  return (
    <div className="blogContainer" onClick={onClickViewBlog}>
      {blog && blog.title && <div>{blog.title}</div>}
      <img src={imgSource} className="blogMainPhoto" />
      {blog && (
        <div onClick={onClickViewBlog} className="enterBlogButton">
          ბლოგის ნახვა
        </div>
      )}
    </div>
  );
};
