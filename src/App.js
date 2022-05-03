import logo from './logo.svg';
import './App.css';
import UpdatingChart from "./components/charts/updatingData/UpdatingChartComponent";
window.addEventListener('DOMContentLoaded', (event) => {
//Your JS code.
});

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <UpdatingChart />
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
        {/*<p>*/}
        {/*  Edit <code>src/App.js</code> and save to reload.*/}
        {/*</p>*/}
        {/*<a*/}
        {/*  className="App-link"*/}
        {/*  href="https://reactjs.org"*/}
        {/*  target="_blank"*/}
        {/*  rel="noopener noreferrer"*/}
        {/*>*/}
        {/*  Learn React*/}
        {/*</a>*/}
      </header>
    </div>
  );
}

export default App;
