import {useState, useCallback} from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        try {
            setLoading(true);
            // just need to be for correct reading body of request on the server
            if (body) {
                // toJSON body on the front-end
                body = JSON.stringify(body);
                // say in headers that we`re sending in JSON
                headers['Content-Type'] = 'application/json';
            }
            // fetch - browser method
            // send request and wait while getting response
            const response = await fetch(url, {
                method, body, headers
            });
            // parse response
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Something goes wrong on server (error in http.hook (front.end))");
            }

            setLoading(false);
            return data;
        } catch (e) {
            setLoading(false);
            setError(e.message);
            console.log("http.hook: error after setError: ", error);
            throw e;
        }
    });

    const clearError = useCallback(() => setError(null), []);

    return {loading, request, errors: error, clearError};
};
