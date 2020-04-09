import React from 'react';
// JSX (JavaScript e XML) -> HTML intergrado dentro do javascript

import './global.css';

import Routes from './routes';

//componente do react --> um componente no react é uma função que retorna HTML
//pode ter funcionalidades de javascript, css etc. etc.
function App() {
  // o useState retorna um array com 2 posições
  // array [valor, função de atualização desse valor]
  return (
    <Routes />
  );
}

export default App;
