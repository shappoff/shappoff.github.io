import React from "react";
import {throttle} from "./throttle";

export const useWindowSize = (ms: number = 200) => {

    const [windowSize, setWindowSize] = React.useState<{width: number; height: number}>({
        width: 0,
        height: 0,
    });

    React.useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        const throttledHandleResize = throttle(handleResize, ms);
        window.addEventListener("resize", throttledHandleResize);
        handleResize();
        return () => window.removeEventListener("resize", throttledHandleResize);
    }, []);

    return windowSize;
};
