import React from "react";

export function checkEmail(emailAddress: string) {
  var sQtext = "[^\\x0d\\x22\\x5c\\x80-\\xff]";
  var sDtext = "[^\\x0d\\x5b-\\x5d\\x80-\\xff]";
  var sAtom =
    "[^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+";
  var sQuotedPair = "\\x5c[\\x00-\\x7f]";
  var sDomainLiteral = "\\x5b(" + sDtext + "|" + sQuotedPair + ")*\\x5d";
  var sQuotedString = "\\x22(" + sQtext + "|" + sQuotedPair + ")*\\x22";
  var sDomain_ref = sAtom;
  var sSubDomain = "(" + sDomain_ref + "|" + sDomainLiteral + ")";
  var sWord = "(" + sAtom + "|" + sQuotedString + ")";
  var sDomain = sSubDomain + "(\\x2e" + sSubDomain + ")*";
  var sLocalPart = sWord + "(\\x2e" + sWord + ")*";
  var sAddrSpec = sLocalPart + "\\x40" + sDomain; // complete RFC822 email address spec
  var sValidEmail = "^" + sAddrSpec + "$"; // as whole string

  var reValidEmail = new RegExp(sValidEmail);

  return reValidEmail.test(emailAddress);
}

export const getDate = (myDate: string) => {
  const date = new Date(myDate);
  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const mapOrder = (array: any[], order: any[], key: any) => {
  array.sort(function (a, b) {
    var A = a[key],
      B = b[key];

    if (order.indexOf(A) > order.indexOf(B)) {
      return 1;
    } else {
      return -1;
    }
  });

  return array;
};

export const reorder = (list: any, startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

export const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  borderRadius: 15,
  background: isDragging ? "#dde1e7" : "white",
  textAlign: "center",
  ...draggableStyle,
});

export const getListStyle = (isDraggingOver: boolean) => ({
  borderRadius: 28,
  background: isDraggingOver ? "#b3c1e7" : "rgb(115 144 225)",
  padding: `${grid}px ${2 * grid}px`,
  paddingTop: 2 * grid,
  width: "calc(100% - 300px)",
});
