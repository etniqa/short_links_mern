/*
import React from "react";
import Link from "react-router-dom/modules/Link";



export const LinksList = ({links}) => {
    if (!links.length) {
        return (<p className="center"> There are no links</p>);
    }
    return (
        <table>
            <thead>
            <tr>
                <th>index</th>
                <th>Original</th>
                <th>Shorted</th>
                <th className="text-accent-2">Open</th>
            </tr>
            </thead>

            <tbody>
            {links.map((link, ind)=> {
                return (
                    <tr key={link._id}>
                        <td>{ind + 1}</td>
                        <td>{link.from}</td>
                        <td>{link.to}</td>
                        <td>
                            <Link to={`/detail/${link._id}`}/>
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    );
};
*/





import React, {useEffect} from "react";
import {Link} from "react-router-dom";

export const LinksList = (links) => {
    useEffect(() => {

    });
    return (

        <table>
            <thead>
            <tr>
                <th>index</th>
                <th>Original</th>
                <th>Shorted</th>
                <th className="text-accent-2">Open</th>
            </tr>
            </thead>

            <tbody>
            {links.links.map((link, ind)=> {

                return (

                   <tr key={link._id}>
                        <td>{ind + 1}</td>
                        <td>{link.from}</td>
                        <td>{link.to}</td>
                        <td>
                            <Link to={`/detail/${link._id}`}> Open </Link>
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
};

