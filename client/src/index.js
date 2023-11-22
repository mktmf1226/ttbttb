import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from "axios";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

axios.defaults.baseURL = "http://192.168.0.71:8000"; // 다슬컴
// axios.defaults.baseURL = "http://192.168.0.76:8000"; // 성연언니컴
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
