import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Homepage from './pages/homePage/home';
import DomainInputPage from './pages/DomainPage/domainPage';
import AboutPage from './pages/AboutPage/aboutPage';
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
          Learn React
        </a>

      </header> */}
      <Router>

      <Routes>
            <Route path="/" element={<Homepage/>}/>
            <Route path="/about" element={<AboutPage/>}/>

            <Route path="/analyze" element={<DomainInputPage />}/>
      
           
          </Routes>
      </Router>
      {/* <Navbar/> */}
{/* <Homepage/> */}
{/* <DomainInputPage/> */}
    </div>
  );
}

export default App;
