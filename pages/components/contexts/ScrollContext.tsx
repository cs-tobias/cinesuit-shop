import React, { createContext, useContext, useState } from "react";

interface ScrollContextProps {
  scrollPositions: Record<string, number>;
  setScrollPosition: (url: string, position: number) => void;
}

const ScrollContext = createContext<ScrollContextProps>(null!);

export const useScroll = () => useContext(ScrollContext);

export const ScrollProvider: React.FC = ({ children }) => {
  const [scrollPositions, setScrollPositions] = useState<
    Record<string, number>
  >({});

  const setScrollPosition = (url: string, position: number) => {
    setScrollPositions((prev) => ({ ...prev, [url]: position }));
  };

  return (
    <ScrollContext.Provider value={{ scrollPositions, setScrollPosition }}>
      {children}
    </ScrollContext.Provider>
  );
};
