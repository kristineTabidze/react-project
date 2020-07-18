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
import { Bla } from "./bla";
import "./styles/add-new.css";

interface IWholeText {
  title: string;
  body: { id: string; text: string }[];
}

export const AddNewAccident: React.FC<{}> = (props) => {
  const [textTitle, setTextTitle] = useState("");
  const [wholeText, setWholeText] = useState<IWholeText>({} as IWholeText);
  const [wholeBody, setWholeBody] = useState<{ id: string; text: string }[]>(
    [] as { id: string; text: string }[]
  );

  const onTextTitleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setTextTitle(e.target.value);
    },
    []
  );

  const [items, setItems] = useState<{ element: JSX.Element; id: string }[]>([
    {
      id: "1",
      element: <RichTextWithPhoto setWholeBody={setWholeBody} id={"1"} />,
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
        element: <RichTextWithPhoto setWholeBody={setWholeBody} id={newId} />,
        id: newId,
      },
    ]);
  }, [items]);

  const onPublish = useCallback(() => {
    const itemIds: string[] = [];
    items.map((item) => {
      itemIds.push(item.id);
    });

    const orderedBodyTexr: {
      id: string;
      text: string;
    }[] = mapOrder(wholeBody, itemIds, "id");

    const newObj = {
      title: textTitle,
      body: orderedBodyTexr,
    };
    setWholeText(newObj);

    localStorage.setItem("wholeText", JSON.stringify(wholeText)); //add to localstorage
  }, [wholeBody, textTitle, items, wholeText]);

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

      <Bla wholeBody={wholeText} />
    </div>
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

  const onFinishWriting = useCallback(() => {
    setWholeBody((x: any) => [...x, { id: id, text: textBody }]);
  }, [id, setWholeBody, textBody]);

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
                <button onClick={onImageUpload} className="uploadImage">
                  სურათების ატვირთვა
                </button>
                {/* <button onClick={onImageRemoveAll}>სურათების წაშლა</button> */}
                {/* {imageList.map((image) => {
                  setImages((x) => imageList);
                })} */}
              </div>
            )}
          </ImageUploading>
        )}
      </>
      <button className="uploadImage" onClick={onFinishWriting}>
        დასტური
      </button>
    </>
  );
};

export interface StringMap {
  [key: string]: any;
}

const maxNumber = 10;
const maxMbFileSize = 5 * 1024 * 1024; // 5Mb