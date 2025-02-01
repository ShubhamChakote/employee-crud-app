import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Import the custom CSS file

const App = () => {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              Employee Management
            </Link>
            <div className="navbar-nav ml-auto">
              <Link className="nav-link" to="/">Home</Link>
              <Link className="nav-link" to="/add">Add Employee</Link>
            </div>
          </div>
        </nav>
        <div className="content mt-4">
          <Routes>
            <Route path="/" element={<EmployeeList />} />
            <Route path="/add" element={<AddEmployee />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
