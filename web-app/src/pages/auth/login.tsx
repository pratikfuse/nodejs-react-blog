import React, {FC} from 'react';
import config from '../../config';

export const LoginPage: FC = () => {
    function handleOnClick(){
        window.open(`${config.baseUrl}/authenticate`, "_self");
    }

    return (
        <div>
            <button onClick={handleOnClick}>
                Login with Github
            </button>
        </div>
    )
}