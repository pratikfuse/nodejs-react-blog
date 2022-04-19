import React, { useEffect } from "react";
import api from "../../services/axios";


export const ArticleListPage: React.FC = () => {

    useEffect(() => {
        
        api.get(`/articles`).then(() => {
            console.log('recieved');
        }).catch(e => {
            console.log('error');
            console.log(e);
        })
    });

    const handleLogout= (() => {
        api.post(`/auth/logout`, {}).then(console.log).catch(console.log);
    })

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
            This is the articles page
        </div>
    )
}