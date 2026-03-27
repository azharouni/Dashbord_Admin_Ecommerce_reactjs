import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
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

const SuccessMessage = styled('div')({
  backgroundColor: '#4caf50',
  color: 'white',
  padding: '10px',
  marginTop: '10px',
  textAlign: 'center',
});

const ProductUpdateController = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [prix, setPrix] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');
  const [size, setSize] = useState([]);
  const [categories, setCategories] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [categorieId, setCategorieId] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePrixChange = (e) => {
    setPrix(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleStockChange = (e) => {
    setStock(e.target.value);
  };

  const handleSizeChange = (e) => {
    setSize(e.target.value.split(','));
  };

  const handleCategorieIdChange = (e) => {
    setCategorieId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('name', name);
    formData.append('prix', prix);
    formData.append('imageFile', image);
    formData.append('description', description);
    formData.append('stock', stock);
    formData.append('size', size);
    formData.append('souscategorie_id', categorieId);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-HTTP-Method-Override': 'PUT',
      },
    };

    try {
      const response = await axios.post(
        `http://localhost:8000/api/produits/${id}`,
        formData,
        config
      );

      const updatedUser = response.data;
      console.log('user updated:', updatedUser);
      setUpdateSuccess(true);
      //navigate(-1);
    } catch (error) {
      console.error('failed to update:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/sous_categories');
      setCategories(response.data['hydra:member']);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  return (
    <div
      className='new'
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh', width: '180vh' }}
    >
      <Wrapper sx={{ margin: '0 auto', height: '70vh', width: '170vh' }}>
        <NewContainer>
          {updateSuccess && <SuccessMessage>Mise à jour réussie!</SuccessMessage>}
          <Top>
            <h1>Modifier un produit</h1>
          </Top>
          <div></div>
          <Bottom>
            <Left>
              <label htmlFor='file'>
                <img
                  src={
                    image
                      ? URL.createObjectURL(image)
                      : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
                  }
                  alt=''
                />
                Image: <DriveFolderUploadOutlinedIcon className='icon' />
              </label>
              <input type='file' id='file' onChange={handleImageChange} style={{ display: 'none' }} />
            </Left>
            <Right>
              <form onSubmit={handleSubmit}>
                <div className='formInput' style={{ display: 'flex', gap: '30px' }}>
                  <label htmlFor='name'>
                    Nom:
                    <input type='text' id='name' value={name} onChange={handleNameChange} />
                  </label>
                  <label htmlFor='prix'>
                    Prix:
                    <input type='number' id='prix' value={prix} onChange={handlePrixChange} />
                  </label>
                </div>
                <div className='formInput' style={{ display: 'flex', gap: '30px' }}>
                  <label htmlFor='size'>
                    Size:
                    <input type='text' id='size' value={size[0]} onChange={handleSizeChange} />
                  </label>
                  
                </div>
                <div className='formInput' style={{ display: 'flex', gap: '30px' }}>
                  <label htmlFor='description'>
                    Description:
                    <input type='text' id='description' value={description} onChange={handleDescriptionChange} />
                  </label>
                </div>
                <div className='formInput' style={{ display: 'flex', gap: '30px' }}>
                  <label htmlFor='categorie'>
                    Catégorie:
                    <select name='categorie' id='categorie' onChange={handleCategorieIdChange}>
                      {categories.map((categorie) => (
                        <option key={categorie.id} value={categorie.id}>
                          {categorie.name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <button type='submit'>Enregistrer</button>
              </form>
            </Right>
          </Bottom>
        </NewContainer>
      </Wrapper>
    </div>
  );
};

export default ProductUpdateController;
