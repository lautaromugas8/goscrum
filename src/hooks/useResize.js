import { useEffect, useState } from "react";

export const useResize = () => {
  const [isPhone, setIsPhone] = useState(window.innerWidth < 900);

  const handleResize = () => {
    setIsPhone(window.innerWidth < 900);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  return { isPhone };
};
