import logo from './logo.svg';
import './App.css';

import { PumpContainer } from './components/PumpContainer.react';

function App() {
  return (
    <div className="App">
      <div className="pumps-wrapper">
        <PumpContainer pumpId={1}/>
        <PumpContainer pumpId={2}/>
        <PumpContainer pumpId={3}/>
        <PumpContainer pumpId={4}/>
      </div>
    </div>
  );
}

export default App;
