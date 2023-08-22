import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';

const Wrapper = styled('div')({
  width: '100%',
  display: 'flex',
});

const NewContainer = styled('div')({
  flex: 6,
});

const Top = styled('div')({
  backgroundColor: 'white',
  boxShadow: '2px 4px 10px 1px rgba(0, 0, 0, 0.47)',
  padding: '10px',
  margin: '20px',
  display: 'flex',

  h1: {
    color: 'lightgray',
    fontSize: '20px',
  },
});

const Bottom = styled('div')({
  backgroundColor: 'white',
  boxShadow: '2px 4px 10px 1px rgba(201, 201, 201, 0.47)',
  padding: '10px',
  margin: '20px',
  display: 'flex',
});

const Left = styled('div')({
  flex: 1,
  textAlign: 'center',


});

const Right = styled('div')({
  flex: 2,

  form: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '30px',
    justifyContent: 'space-around',

    '.formInput': {
      width: '80%', // 
      height: '40px',
      

      label: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',

        '.icon': {
          cursor: 'pointer',
        },
      },

      input: {
        width: '100%',
        padding: '5px',
        border: 'none',
        borderBottom: '1px solid gray',
      },
    },

    button: {
      width: '150px',
      padding: '10px',
      border: 'none',
      backgroundColor: '#4B7BE5' ,
      color: 'white',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginTop: '10px',

      '&:disabled': {
        backgroundColor: 'rgba(3, 92, 92, 0.322)',
        cursor: 'not-allowed',
      },
    },
  },
});

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
  const [role,setrole]=useState('Role_User');

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
        navigate(-1);
      })
      .catch((error) => {
        console.log(error.response.data);
        // handle error
      });
  };

  return (
    <div className='new' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh', width: '170vh' }}>
    <Wrapper sx={{ margin: '0 auto', height: '70vh', width: '200vh' }}>
      <NewContainer>
          
            <Top>
              <h1>Ajouter un client</h1>
            </Top>
            <Bottom>
              
              <Right>
                <form onSubmit={handleSubmit}>
                  <div></div>
                <div className='formInput' style={{ display: 'flex', gap: '335px' }}>
                    <label>
                      Email:
                      <input  type='email'
                        placeholder='Enter a email'
                        name="email"
                        value={clientData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </label>
                  
                    <label>
                      Mot de passe:
                      <input  type='password'
                       placeholder='Enter a password '
                        name="password"
                        value={clientData.password}
                        onChange={handleInputChange}
                        required
                      />
                    </label>
                    </div>


                    <div className='formInput' style={{ display: 'flex', gap:'315px' }}>
                    <label>
                      Prénom:
                      <input
                        placeholder='Enter a prénom'
                        type='text' 
                        name="fname"
                        value={clientData.fname}
                        onChange={handleInputChange}
                        required
                      />
                    </label>
               
                 
                    <label>
                      Nom:
                      <input
                       placeholder='Enter a nom'
                       type='text' 
                        name="lname"
                        value={clientData.lname}
                        onChange={handleInputChange}
                        required
                      />
                    </label>
                  </div>


                  <div className='formInput' style={{ display: 'flex', gap:'210px' }}>
                    <label>
                      Numéro de téléphone:
                      <input
                       placeholder='Enter a Numéro de téléphone '
                       type='number'
                        name="numTel" 
                        value={clientData.numTel}
                        onChange={handleInputChange}
                        required
                      />
                    </label>
                    <label>
                      Adresse1:
                      <input
                        placeholder='Enter a  Adresse 1 '
                        type='text' 
                        name="adresse1"
                        value={clientData.adresse1}
                        onChange={handleInputChange}
                        required
                      />
                    </label>
                  </div>


                  <div className='formInput' style={{ display: 'flex', gap: '310px' }}>
                    <label>
                      Adresse2:
                      <input
                        placeholder='Enter a Adresse 2'
                        type='text' 
                        name="adresse2"
                        value={clientData.adresse2}
                        onChange={handleInputChange}
                      />
                    </label>
                 
                  
                    <label>
                      Ville:
                      <input
                        placeholder='Enter a Ville'
                        type='text' 
                        name="ville"
                        value={clientData.ville}
                        onChange={handleInputChange}
                        required
                      />
                    </label>
                  </div>

                  <div className='formInput' style={{ display: 'flex', gap: '100px' }}>
                    
            
                    <label>
                     
                    </label>
                  </div>


                  <button type="submit">Ajouter</button>
                </form>
              </Right>
            </Bottom>
         
        </NewContainer>
      </Wrapper>
    </div>
  );
};

export default AddClient;