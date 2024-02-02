import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
  });

  const { firstname, lastname, username, email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/users/register', {
        firstname,
        lastname,
        username,
        email,
        password,
      });
      console.log(res.data);
      alert('Registration successful! You can now log in.');
      window.location.replace('/login');
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div style={{background:'lightgray'}}>
    <div className="container" style={{ minHeight: '100vh',background:'lightgray'  }}>
      <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh'}}>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center">Register</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>First Name:</label>
                  <input
                    type="text"
                    name="firstname"
                    className="form-control"
                    value={firstname}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Last Name:</label>
                  <input
                    type="text"
                    name="lastname"
                    className="form-control"
                    value={lastname}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Username:</label>
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    value={username}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={password}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block mt-3">Register</button>
              </form>
            </div>
            <div className="card-footer text-center">
              <p>
                Already registered? <Link to="/login">Login here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Register;