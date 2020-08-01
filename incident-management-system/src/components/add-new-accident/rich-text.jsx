import { ImageDrop } from "quill-image-drop-module";
import ImageResize from "quill-image-resize-module-react";
import React, { useCallback, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./styles/add-new.css";

Quill.register("modules/imageDrop", ImageDrop);
Quill.register("modules/imageResize", ImageResize);

export const ReactQuillWithoutImageUploadingPackage = ({
  setWholeBody,
  id,
}) => {
  const quillRef = useRef(ReactQuill);
  const [textBody, setTextBody] = useState("");

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],

      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { align: [] },
      ],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ direction: "rtl" }], // text direction,

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme

      ["link", "image"],

      ["clean"], // remove formatting button
    ],
    imageResize: {
      // parchment: Quill.import('parchment'),
      modules: ["Resize", "DisplaySize", "Toolbar"],
      toolbarStyles: {
        backgroundColor: "black",
        border: "none",
        color: "white",
        // other camelCase styles for size display
      },
      toolbarButtonStyles: {
        // ...
      },
      toolbarButtonSvgStyles: {
        // ...
      },
    },
    imageDrop: true,
  };

  const onChangeQuillText = useCallback(
    (quilText) => {
      setTextBody(quilText);
      setWholeBody((text) => {
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
    <div>
      <ReactQuill
        className={"textBody"}
        ref={quillRef}
        defaultValue={textBody}
        onChange={onChangeQuillText}
        modules={modules}
      />
    </div>
  );
};
