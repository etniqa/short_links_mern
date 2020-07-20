import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {LinksList} from "../components/LinksList";

export const LinksPage = () => {
    const [links, setLinks] = useState();
    const {request, loading} = useHttp();
    const {token} = useContext(AuthContext);

    const fetchLinks = useCallback(async () => {
        console.log("rendering...");
        try {
            const fetched = await request("/api/link/getAll", "GET", null, {
                authorization: `Bearer ${token}`
            });
            await setLinks(fetched.links);
            console.log("links in LinksPage: ", links);
        } catch (e) {
            console.log("error in LinksPage: ", e.message);
        }
    }, []);

    useEffect( () => {
        fetchLinks();
    }, []);

    if (loading) {
        return (<Loader/>);
    }

    return(
        <>
            <h1>LinksPage</h1>
            {!loading && links && <LinksList links={links} />}
        </>
    )
};
