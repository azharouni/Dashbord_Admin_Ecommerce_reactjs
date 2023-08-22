export const getOrders = () => {
  return fetch("https://dummyjson.com/carts/1").then((res) => res.json());
};

export const getRevenue = () => {
  return fetch("https://dummyjson.com/carts").then((res) => res.json());
};

export const getInventory = () => {
  return fetch("https://dummyjson.com/products").then((res) => res.json());
};

export const getCustomers = () => {
  return fetch("https://dummyjson.com/users").then((res) => res.json());
};
export const getComments = () => {
  return fetch("https://dummyjson.com/comments").then((res) => res.json());
};


export const updateProduct = async (id, productData) => {
  // your implementation
};

/*export const updateCategory = async (categoryId, updatedCategory) => {
  const response = await fetch(`/api/categories/${categoryId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedCategory),
  });
  const data = await response.json();
  return data;
};
*/

/*
export const updateCategory = async (categoryId, updatedCategory) => {
  // ...
};

export const getCategory = async (categoryId) => {
  const response = await fetch(`/api/categories/${categoryId}`);
  const data = await response.json();
  return data;
};
*/


export function updateCategory(category) {
  // function body
}
export function getCategory(categoryId) {
  // ...
}

export const updateCustomer = async (customerId, updatedData) => {
  // function code here
};


/*
export const updateInventory = async (id, data) => {
  const response = await fetch(`https://example.com/api/inventory/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update inventory');
  }

  const result = await response.json();
  return result;
}
*/
export const editInventory = (id, data) => {
  // Function body here
};


export const addProduct = async (productData) => {
  // ...
}

export const addCustomer = async () => {
  // ...
}


export function addCategory(categoryData) {
}

export const getSouscategorieById = async (id) => {
}

export const updateSouscategorie = async (id, newData) => {
}


export const addSouscategorie = async (souscategorie) => {
}