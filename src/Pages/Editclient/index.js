import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import "./index.css";

const Wrapper = styled('div')({
  width: '100%',
  display: 'flex',
});

const Container = styled('div')({
  flex: 6,
});

const Title = styled('div')({
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

const Form = styled('form')({
  backgroundColor: 'white',
  boxShadow: '2px 4px 10px 1px rgba(201, 201, 201, 0.47)',
  padding: '10px',
  margin: '20px',
});
const Row = styled('div')({
  display: 'flex',
  gap: '20px',
});


const Label = styled('label')({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',

  '.icon': {
    cursor: 'pointer',
  },
});

const Input = styled('input')({
  width: '100%',
  padding: '5px',
  border: 'none',
  borderBottom: '1px solid gray',
});

const Button = styled('button')({
  width: '150px',
  padding: '10px',
  border: 'none',
  backgroundColor: '#4B7BE5',
  color: 'white',
  fontWeight: 'bold',
  cursor: 'pointer',
  marginTop: '10px',

  '&:disabled': {
    backgroundColor: 'rgba(3, 92, 92, 0.322)',
    cursor: 'not-allowed',
  },
});

const SuccessMessage = styled('div')({
  backgroundColor: '#4caf50',
  color: 'white',
  padding: '10px',
  marginTop: '10px',
  textAlign: 'center',
});

const UserUpdateController = () => {
  const [email, setEmail] = useState(null);
  const [fname, setFname] = useState(null);
  const [lname, setLname] = useState(null);
  const [numTel, setNumtel] = useState(null);
  const [password, setPassword] = useState(null);
  const [adresse1, setAdresse1] = useState(null);
  const [adresse2, setAdresse2] = useState(null);
  const [pay, setPay] = useState(null);
  const [codeP, setCodeP] = useState(null);
  const [ville, setVille] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/users/${id}`);
        const userData = response.data;
        setEmail(userData.email);
        setFname(userData.fname);
        setLname(userData.lname);
        setNumtel(userData.numTel);
        setPassword(userData.password);
        setAdresse1(userData.adresse1);
        setAdresse2(userData.adresse2);
        setPay(userData.pay);
        setCodeP(userData.codeP);
        setVille(userData.ville);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFnameChange = (e) => {
    setFname(e.target.value);
  };

  const handleLnameChange = (e) => {
    setLname(e.target.value);
  };

  const handleNumtelChange = (e) => {
    setNumtel(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleAdresse1Change = (e) => {
    setAdresse1(e.target.value);
  };

  const handleAdresse2Change = (e) => {
    setAdresse2(e.target.value);
  };

  const handlePayChange = (e) => {
    setPay(e.target.value);
  };

  const handleCodePChange = (e) => {
    setCodeP(e.target.value);
  };

  const handleVilleChange = (e) => {
    setVille(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('email', email);
    formData.append('fname', fname);
    formData.append('lname', lname);
    formData.append('numTel', numTel);
    formData.append('password', password);
    formData.append('adresse1', adresse1);
    formData.append('adresse2', adresse2);
    formData.append('pay', pay);
    formData.append('codeP', codeP);
    formData.append('ville', ville);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-HTTP-Method-Override': 'PUT',
      },
    };

    try {
      const response = await axios.post(
        `http://localhost:8000/api/users/${id}`,
        formData,
        config
      );

      const updatedUser = response.data;
      console.log('user updated:', updatedUser);
      setUpdateSuccess(true);
    } catch (error) {
      console.error('failed to update:', error);
    }
  };
  
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

  return (
    <div className='new' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '110vh', width: '170vh' }}>
    <Wrapper sx={{ margin: '0 auto', height: '100vh', width: '200vh' }}>
<Container>
        {updateSuccess && (
          <SuccessMessage>Mise à jour réussie!</SuccessMessage>
        )}
        

        <Top>
              <h1>Modifer un client</h1>
            </Top>
        <Form onSubmit={handleSubmit}>
        <div className='formInput' style={{ display: 'flex', gap: '335px' }}>
            <Label htmlFor="email">
              Email:
              <Input
                type="email"
                id="email"
                value={email || ''}
                onChange={handleEmailChange}
              />
            </Label>
            <Label htmlFor="fname">
              Nom:
              <Input
                type="text"
                id="fname"
                value={fname || ''}
                onChange={handleFnameChange}
              />
            </Label>
            </div>

            <div className='formInput' style={{ display: 'flex', gap: '335px' }}>
            <Label htmlFor="lname">
              Prénom:
              <Input
                type="text"
                id="lname"
                value={lname || ''}
                onChange={handleLnameChange}
              />
            </Label>
            <Label htmlFor="numTel">
              Télephone:
              <Input
                type="text"
                id="numTel"
                value={numTel || ''}
                onChange={handleNumtelChange}
              />
           
            </Label>
            </div>

            <div className='formInput' style={{ display: 'flex', gap: '335px' }}>
            <Label htmlFor="password">
              Password:
              <Input
                type="password"
                id="password"
                value={password || ''}
                onChange={handlePasswordChange}
              />
            </Label>
         
         
            <Label htmlFor="adresse1">
              Address1:
              <Input
                type="text"
                id="adresse1"
                value={adresse1 || ''}
                onChange={handleAdresse1Change}
              />
            </Label>
            </div>


            <div className='formInput' style={{ display: 'flex', gap: '310px' }}>
            <Label htmlFor="adresse2">
              Address2:
              <Input
                type="text"
                id="adresse2"
                value={adresse2 || ''}
                onChange={handleAdresse2Change}
              />
            </Label>
          
            <Label htmlFor="ville">
              Ville:
              <Input
                type="text"
                id="ville"
                value={ville || ''}
                onChange={handleVilleChange}
              />
            </Label>
            </div>

            <div className='formInput' style={{ display: 'flex', gap: '500px' }}>
           
            
           
            </div>
          
          <Button type="submit">Modifier</Button>
        </Form>
      </Container>
    </Wrapper>
    </div>
  );
};

export default UserUpdateController;