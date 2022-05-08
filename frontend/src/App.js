import logo from './logo.svg';
import './App.css';

import { PumpContainer } from './components/PumpContainer.react';

function App() {
  return (
    <div className="App">
      <div className="pumps-wrapper">
        <PumpContainer pumpGroup={"A"}/>
        <PumpContainer pumpGroup={"B"}/>
      </div>
    </div>
  );
}

export default App;
