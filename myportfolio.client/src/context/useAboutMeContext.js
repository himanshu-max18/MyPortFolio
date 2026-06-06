import { useContext } from "react";
import { AboutMeContext } from "./AboutMeContextValue";

export const useAboutMeContext = () => {
    const context = useContext(AboutMeContext);

    if (!context) {
        throw new Error("useAboutMeContext must be used within AboutMeProvider");
    }

    return context;
};
