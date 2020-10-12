import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";

import './authPage.css'
import {useMessage} from "../hooks/message.hook";

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const [respFromBackend, setRespFromBackend] = useState(null);
    const {loading, request} = useHttp();    // get loading, request, error vars from useHttp() (communicate with server)
    // this hook is using for looking after to error (we made it for showing mistakes)
    // truly don`t know how to work this code
    // there is a HOOK (don`t know for what is using), BUT
    // form = email and password fields; setForm = method for change form
    const [form, setForm] = useState({
        email: '', password: ''
    });

    // don't know for what this meth
    useEffect(() => {
        window.M.updateTextFields();
    });

/*    const message = useMessage();
    useEffect(() => {
        // TODO: why doesnt show error using window.M.toast
        message(error);
        // clearError();
    }, [error, message]);
    useEffect(() => setError("try to set error"));*/

    useEffect(() => {
        console.log("AuthPage, useEffect: error: ", respFromBackend);
    }, [respFromBackend]);

    const changeHandler = (event) => {
        // there is name of field in event.target.name and in event.target.value - value of field
        setForm({...form, [event.target.name]: event.target.value});
    };

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            setRespFromBackend(data);
        } catch (e) {
            console.log("AuthPage, registerHandler: caught exception", e);
            setRespFromBackend(e);
        }
    };

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});
            auth.login(data.token, data.userId);
        } catch (e) {
            console.log("AuthPage, loginHandler: caught exception", e);
            setRespFromBackend(e);
        }
    };

    const showResp = (resp) => {
        if (resp.status === 'bad') {
            const errors = respFromBackend.messages.map(er => er.msg)
            return (
                <div
                    className="error-message message-resp"
                    style={{width: "100%"}}
                >
                    {errors.map(er => (
                        <div>
                            <span className="resp-text">{er}</span>
                            <br/>
                        </div>
                    ))}
                </div>
            );
        } else {
            console.log()
            const successMsgs = respFromBackend.messages.map(mes => mes.msg)
            return (
                <div
                    className="success-message message-resp"
                    style={{width: "100%"}}
                >
                    {successMsgs.map(msg => (
                        <div>
                            <span className="resp-text">{msg}</span>
                            <br/>
                        </div>
                    ))}
                </div>
            );
        }
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Make shorter your link</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Sign in | Sign up</span>
                        <div>
                            <div className="input-field">
                                <input
                                    placeholder="enter email"
                                    id="email"
                                    type="text"
                                    name="email"
                                    value={form.email}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="input-field">
                                <input
                                    placeholder="enter password"
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="password">Email</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className="btn yellow darken-4" style={{marginRight: "10px"}}
                                disabled={loading}
                                onClick={loginHandler}
                        >Login
                        </button>
                        <button className="btn lighten-1 black-text"
                                disabled={loading}
                                onClick={registerHandler}
                        >Registration
                        </button>
                    </div>
                    {!!respFromBackend && showResp(respFromBackend)}
                </div>
            </div>
        </div>
    );
};
