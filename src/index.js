import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Store } from './store/Store';
import { Toaster } from 'react-hot-toast';
import LogoStart from './components/main/common/logoStart';



const root = ReactDOM.createRoot(document.getElementById('root'));

// Render LogoStart first
root.render(
  <Provider store={Store}>
    <BrowserRouter>
      <LogoStart />
    </BrowserRouter>
  </Provider>
);

// Replace LogoStart with App after 2 seconds
setTimeout(() => {
  root.render(
    
    <Provider store={Store}>
    
      <BrowserRouter>
        <App />
        <Toaster toastOptions={{
          className: '',
          duration: 5000,
          style: {
            background: 'black',
            color: 'white',
            fontWeight: 'bold',
            border: '1px solid white'
          },
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
          loading: {
            duration: 3000,
            theme: {
              primary: 'yellow',
              secondary: 'black',
            },
          }
        }} />
      </BrowserRouter>
    </Provider>,
  );
}, 2000);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
