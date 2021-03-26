import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
// Mount Function to start up the app

const mount = (el) => {
    ReactDOM.render(
        <App></App>,
        el
    );
};


// IF we are in development and in isolation 
// call mount immediately
if(process.env.NODE_ENV == 'development'){
    const devRoot = document.querySelector('#_marketing-dev-root');
    if(devRoot){
        mount(devRoot);
    }
}

export {mount}

// We are running thourc container