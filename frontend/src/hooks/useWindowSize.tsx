import { useEffect, useState } from "react";

interface Size {
  width: number | undefined;
  height: number | undefined;
}

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<Size>({
    width: undefined,
    height: undefined,
  });
  const [widthStr, setWidthStr] = useState<string>("");
  const [heightStr, setHeightStr] = useState<string>("");
  const [isMobileWidth, setIsMobileWidth] = useState<boolean>(true);

  useEffect(() => {
    if (windowSize.width !== undefined && windowSize.height !== undefined) {
      setWidthStr(`${windowSize.width}px`);
      setHeightStr(`${windowSize.height}px`);
      setIsMobileWidth(windowSize.width < 1024);
    }
  }, [windowSize]);

  // add into useEffect below if error
  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    width: windowSize.width,
    height: windowSize.height,
    widthStr,
    heightStr,
    isMobileWidth,
  };
};

export default useWindowSize;
