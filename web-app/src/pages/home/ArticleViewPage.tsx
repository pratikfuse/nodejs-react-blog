import React from 'react';
import {useLocation} from 'react-router-dom';


export const ArticleViewPage : React.FC = (props) => {

    const location = useLocation();
    console.log(location);
    return <div>
        article view page
    </div>
}