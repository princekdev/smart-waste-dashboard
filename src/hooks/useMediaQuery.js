import { useEffect, useState } from "react";

/** Tracks whether a CSS media query currently matches. Used to switch the
 * sidebar between a fixed rail (desktop) and a slide-over drawer (mobile). */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return matches;
}
