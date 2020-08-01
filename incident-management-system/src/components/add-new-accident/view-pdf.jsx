import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import ReactDOM from "react-dom";
import React from "react";
import "./styles/add-new.css";
import utf8 from "utf8";

const pdfFileName = `new-accident/${new Date().getFullYear()}`;

export class ViewPdf extends React.Component {
  render() {
    const retrieved = localStorage.getItem("wholeText");

    if (!retrieved) return null;
    const retrievedObject = JSON.parse(retrieved);

    if (!retrievedObject.body || !retrievedObject.title) {
      return null;
    }

    return (
      <div className="pdfContainer">
        <div>
          <PDFExport
            ref={(component) => (this.pdfExportComponent = component)}
            paperSize="auto"
            margin={40}
            fileName={pdfFileName}
            author="User"
            proxyTarget={"_blank"}
          >
            <div ref={(container) => (this.container = container)}>
              <div className="text"> {retrievedObject.title}</div>
              {retrievedObject.body.map((text, index) => (
                <div
                  key={index}
                  dangerouslySetInnerHTML={{
                    __html: `${text.text}`,
                  }}
                  className="text"
                ></div>
              ))}
            </div>
          </PDFExport>
        </div>
        <div>
          <button
            className="publishButton"
            onClick={this.exportPDFWithComponent}
          >
            PDF ფაილის გადმოწერა
          </button>
          &nbsp;
        </div>
      </div>
    );
  }
  exportPDFWithMethod = () => {
    savePDF(ReactDOM.findDOMNode(this.container), {
      paperSize: "auto",
      margin: 40,
      fileName: pdfFileName,
      proxyTarget: "_blank",
    });
  };
  exportPDFWithComponent = () => {
    this.pdfExportComponent.save();
  };
}
