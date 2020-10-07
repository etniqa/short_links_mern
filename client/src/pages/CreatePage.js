import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";

import {AuthContext} from "../context/AuthContext";
import { useHistory } from 'react-router-dom'

export const CreatePage = () => {
    const authContext = useContext(AuthContext);
    const [link, setLink] = useState('');
    const {request, errors} = useHttp();
    const history = useHistory();

    // just for nerf bugs
    useEffect(() => {
        window.M.updateTextFields();
    });

    const pressHandler = async (event) => {
        console.log("pressed: ", event.key);
        if (event.key === 'Enter') {
            await createLink();
        }
    };

    const createLink = async () => {
        try {
            console.log("token: ", authContext.token);
            const data = await request('/api/link/generate', 'POST', {from: link}, {
                authorization: "Bearer " + authContext.token
            });
            console.log("data from /link/generate on front: ", data);
            history.push(`/detail/${data.link._id}`);

        } catch (e) {
            console.log("Error in CreatePage.js (front): ", e.message);
        }
    }



    return (
        <div className="row">
            <h1>Create</h1>
            <div className="col s9 offset-s2" style={{paddingTop: '2rem'}}>
                <div className="input-field">
                    <input
                        placeholder="input link"
                        id="link"
                        type="text"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        onKeyPress={pressHandler}
                    />
                    <label htmlFor="link">Enter link</label>
                    <button className="btn yellow darken-4"
                        onClick={createLink}
                    >
                        Create
                    </button>
                </div>

            </div>
        </div>
    )
};
