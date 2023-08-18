import './App.css';
import React, { useState } from 'react';
import {Filters} from './Components/Filters.js'
import {Graph} from './Components/Graph.js'

function App() {
  const [parentData, setParentData] = useState([]);
  const handleChildDataChange = (data) => {
    setParentData(data); // Update parent's state with data from child
    console.log("app me", typeof(data))
  };

  return (
    <div className="App">
      <header className="App-header">
        <Filters  handleChildDataChange={handleChildDataChange}/>
        {parentData && <Graph dataa={parentData} />}
      </header>
    </div>
  );
}

export default App;
