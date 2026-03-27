import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
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

  img: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
});

const Right = styled('div')({
  flex: 2,

  form: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '30px',
    justifyContent: 'space-around',

    '.formInput': {
      width: '80%',
      height: '50px',

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
      backgroundColor: '#4B7BE5',
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

const AddProduct = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState({});
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setData({ ...data, [id]: value });
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('prix', data.prix);
    formData.append('imageFile', file);
    formData.append('souscategorie_id', data.souscategorie_id); // Changed to 'souscategorie_id'
    formData.append('description', data.description);
    formData.append('size', data.size);
    formData.append('stock', data.stock);
    formData.append('stock1', data.stock1);

    axios
      .post('http://localhost:8000/api/produits', formData)
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

  const handleSelectChange = (event) => {
    setData({ ...data, souscategorie_id: event.target.selectedOptions[0].value }); // Changed to 'souscategorie_id'
  };

  const fetchCategories = () => {
    axios
      .get('http://localhost:8000/api/sous_categories')
      .then((response) => {
        setCategories(response.data['hydra:member']);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div
      className='new'
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh', width: '180vh' }}
    >
      <Wrapper sx={{ margin: '0 auto', height: '70vh', width: '170vh' }}>
        <NewContainer>
          <Top>
            <h1>Ajouter un produit </h1>
          </Top>
          <div></div>
          <Bottom>
            <Left>
              <label htmlFor='file'>
                <img
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
                  }
                  alt=''
                />
                Image: <DriveFolderUploadOutlinedIcon className='icon' />
              </label>
              <input type='file' id='file' onChange={handleFileChange} style={{ display: 'none' }} />
            </Left>
            <Right>
              <form onSubmit={handleSubmit}>
                <div className='formInput' style={{ display: 'flex', gap: '30px' }}>
                  <label htmlFor='name'>
                    Nom:
                    <input type='text' id='name' placeholder='Saisir un Nom ' onChange={handleInput} />
                  </label>
                  <label htmlFor='prix'>
                    prix:
                    <input type='number' id='prix' placeholder='Saisir un prix' onChange={handleInput} />
                  </label>
                </div>
                <div className='formInput' style={{ display: 'flex', gap: '30px' }}>
                  <label htmlFor='size'>
                    taille:
                    <input type='number' id='size' placeholder='Saisir une taille' onChange={handleInput} />
                  </label>
                  
                </div>
                <div className='formInput'>
                  <label htmlFor='souscategorie_id'> {/* Updated htmlFor value */}
                    Sous categorie:
                    <select id='souscategorie_id' onChange={handleSelectChange}> {/* Updated id value */}
                      <option value=''>Select a sous categorie</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className='formInput'>
                  <label htmlFor='description'>
                    Description:
                    <textarea id='description' placeholder='Saisir une description' onChange={handleInput}></textarea>
                  </label>
                </div>
                <div className='formInput'>
                  <button type='submit' >
                    Ajouter
                  </button>
                </div>
              </form>
            </Right>
          </Bottom>
        </NewContainer>
      </Wrapper>
    </div>
  );
};

export default AddProduct;
