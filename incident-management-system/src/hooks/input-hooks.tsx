import React, { useState, useCallback } from "react";

export const useInput = <
  T extends HTMLInputElement | HTMLTextAreaElement = HTMLInputElement
>(
  defaultValue: string | number = "",
  cb?: (e: React.ChangeEvent<T>, value: string) => void
) => {
  const [value, setInputName] = useState(defaultValue + "");
  const onChange = useCallback(
    (e: React.ChangeEvent<T>) => {
      if (cb) {
        cb(e, e.target.value);
      }
      setInputName(e.target.value);
    },
    [cb]
  );
  return { value, onChange };
};
