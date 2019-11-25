import React from 'react';
import ReactDOM from 'react-dom';

import '@/styles/_index.scss';

import App from './App';


const mountNode = document.getElementById('app');
ReactDOM.render(<App />, mountNode);
