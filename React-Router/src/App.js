import React from "react";
import {
  BrowserRouter as Router,
  //Switch,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Aboutus from "./pages/Aboutus";
import Contact from "./pages/Contact";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/aboutus">About us</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        <hr />
        <Routes>
          <Route path="/" element={<Home />}/>
        </Routes>
        <Routes>
          <Route path="/aboutus" element={<Aboutus />}/>
        </Routes>
        <Routes>
          <Route path="/contact" element={<Contact />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;