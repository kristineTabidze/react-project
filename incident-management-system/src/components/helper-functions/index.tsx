import React from "react";

export const getDate = (date: Date) => {
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
