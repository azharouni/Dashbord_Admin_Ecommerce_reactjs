import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';

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
      width: '40%',

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

const UpdateSousCategorieForm = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [categorieId, setCategorieId] = useState('');
  const [categories, setCategories] = useState([]);
  const { id } = useParams(); // Get the 'id' parameter from the path
  const navigate = useNavigate();
  const [updateSuccess, setUpdateSuccess] = useState(false);

  
  


  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/categories');
      setCategories(response.data['hydra:member']);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleCategorieIdChange = (e) => {
    setCategorieId(e.target.value);
  };



  const SuccessMessage = styled('div')({
    backgroundColor: '#4caf50',
    color: 'white',
    padding: '10px',
    marginTop: '10px',
    textAlign: 'center',
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('imageFile', image);
    formData.append('categorie_id', categorieId);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-HTTP-Method-Override': 'PUT', // Specify the method override header
      },
    };
    try {
      const response = await axios.post(`http://localhost:8000/api/sous_categories/${id}`, formData, config);

      const updatedSousCategorie = response.data;
    console.log('user updated:', updatedSousCategorie);
    setUpdateSuccess(true);
  
      // Redirect to the previous page
     // navigate(-1); 

    } catch (error) {
      console.error('Error updating sous_categorie:', error);
    }


    


  };


  /*
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('imageFile', image);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-HTTP-Method-Override': 'PUT', // Specify the method override header
      },
    };
    try {
      const response = await axios.post(`http://localhost:8000/api/categories/${id}`, formData, config);

      const updatedCategory = response.data;
      console.log('Updated Category:', updatedCategory);
      navigate(-1); // Navigate back to the previous page
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };
*/

  return (
    <div className="new" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "90vh" , width: "180vh"  }}>
      <Wrapper sx={{ margin: "0 auto", height: "70vh", width: "170vh" }}>

<NewContainer>
{updateSuccess && (
                <SuccessMessage>Mise à jour réussie!</SuccessMessage>
              )}
          <Top>
            <h1>Modifier Sous Categorie</h1>
          </Top>
          <Bottom>
            <Left>
              <label htmlFor="imageFile">
                <img
                  src={
                    image
                      ? URL.createObjectURL(image)
                      : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
                  }
                  alt=""
                />
                Image:
                <DriveFolderUploadOutlinedIcon className="icon" />
              </label>
              <input
                type="file"
                id="imageFile"
                name="imageFile"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </Left>
            <Right>
              <form onSubmit={handleSubmit}>
                <div className="formInput">
                  <label htmlFor="name">Sous Categorie Name:</label>
                  <input type="text" id="name" name="name" value={name} onChange={handleNameChange} />
                </div>
                <div className="formInput">
                  <label htmlFor="categorieId">categories:</label>
                  <select id="categorieId" value={categorieId} onChange={handleCategorieIdChange}>
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit">Modifier</button>
              </form>
            </Right>
          </Bottom>
          </NewContainer>
  </Wrapper>
</div>
  );
};

export default UpdateSousCategorieForm;
