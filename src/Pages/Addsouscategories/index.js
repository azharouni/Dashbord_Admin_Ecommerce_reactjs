import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

const AddProduct = () => {
const [productData, setProductData] = useState({
name: '',
imageFile: null,
categorie_id: '',
});

const [categories, setCategories] = useState([]);
const navigate = useNavigate();

useEffect(() => {
axios
.get('http://localhost:8000/api/categories')
.then((response) => {
setCategories(response.data['hydra:member']);
})
.catch((error) => {
console.log(error);
});
}, []);

const handleInputChange = (event) => {
setProductData({
...productData,
[event.target.name]: event.target.value,
});
};

const handleFileChange = (event) => {
setProductData({
...productData,
imageFile: event.target.files[0],
});
};

const handleSelectChange = (event) => {
setProductData({
...productData,
categorie_id: event.target.value,
});
};

const handleSubmit = (event) => {
event.preventDefault();
const formData = new FormData();
formData.append('name', productData.name);
formData.append('imageFile', productData.imageFile);
formData.append('categorie_id', productData.categorie_id);

axios
  .post('http://localhost:8000/api/sous_categories', formData)
  .then((response) => {
    console.log(response.data);
    // handle success
    navigate(-1); // Rediriger vers la page précédente
  })
  .catch((error) => {
    console.log(error.response.data);
    // handle error
  });
};

return (
<div className="new" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "90vh" , width: "180vh"  }}>
      <Wrapper sx={{ margin: "0 auto", height: "70vh", width: "170vh" }}>

<NewContainer>
<Top>
<h1>Ajouter une sous_categorie</h1>
</Top>
<Bottom>
<Left>
<label htmlFor="imageFile">
<img
src={
productData.imageFile
? URL.createObjectURL(productData.imageFile)
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
onChange={handleFileChange}
style={{ display: 'none' }}
/>
</Left>
<Right>
<form onSubmit={handleSubmit}>
<div className="formInput">
<label htmlFor="name">Name:</label>
<input type="text" id="name" name="name" value={productData.name} onChange={handleInputChange} />
</div>

            <div className="formInput">
              <label htmlFor="categorie_id">Categorie:</label>
              <select
                id="categorie_id"
                name="categorie_id"
                value={productData.categorie_id}
                onChange={handleSelectChange}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
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

export default AddProduct;