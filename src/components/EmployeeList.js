import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [editEmployee, setEditEmployee] = useState(null);

  // Fetch employees from the API
  useEffect(() => {
    axios.get('http://localhost:8080/api/employees')
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching employees!', error);
      });
  }, []);

  const handleEdit = (employee) => {
    setEditEmployee(employee);
  };

  const handleSave = () => {
    if (!editEmployee) return;

    axios.put(`http://localhost:8080/api/employees`, editEmployee)
      .then(response => {
        setEmployees(prevEmployees =>
          prevEmployees.map(emp => (emp.id === editEmployee.id ? response.data : emp))
        );
        setEditEmployee(null);  // Reset the form
      })
      .catch(error => {
        console.error('Error updating employee:', error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/employees/${id}`)
      .then(() => {
        setEmployees(employees.filter(emp => emp.id !== id));
      })
      .catch(error => {
        console.error('Error deleting employee:', error);
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5">Employee Management</h2>

      {/* Employee Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>
                  <button className="btn btn-edit btn-warning" onClick={() => handleEdit(employee)}>
                    Edit
                  </button>
                  <button className="btn btn-delete btn-danger" onClick={() => handleDelete(employee.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Employee Form */}
      {editEmployee && (
        <div className="mt-5 card p-4 shadow-sm">
          <h4>Edit Employee</h4>
          <form>
            <div className="form-group mb-3">
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                value={editEmployee.firstName}
                onChange={(e) => setEditEmployee({ ...editEmployee, firstName: e.target.value })}
              />
            </div>
            <div className="form-group mb-3">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                value={editEmployee.lastName}
                onChange={(e) => setEditEmployee({ ...editEmployee, lastName: e.target.value })}
              />
            </div>
            <div className="form-group mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={editEmployee.email}
                onChange={(e) => setEditEmployee({ ...editEmployee, email: e.target.value })}
              />
            </div>
            <button type="button" className="btn btn-success w-100" onClick={handleSave}>
              Save Changes
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
