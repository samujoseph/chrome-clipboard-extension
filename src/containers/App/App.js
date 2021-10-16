
// clipboard icon url - https://www.flaticon.com/free-icon/copy_832334?term=copy&page=1&position=90
// File icon url - https://www.flaticon.com/free-icon/file_60492?term=file&page=1&position=11
// File2 icon url - https://www.flaticon.com/free-icon/file_149888?term=file&page=1&position=21
// archive file icon url - https://www.flaticon.com/free-icon/archive_2441688

import React from 'react';
import './App.css';
import BrowserActionPage from '../../pages/BrowserActionPage/BrowserActionPage';
import OptionsPage from '../../pages/OptionsPage/OptionsPage';

const pages = {
    options: OptionsPage,
    browserAction: BrowserActionPage,
};
const urlParams = new URLSearchParams(window.location.search);
const page = urlParams.get('page');
console.log({page});
const ActivePage = pages[page];

const App = () => (
    <div className="app">
        <ActivePage/>
    </div>
);

export default App;
