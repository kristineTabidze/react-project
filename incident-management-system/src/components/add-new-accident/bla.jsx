import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import ReactDOM from "react-dom";

import React from "react";

export class Bla extends React.Component {
  render() {
    return (
      <div>
        <div className="example-config">
          <button className="k-button" onClick={this.exportPDFWithComponent}>
            Export with component
          </button>
          &nbsp;
          <button className="k-button" onClick={this.exportPDFWithMethod}>
            Export with method
          </button>
        </div>
        <div className="border rounded p-2">
          <PDFExport
            ref={(component) => (this.pdfExportComponent = component)}
            paperSize="auto"
            margin={40}
            fileName={`Report for ${new Date().getFullYear()}`}
            author="KendoReact Team"
          >
            <div ref={(container) => (this.container = container)}>
              <h3 className="text-center">Monthly report</h3>
              <hr className="k-hr" />
              {this.props.wholeBody.map((b) => (
                <div
                  key={b.id}
                  dangerouslySetInnerHTML={{
                    __html: `${b.text}`,
                  }}
                >
                  {/* {b.text.replace(/(<([^>]+)>)/gi, "")} */}
                </div>
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
      fileName: `Report for ${new Date().getFullYear()}`,
    });
  };
  exportPDFWithComponent = () => {
    this.pdfExportComponent.save();
  };
}
