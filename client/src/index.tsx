import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

declare interface NodeModule {
  hot: {
    accept(path?: () => void, callback?: () => void): void;
  };
}
declare global {
  interface Window {
    MediaRecorder: any;
  }
}

window.URL = window.URL || window.webkitURL;

window.MediaRecorder = require('audio-recorder-polyfill');
window.MediaRecorder.encoder = require('audio-recorder-polyfill/mpeg-encoder');
window.MediaRecorder.prototype.mimeType = 'audio/mpeg';

const rootEl = document.getElementById('root');
ReactDOM.render(<App />, rootEl);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    ReactDOM.render(<NextApp />, rootEl);
  });
}
