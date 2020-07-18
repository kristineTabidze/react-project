import React, {
  ChangeEvent,
  useCallback,
  useEffect,
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
import "./styles/add-new.css";
// import { Document, Page } from "react-pdf";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
  BlobProvider,
} from "@react-pdf/renderer";
import ReactPDF from "@react-pdf/renderer";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import ReactHtmlParser from "react-html-parser";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import ReactDOM from "react-dom";
import { Bla } from "./bla";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

interface IWholeText {
  title: string;
  body: { id: string; text: string }[];
}

// function print(quality = 1) {
//   const filename = "ThisIsYourPDFFilename.pdf";
//   const bla: HTMLElement | null =
//     document.querySelector("#nodeToRenderAsPDF") || null;
//   if (!bla) return;
//   html2canvas(bla, {
//     scale: quality,
//   }).then((canvas: any) => {
//     let pdf = new jsPDF("p", "mm", "a4");
//     pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 211, 298);
//     pdf.save(filename);
//   });
// }

const print = () => {
  const input: HTMLElement | null =
    document.getElementById("nodeToRenderAsPDF") || null;
  if (!input) return;
  html2canvas(input).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "JPEG", 0, 0);
    // pdf.output('dataurlnewwindow');
    pdf.save("download.pdf");
  });
};

export const AddNewAccident: React.FC<{}> = (props) => {
  const [textTitle, setTextTitle] = useState("");
  const [wholeText, setWholeText] = useState<IWholeText>({} as IWholeText);
  const [wholeBody, setWholeBody] = useState<{ id: string; text: string }[]>(
    [] as { id: string; text: string }[]
  );
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [numPages, setNumPages] = useState<any>();

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

    setWholeText({ body: orderedBodyTexr, title: textTitle });
  }, [wholeBody, textTitle, items]);

  const onDocumentLoadSuccess = useCallback((numPages: any) => {
    setNumPages(numPages);
  }, []);

  console.log(wholeBody, "wholeBody");

  const pdf = useRef("");

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
      <BlobProvider document={<MyDocument text={wholeText.body} />}>
        {({ url }) => (
          <a href={url || ""} target="_blank">
            Open in new tab
          </a>
        )}
      </BlobProvider>
      <div id="nodeToRenderAsPDF">
        {" "}
        {wholeBody.map((b) => (
          <div
            key={b.id}
            // dangerouslySetInnerHTML={{
            //   __html: `${b.text}`,
            // }}
          >
            {b.text.replace(/(<([^>]+)>)/gi, "")}
          </div>
        ))}
      </div>
      <img
        src={
          "/9j/4AAQSkZJRgABAgAAAQABAAD…xlb0u2AxTYav5lBayqzuJV2sH6uoyDumPuZtHZBNn6r+J/9k="
        }
      />
      <Bla wholeBody={wholeBody} />
      <div id={"pdf"}>
        <PDFExport
          // ref={pdf}
          paperSize="auto"
          margin={40}
          fileName={`Report for ${new Date().getFullYear()}`}
          author="KendoReact Team"
        >
          <div>dddd</div>
        </PDFExport>
      </div>
    </div>
  );
};

// const exportPDFWithMethod = () => {
//   savePDF(ReactDOM.findDOMNode(container), {
//     paperSize: "auto",
//     margin: 40,
//     fileName: `Report for ${new Date().getFullYear()}`,
//   });
// };
const exportPDFWithComponent = () => {
  const el = document.getElementById("pdf");
  if (!el) return null;
  // el.save();
};

const MyDocument: React.FC<{
  text: {
    id: string;
    text: string;
  }[];
}> = ({ text }) => {
  if (!text)
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>Section #2</Text>
          </View>
        </Page>
      </Document>
    );
  else
    return (
      // <Document>
      //   <Page style={styles.body}>
      //     {" "}
      //     <Text style={styles.title}>Terms Of Service</Text>{" "}
      //     {this.props.body.split(/(\r\n|\n|\r)/g).map((line) => (
      //       <Text style={styles.text}> {line} </Text>
      //     ))}
      //   </Page>
      // </Document>

      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            {text.map((text) => (
              <>
                <Text>
                  {" "}
                  {text.text.split(/(\r\n|\n|\r)/g).map((line) => (
                    <Text style={styles.text}> {line} </Text>
                  ))}
                  {/* ${ReactHtmlParser(text.text)} */}
                </Text>
                {/* <Text>{text.text.replace(/(<([^>]+)>)/gi, "")}</Text> */}
                <Image
                  allowDangerousPaths={true}
                  source={
                    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD…xlb0u2AxTYav5lBayqzuJV2sH6uoyDumPuZtHZBNn6r+J/9k="
                  }
                  src={
                    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD…xlb0u2AxTYav5lBayqzuJV2sH6uoyDumPuZtHZBNn6r+J/9k="
                  }
                />
              </>
            ))}
          </View>
          <View style={styles.section}>
            <Text>Section #2</Text>
          </View>
        </Page>
      </Document>
    );
};

const RichTextWithPhoto: React.FC<{
  setWholeBody: (args: any) => void;
  id: string;
}> = ({ setWholeBody, id }) => {
  const [images, setImages] = useState<ImageListType>([] as ImageListType);
  const [text, setText] = useState<string>("");
  const [wholeTextWithImage, setWholeTextWithImage] = useState<
    { text: string; image: string }[]
  >([{}] as [{ text: string; image: string }]);
  const quillRef = useRef<ReactQuill>(null);
  const [textBody, setTextBody] = useState("");
  const [isImageUploaderVissible, setImageUploaderVissible] = useState(false);

  console.log(textBody);

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

      const editor = quillRef.current && quillRef.current.getEditor();
      const textbody: string = (editor && editor.getText()) || "";
      setWholeTextWithImage([{ text: textbody, image: "" }]);

      var range =
        quillRef.current && quillRef.current.getEditor().getSelection();
      imageList.map((image) => {
        if (quillRef.current && range) {
          quillRef.current
            .getEditor()
            .insertEmbed(range.index, "image", image.dataURL, "user");
          setWholeTextWithImage((x) => [
            ...x,
            { image: image.dataURL, text: textBody },
          ]);
        }
      });

      setImages(imageList);
      // setWholeBody((x: any) => [...x, { id: id, text: imageList }]);
    },
    [setWholeBody, id]
  );

  console.log(quillRef.current);

  const onFinishWriting = useCallback(() => {
    setWholeBody((x: any) => [...x, { id: id, text: textBody }]);
  }, [id, setWholeBody, textBody]);

  const onChangeText = () => {
    const editor = quillRef.current && quillRef.current.getEditor();
    // const unprivilegedEditor =
    //   quillRef.current && quillRef.current.makeUnprivilegedEditor(editor);
    // You may now use the unprivilegedEditor proxy methods
    // const inpText = unprivilegedEditor.getText();
    console.log(
      "unprivilegedEditor.getText()",
      editor && editor.getText(),
      editor && editor
    );
  };

  useEffect(() => {
    // setWholeBody((x: any) => [...x, { id: id, text: textBody }]);
    // onChangeText();
    console.log(wholeTextWithImage, "bl");
  }, [id, setWholeBody, wholeTextWithImage, textBody]);

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
