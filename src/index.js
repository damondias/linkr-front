import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ResetStyle from './styles/ResetStyle';
import GlobalStyle from './styles/GlobalStyle';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ResetStyle />
    <GlobalStyle />  { /* configs gerais pode mudar ou comentar/deletar para testar alguma feature*/}
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
