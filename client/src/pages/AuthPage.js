import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";
import Redirect from "react-router-dom/es/Redirect";

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const {loading, request, error, clearError} = useHttp();    // get loading, request, error vars from useHttp() (communicate with server)
    // this hook is using for looking after to error (we made it for showing mistakes)
    // truly don`t know how to work this code
    // there is a HOOK (don`t know for what is using), BUT
    // form = email and password fields; setForm = method for change form
    const [form, setForm] = useState({
        email: '', password: ''
    });

    const message = useMessage();

    // don't know for what this meth
    useEffect(() => {
        window.M.updateTextFields();
    });

    useEffect(() => {
        // console.log("Error in AuthPage: ", error);
        // TODO: why doesnt show error using window.M.toast
        message(error);
        // clearError();
    }, [error, message]);

    const changeHandler = (event) => {
        // there is name of field in event.target.name and in event.target.value - value of field
        setForm({...form, [event.target.name]: event.target.value});
    };

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});

        } catch (e) {
            // console.log("catch error in AuthPage: ", e.message);
        }
    };

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});
            auth.login(data.token, data.userId);
            // redirect doesn`t work (
            return <Redirect to='/create' />
        } catch (e) {
            // console.log("catch error in AuthPage: ", e.message);
        }
    };

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Make shorter your link</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Card Title</span>
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
                </div>
            </div>
        </div>
    )
};
