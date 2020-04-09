import React from 'react'; // importa o react
import ReactDOM from 'react-dom'; //importa a integração do react com o document object model do browser (a árvore de elementos)
import App from './App'; // importa a app (app.js) para a variavel app

//então estamos a utilizar o reactDOM para renderizar o app.js
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);