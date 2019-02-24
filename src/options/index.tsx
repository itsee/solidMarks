import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Options from './options';

chrome.tabs.query({ active: true, currentWindow: true }, () => {
    ReactDOM.render(<Options />, document.querySelector('options'));
});
