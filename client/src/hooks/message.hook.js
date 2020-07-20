import {useCallback} from "react";

export const useMessage  = () => {
    return useCallback((text) => {
        // window.M.toast({html: text}); = from materializecss plate with text in it
        if (window.M && text) {
            window.M.toast({html: text});
        }
    });
};
