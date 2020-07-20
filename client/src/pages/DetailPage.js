import React, {useCallback, useContext, useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {LinkCard} from "../components/LinkCard";
import {Loader} from "../components/Loader";

export const DetailPage = () => {
    const [link, setLink] = useState(null);
    // get id from browser link:                 <Route path="/detail/:id" exact>
    const {request, loading} = useHttp();
    const {token} = useContext(AuthContext);
    const linkId = useParams().id;

    const getLink = useCallback( async () => {
        try {
            let fetched = await request(`/api/link/${linkId}`, 'GET', null, {
                authorization: "Bearer " + token
            });
            await setLink(fetched.link);
        } catch (e) {
            console.log("Error in DetailPage.js (frontend): ", e.message);
        }
    }, [token, linkId, request]);

    // after creating
    useEffect(() => {
       getLink();
    }, []);

    if (loading) {
        // doesn't work correctly
        return <Loader />
    }

    return (
        <>
            <h1>DetailPage</h1>
            {/*if I`m not loading and already get response from db (have link), have already link then show LinkCard*/}
            {!loading && link && <LinkCard link={link} />}
        </>
    )
};
