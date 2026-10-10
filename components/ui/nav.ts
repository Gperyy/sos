import { createContext, useContext } from "react";

export type TabType = "home" | "about" | "aircraft" | "events" | "media" | "fly" | "contact";

/** Sekme değiştirir ve yeni sayfanın başına döner. */
export const NavContext = createContext<(tab: TabType) => void>(() => {});
export const useNav = () => useContext(NavContext);
