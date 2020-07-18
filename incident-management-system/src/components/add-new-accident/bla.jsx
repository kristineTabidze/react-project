import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import ReactDOM from "react-dom";
import React from "react";

const pdfFileName = `new-accident/${new Date().getFullYear()}`;

export class Bla extends React.Component {
  render() {
    const retrieved = localStorage.getItem("wholeText");

    if (!retrieved) return null;
    const retrievedObject = JSON.parse(retrieved);

    if (!retrievedObject.body || !retrievedObject.title) {
      return null;
    }

    return (
      <div>
        <div>
          <button className="k-button" onClick={this.exportPDFWithComponent}>
            ფაილის გადმოწერა
          </button>
          &nbsp;
        </div>
        <div>
          <PDFExport
            ref={(component) => (this.pdfExportComponent = component)}
            paperSize="auto"
            margin={40}
            fileName={pdfFileName}
            author="User"
          >
            <div ref={(container) => (this.container = container)}>
              <div> {retrievedObject.title}</div>
              {retrievedObject.body.map((text, index) => (
                <div
                  key={index}
                  dangerouslySetInnerHTML={{
                    __html: `${text.text}`,
                  }}
                ></div>
              ))}
            </div>
          </PDFExport>
        </div>
      </div>
    );
  }
  exportPDFWithMethod = () => {
    savePDF(ReactDOM.findDOMNode(this.container), {
      paperSize: "auto",
      margin: 40,
      fileName: pdfFileName,
    });
  };
  exportPDFWithComponent = () => {
    this.pdfExportComponent.save();
  };
}
