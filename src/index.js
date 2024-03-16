import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Store } from './store/Store';
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={Store}>
  <BrowserRouter >
    <App  />
    <Toaster  toastOptions={{
    // Define default options
    className: '',
    duration: 5000,
    style: {
      background: 'black',
      color: 'white',
      fontWeight: 'bold',
     
      border: '1px solid white'
    }
    ,

    // Default options for specific types
    success: {
      duration: 3000,
      theme: {
        primary: 'green',
        secondary: 'white',
      },
    },
    error: {
      duration: 3000,
      theme: {
        primary: 'red',
        secondary: 'white',
      },
    },
    loading:
    {
      duration: 3000,
      theme: {
        primary: 'yellow',
        secondary: 'black',
      },
    }
  }}/>
    </BrowserRouter>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
