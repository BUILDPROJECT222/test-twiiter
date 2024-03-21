import { RefObject, useEffect } from "react";

export const useAutoresizeTextarea = (ref: RefObject<HTMLTextAreaElement>) => {
  useEffect(() => {
    const adjustHeight = () => {
      const textarea = ref.current;
      if (textarea) {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    };

    const textarea = ref.current;
    if (textarea) {
      adjustHeight();
      textarea.addEventListener("input", adjustHeight);
      return () => textarea.removeEventListener("input", adjustHeight);
    }
  }, [ref]);
};
