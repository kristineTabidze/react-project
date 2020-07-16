import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  ChangeEvent,
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
import { GeneralInput, Textarea } from "../input/auth-input";
import "./styles/add-new.css";

const reorder = (list: any, startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  borderRadius: 15,
  background: isDragging ? "#dde1e7" : "white",
  textAlign: "center",
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: boolean) => ({
  borderRadius: 28,
  background: isDraggingOver ? "#b3c1e7" : "rgb(115 144 225)",
  padding: `${grid}px ${2 * grid}px`,
  paddingTop: 2 * grid,
  width: "calc(100% - 300px)",
});

interface IWholeText {
  title: string;
  body: string[];
}

export const AddNewAccident: React.FC<{}> = (props) => {
  const [textTitle, setTextTitle] = useState("");
  const [wholeText, setWholeText] = useState<IWholeText>({} as IWholeText);
  const [wholeBody, setWholeBody] = useState<string[]>([] as string[]);

  const onTextTitleChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setTextTitle(event.target.innerText);
    },
    []
  );

  const [items, setItems] = useState<{ element: JSX.Element; id: string }[]>([
    {
      element: <RichTextWithPhoto setWholeBody={setWholeBody} />,
      id: "1",
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
      { element: <RichTextWithPhoto setWholeBody={setWholeBody} />, id: newId },
    ]);
  }, [items]);

  const onPublish = useCallback(() => {
    setWholeText({ body: wholeBody, title: textTitle });
  }, [wholeBody, textTitle]);

  return (
    <div className="addNewContainer">
      <div className="textAreaContainer">
        <Textarea
          onChange={onTextTitleChange}
          defaultValue={textTitle}
          placeHolder="სათაური"
        />
      </div>
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
        გამოქვეყნება
      </div>
    </div>
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
      },
    }),
    [isImageUploaderVissible]
  );

  const onChange = useCallback(
    (imageList: ImageListType) => {
      // data for submit
      var range =
        quillRef.current && quillRef.current.getEditor().getSelection();
      imageList.map((image) => {
        if (quillRef.current && range) {
          quillRef.current
            .getEditor()
            .insertEmbed(range.index, "image", image.dataURL, "user");
        }
      });

      setImages(imageList);
      setWholeBody((x: any) => [...x, imageList]);
    },
    [setWholeBody]
  );

  useEffect(() => {
    setWholeBody((x: any) => [...x, textBody]);
  }, [textBody, setWholeBody]);

  return (
    <>
      <ReactQuill
        className={"textBody"}
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
                {/* <button onClick={onImageRemoveAll}>სურათების წაშლა</button> */}
                {imageList.map((image) => {
                  setImages((x) => imageList);
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
