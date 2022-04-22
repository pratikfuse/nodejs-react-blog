import React from 'react';
import { useApplication } from './hooks/applicationContext';

export const ProtectedRoute: React.FC = ({ children }) => {
    const { isAuthenticated } = useApplication();
    if (!isAuthenticated) {
        return (
            <div>Must be logged in</div>
        )
    }
    return <>{children}</>;
}