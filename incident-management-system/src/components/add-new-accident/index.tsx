import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";
import { GeneralInput } from "../input/auth-input";
import "./styles/add-new.css";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUploader from "react-images-upload";
import doubleArrow from "./styles/double-arrow.svg";

import ImageUploading, {
  ImageUploadingPropsType,
  ImageListType,
  ImageType,
} from "react-images-uploading";

import Resizer from "react-image-file-resizer";

const getItems = (count: number) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

// a little function to help us with reordering the result
const reorder = (list: any, startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: "100%",
});

interface IWholeText {
  title: string;
  body: string[];
}

export const AddNewAccident: React.FC<{}> = (props) => {
  const [textTitle, setTextTitle] = useState("");
  const [images, setImages] = useState<ImageListType>([] as ImageListType);
  const quillRef = useRef<ReactQuill>(null);
  const [textBody, setTextBody] = useState("");
  const [isImageUploaderVissible, setImageUploaderVissible] = useState(false);
  const [wholeText, setWholeText] = useState<IWholeText>({} as IWholeText);
  const [wholeBody, setWholeBody] = useState<string[]>([] as string[]);

  const onTextTitleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTextTitle(event.target.value);
    },
    []
  );

  const [items, setItems] = useState<{ element: JSX.Element; id: string }[]>([
    {
      element: (
        <GeneralInput onChange={onTextTitleChange} defaultValue={textTitle} />
      ),
      id: "1",
    },
    {
      element: <RichTextWithPhoto setWholeBody={setWholeBody} />,
      id: "2",
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

  const modules: StringMap = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: "1" }, { size: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image", "video"],
          ["clean"],
        ],
        handlers: {
          image: () => {
            isImageUploaderVissible
              ? setImageUploaderVissible(false)
              : setImageUploaderVissible(true);
          },
        },
      },
    }),
    [isImageUploaderVissible]
  );

  const onChange = (imageList: ImageListType) => {
    // data for submit
    setImages(imageList);
  };

  return (
    <>
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
      {/* <ReactQuill
        className={"blogBody"}
        ref={quillRef}
        defaultValue={textBody}
        onChange={setTextBody}
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
                <button onClick={onImageUpload}>სურათების ატვირთვა</button>
                <button onClick={onImageRemoveAll}>სურათების წაშლა</button>

                {imageList.map((image) => {
                  setImages((x) => imageList);
                })}
              </div>
            )}
          </ImageUploading>
        )}

        {images.map((image) => (
          <div key={image.key}>
            <img src={image.dataURL} width={200} />
            <button onClick={image.onUpdate}>რედაქტირება</button>
            <button onClick={image.onRemove}>წაშლა</button>
          </div>
        ))}
      </> */}
    </>
  );
};

const RichTextWithPhoto: React.FC<{ setWholeBody: (args: any) => void }> = ({
  setWholeBody,
}) => {
  const [images, setImages] = useState<ImageListType>([] as ImageListType);
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
          ["link", "image", "video"],
          ["clean"],
        ],
        handlers: {
          image: () => {
            isImageUploaderVissible
              ? setImageUploaderVissible(false)
              : setImageUploaderVissible(true);
          },
        },
      },
    }),
    [isImageUploaderVissible]
  );

  const onChange = (imageList: ImageListType) => {
    // data for submit
    var range = quillRef.current && quillRef.current.getEditor().getSelection();
    console.log(imageList);
    // var value = prompt("What is the image URL");
    imageList.map((image) => {
      if (quillRef.current && range) {
        quillRef.current
          .getEditor()
          .insertEmbed(range.index, "image", image.dataURL, "user");
      }
    });

    setImages(imageList);
    setWholeBody((x: any) => [...x, imageList]);
  };

  return (
    <>
      <ReactQuill
        className={"blogBody"}
        ref={quillRef}
        defaultValue={textBody}
        onChange={setTextBody}
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
                <button onClick={onImageUpload}>სურათების ატვირთვა</button>
                <button onClick={onImageRemoveAll}>სურათების წაშლა</button>

                {imageList.map((image) => {
                  setImages((x) => imageList);
                  setWholeBody((x: any) => [...x, imageList]);
                })}
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
