import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {LinksPage} from "./pages/LinksPage";
import {AuthPage} from "./pages/AuthPage";
import {CreatePage} from "./pages/CreatePage";
import {DetailPage} from "./pages/DetailPage";

export const useRoutes = (isAuthenticated) => {
    // return (
    //     <Switch>
    //         <Route path="/create" exact>
    //             <CreatePage/>
    //         </Route>
    //         <Redirect to={"/create"}/>
    //     </Switch>
    // );

    // isAuthenticated  is permission to watch pages on some routes
    if (isAuthenticated) {
        return (
            // a-la routes in angular
            <Switch>
                {/*if there is exactly /links path*/}
                <Route path="/links" exact>
                    {/*render LinksPage*/}
                    <LinksPage/>
                </Route>
                <Route path="/create" exact>
                    <CreatePage/>
                </Route>
                <Route path="/detail/:id" exact>
                    <DetailPage/>
                </Route>
                <Route path="/" exact>
                    <Redirect to="/auth"/>
                </Route>
                <Redirect to="/create"/>
            </Switch>
        )
    } else {
        // if user isn`t authenticated
        return (
            <Switch>
                <Route path="/" exact>
                    <Redirect to="/auth"/>
                </Route>
                <Route path="/auth" exact>
                    <AuthPage/>
                </Route>
            </Switch>
        )
    }
};

