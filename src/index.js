import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './provider/AuthProvider';




ReactDOM.render(
    <AuthProvider>
        <App />
    </AuthProvider>,
    document.getElementById('root')
);

