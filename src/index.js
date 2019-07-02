import React from 'react';
import ReactDOM from 'react-dom';
import './index.module.scss';
import App from './container/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();
