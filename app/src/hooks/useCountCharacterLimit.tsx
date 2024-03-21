import { useEffect, useState } from "react";

export const useCountCharacterLimit = (text: string, limit: number) => {
  const [characterLimit, setCharacterLimit] = useState(limit);

  useEffect(() => {
    setCharacterLimit(limit - text.length);
  }, [text, limit]);

  return characterLimit;
};
