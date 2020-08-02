import React, {
  ChangeEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";
import ImageUploading, { ImageListType } from "react-images-uploading";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getItemStyle,
  getListStyle,
  mapOrder,
  reorder,
} from "../helper-functions";
import { Textarea } from "../input/auth-input";
import { IAccident } from "../main-table";
import { Header } from "../main-table/header";
import "./styles/add-new.css";
import { ReactQuillWithoutImageUploadingPackage } from "./rich-text";
import { IBlog } from "../main-table/all-blog";

export interface IBlogBody {
  id: string;
  text: string;
}
export interface IWholeText {
  title: string;
  body: IBlogBody[];
}

export const AddNewAccident: React.FC<{}> = (props) => {
  const [textTitle, setTextTitle] = useState("");
  const [wholeText, setWholeText] = useState<IWholeText>({} as IWholeText);
  const [blogMainPhoto, setBlogMainPhoto] = useState<ImageListType>([]);
  const [wholeBody, setWholeBody] = useState<IBlogBody[]>([] as IBlogBody[]);

  const onTextTitleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setTextTitle(e.target.value);
    },
    []
  );

  const [items, setItems] = useState<{ element: JSX.Element; id: string }[]>([
    {
      id: "1",
      element: (
        <ReactQuillWithoutImageUploadingPackage
          setWholeBody={setWholeBody}
          id={"1"}
        />
      ),
    },
  ]);
  const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const newItems: any = reorder(
      items,
      result.source.index,
      result.destination.index
    );
    setItems(newItems);
  };

  const onAddNewBox = useCallback(() => {
    const newId = +items[items.length - 1].id + 1 + "";
    setItems((x) => [
      ...x,
      {
        element: (
          <ReactQuillWithoutImageUploadingPackage
            setWholeBody={setWholeBody}
            id={newId}
          />
        ),
        id: newId,
      },
    ]);
  }, [items]);

  const onPublish = useCallback(() => {
    const itemIds: string[] = [];
    let newAccidentForTable: IAccident = {} as IAccident;
    items.map((item) => {
      itemIds.push(item.id);
    });

    const orderedBodyTexr:
      | {
          id: string;
          text: string;
        }[]
      | undefined = mapOrder(wholeBody, itemIds, "id");

    const newAccident = {
      title: textTitle,
      body: orderedBodyTexr ? orderedBodyTexr : [],
    };
    setWholeText(newAccident);

    newAccidentForTable = {
      title: textTitle,
      isFixed: true,
      id: "20",
      author: "user",
      createdAt: "10/ 06/2020",
    };

    const blogWithPhoto: IBlog = {
      title: textTitle,
      blogMainPhoto: blogMainPhoto,
      blogBody: orderedBodyTexr ? orderedBodyTexr : [],
    };

    localStorage.setItem("wholeText", JSON.stringify(newAccident)); //add to localstorage
    localStorage.setItem("newAccident", JSON.stringify(newAccidentForTable)); //add to localstorage
    localStorage.setItem("newBlog", JSON.stringify(blogWithPhoto)); //add to localstorage

    window.open("/view");
  }, [wholeBody, textTitle, items, wholeText, blogMainPhoto]);

  const onChange = useCallback((imageList: ImageListType) => {
    // data for submit
    setBlogMainPhoto(imageList);
  }, []);

  console.log(blogMainPhoto);

  return (
    <>
      <div className="addNewContainer">
        <div className="textAreaContainer">
          <Textarea
            onChange={onTextTitleChange}
            defaultValue={textTitle}
            placeHolder="სათაური"
          />
        </div>
        <ImageUploading
          onChange={onChange}
          maxNumber={maxNumber}
          multiple
          maxFileSize={maxMbFileSize}
          acceptType={["jpg", "gif", "png"]}
        >
          {({ imageList, onImageUpload, onImageRemoveAll }) => (
            <div className="blogMainPhotoWithButtons">
              <button onClick={onImageUpload} className="uploadImage">
                ბლოგის მთავარი სურათის ატვირთვა
              </button>
              {imageList.map((image) => (
                <div key={image.key}>
                  <img src={image.dataURL} className="blogMainPhoto" />
                  <div className="blogMainPhotoButtons">
                    <button onClick={image.onUpdate} className="uploadImage">
                      შეცვლა
                    </button>
                    <button onClick={image.onRemove} className="uploadImage">
                      წაშლა
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ImageUploading>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        {item.element}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div className="addButton" onClick={onAddNewBox}>
          <div>+</div>
        </div>
        <div onClick={onPublish} className="publishButton">
          ბლოგის შექმნა
        </div>
      </div>
    </>
  );
};

const RichTextWithPhoto: React.FC<{
  setWholeBody: (args: any) => void;
  id: string;
}> = ({ setWholeBody, id }) => {
  const quillRef = useRef<ReactQuill>(null);
  const [textBody, setTextBody] = useState("");
  const [isImageUploaderVissible, setImageUploaderVissible] = useState(false);

  const modules: StringMap = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: "1" }, { size: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["image", "video"],
          ["clean"],
        ],
        handlers: {
          image: () => {
            isImageUploaderVissible
              ? setImageUploaderVissible(false)
              : setImageUploaderVissible(true);
          },
        },
        ImageResize: {
          displaySize: true,
          modules: ["Resize", "DisplaySize", "Toolbar"],
          handleStyles: {
            backgroundColor: "black",
            border: "none",
            color: "white",
            // other camelCase styles for size display
          },
          displayStyles: {
            backgroundColor: "black",
            border: "none",
            color: "white",
            // other camelCase styles for size display
          },
        },
      },
    }),
    [isImageUploaderVissible]
  );

  const onChange = useCallback((imageList: ImageListType) => {
    // data for submit

    var range = quillRef.current && quillRef.current.getEditor().getSelection();
    imageList.map((image) => {
      if (quillRef.current && range) {
        quillRef.current
          .getEditor()
          .insertEmbed(range.index, "image", image.dataURL, "user");
      }
    });
  }, []);

  const onChangeQuillText = useCallback(
    (quilText: string) => {
      setTextBody(quilText);
      setWholeBody((text: IBlogBody[]) => {
        let index;
        for (let i = 0; i < (text ? text.length : 1); i++) {
          if (text && text[i] && text[i].id === id) {
            index = i;
            break;
          }
        }
        const textBeforeIndex = text.slice(0, index);
        return [...textBeforeIndex, { id: id, text: quilText }];
      });
    },
    [id, setWholeBody]
  );

  return (
    <>
      <ReactQuill
        className={"textBody"}
        ref={quillRef}
        defaultValue={textBody}
        onChange={onChangeQuillText}
        modules={modules}
      />

      <>
        {isImageUploaderVissible && (
          <ImageUploading
            onChange={onChange}
            maxNumber={maxNumber}
            multiple
            maxFileSize={maxMbFileSize}
            acceptType={["jpg", "gif", "png"]}
          >
            {({ imageList, onImageUpload, onImageRemoveAll }) => (
              <div>
                <button onClick={onImageUpload} className="uploadImage">
                  სურათების ატვირთვა
                </button>
              </div>
            )}
          </ImageUploading>
        )}
      </>
    </>
  );
};

export interface StringMap {
  [key: string]: any;
}

const maxNumber = 10;
const maxMbFileSize = 5 * 1024 * 1024; // 5Mb
