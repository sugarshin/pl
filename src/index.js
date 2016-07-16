import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';

function Hello(props) {
  return <h1>{props.name}</h1>;
}

ReactDOM.render(<Hello name="AOI" />, document.querySelector('#app-root'));
