import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

//import App from './App_todo_Axios';

//import App from './AxiosApiPhoto'

// useState 와 useEffect hook 활용
//import App from './App_effect';

// useState 와 useEffect hook 활용 POST 
//import App from './App_effect_post';


// useReducer hook 활용
//import App from './App_custom';

// prerequisite : running server on port 8000
// cd server
// node index.js  
// http://localhost:8000/ 
// http://localhost:8000/register
// http://localhost:8000/update
// http://localhost:8000/delete

//import App from './client/UserAxiosApi'
import App from './client/AccountAxiosApi'

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
