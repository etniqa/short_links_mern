import {useCallback} from "react";

export const useMessage  = () => {
    return useCallback((text) => {
        // window.M.toast({html: text}); = from materializecss plate with text in it
        console.log("from useMessage", text);
        if (window.M && text) {
            window.M.toast({html: text});
        }
    });
};
