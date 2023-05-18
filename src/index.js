import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode> //이 부분으로 감쌀 시 console.log 가 두번 호출된다.
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);

reportWebVitals();
