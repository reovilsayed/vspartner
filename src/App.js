import logo from './logo.svg';
// import './assets/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/nice-select2.css';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import DefaultLayout from './components/layouts/DefaultLayout';
import Home from './routes/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<DefaultLayout><Home/></DefaultLayout>} />
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
