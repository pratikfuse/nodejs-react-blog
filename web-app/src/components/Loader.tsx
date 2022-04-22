import React, { FC } from 'react';
import { Spinner } from 'react-bootstrap';

const Loader: FC = () => {
    return (
        <div className="loader">
            <Spinner animation='border' className='spin' />
        </div>
    );
};
export default Loader;
