import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './index.css';
import registerImage from './4.svg';
import axios from 'axios';




const AddClient = () => {
  const [clientData, setClientData] = useState({
    email: '',
    password: '',
    fname: '',
    lname: '',
    numTel: '',
    adresse1: '',
    adresse2: '',
    ville: '',
    codeP: '',
    pay: '',
  });
  const navigate = useNavigate();
  const [role,setrole]=useState('Role_Admin');
  const [confirmPassword, setConfirmPassword] = useState('');

  

  


  const handleInputChange = (event) => {
    setClientData({
      ...clientData,
      [event.target.name]: event.target.value,
    });
  };

 


  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('email', clientData.email);
    formData.append('roles', role);
    formData.append('password', clientData.password);
    formData.append('fname', clientData.fname);
    formData.append('lname', clientData.lname);
    formData.append('numTel', clientData.numTel);
    formData.append('adresse1', clientData.adresse1);
    formData.append('adresse2', clientData.adresse2);
    formData.append('ville', clientData.ville);
    formData.append('codeP', clientData.codeP);
    formData.append('pay', clientData.pay);

    axios
      .post('http://localhost:8000/api/users', formData)
      .then((response) => {
        console.log(response.data);
        // handle success
        navigate('/');
      })
      .catch((error) => {
        console.log(error.response.data);
        // handle error
      });
  }; 
 
  return (
    <div className="register-page">
      <div className="image-container">
        <img src={registerImage} alt="Register" />
      </div>
      <div className="register-form-container">
        <h2>Inscrivez-vous</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            
            
            <input
              type="email"
              placeholder="Enter an email"
              name="email"
              value={clientData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Enter a password"
              name="password"
              value={clientData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            S'inscrire
          </button>
        </form>
        <div className="signin-link">
          Vous avez déjà un compte ? <Link to="/">Connectez-vous ici</Link>
        </div>
      </div>
    </div>
  );
}

export default AddClient;
