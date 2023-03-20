// App.js
import React from 'react';
import './App.css';
import ImageUploader from './ImageUploader';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Image Classification</h1>
        <ImageUploader />
      </header>
    </div>
  );
}

export default App;
