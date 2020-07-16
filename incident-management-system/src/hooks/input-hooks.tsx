import React, { useState, useCallback, ChangeEvent } from "react";

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

export const useTextArea = (
  defaultValue = "",
  cb?: (e: ChangeEvent<HTMLTextAreaElement>, value: string) => void
) => {
  const [value, setInputName] = useState(defaultValue + "");
  const onChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      if (cb) {
        cb(e, e.target.value);
      }
      setInputName(e.target.value);
    },
    [cb]
  );
  return { value, onChange };
};
