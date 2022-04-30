import logo from './logo.svg';
import './App.css';
import './components/ChartComponent'
import ChartComponent from "./components/ChartComponent";

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <ChartComponent id='d'></ChartComponent>
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
