import React from 'react';
import logo from './logo.svg';
import './App.css';
import FileUploader from './components/FileUploader';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save tpgoo reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <FileUploader />
      </header>

    </div>
  );
}

export default App;
