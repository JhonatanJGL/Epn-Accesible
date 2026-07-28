import { useEffect, useState } from "react";

// Keeps non-critical widgets out of the initial render and lets the browser
// finish the first screen before it downloads and initializes them.
const DeferredSection = ({ children, delay = 1200 }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const showSection = () => setIsReady(true);
    const idleCallback = window.requestIdleCallback?.(showSection, {
      timeout: delay,
    });
    const timeoutId = idleCallback
      ? null
      : window.setTimeout(showSection, delay);

    return () => {
      if (idleCallback) window.cancelIdleCallback?.(idleCallback);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [delay]);

  return isReady ? children : null;
};

export default DeferredSection;
