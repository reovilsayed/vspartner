import logo from './logo.svg';
// import './assets/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/nice-select2.css';
import './App.css';
import DefaultLayout from './components/layouts/DefaultLayout';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
       Hello world
        </a>
      </header> */}
      <DefaultLayout/>
    </div>
  );
}

export default App;
