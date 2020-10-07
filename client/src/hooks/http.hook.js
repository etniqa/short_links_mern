import {useState, useCallback, useEffect} from "react";

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
            let data = await response.json();

            if (!response.ok) {
                throw ({...data, status: 'bad'});
            } else {
                data = {...data, status: 'good'};
            }

            setLoading(false);

            return data;

        } catch (e) {
            console.log("http.hook: exception in useHttp:", e);
            setLoading(false);
            // doesn't work
            // setError(e.message);
            throw e;
        }
    });

    // no need, cause setError doesn't work
    const clearError = useCallback(() => setError(null), []);
    // const clearError = useEffect(() => setError(null), []);

    return {loading, request, errors: error, clearError, setError};
};
