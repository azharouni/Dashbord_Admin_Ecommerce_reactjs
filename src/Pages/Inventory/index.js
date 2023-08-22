import { Table } from "@nextui-org/react";
import "./index.css";
import React, { useState, useEffect } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function App() {
  const [data, setData] = useState([]);
  const [details, setDetails] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const prepareData = () => {
    axios
      .get("http://localhost:8000/api/produits")
      .then((response) => {
        setData(response.data["hydra:member"]);
      })
      .catch((error) => console.error(error));
    axios
      .get("http://localhost:8000/api/details")
      .then((response) => setDetails(response.data["hydra:member"]))
      .catch((error) => console.error(error));
  };
  console.log("Produits :");
  console.log(data);
  const handleDelete = (userId) => {
    axios
      .delete(`http://localhost:8000/api/produits/${userId}`)
      .then((res) => {
        console.log(res);
        prepareData();
      });
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const filteredData = data
    .map((item) => {
      const userId = item.id;
      const detail = details.find((d) => d.produit === `/api/produits/${userId}`);
      return { ...item, ...detail, userId };
    })
    .filter(({ name }) => name.toLowerCase().includes(search.toLowerCase()))
    .filter(({ categoryName }) => !selectedCategory || categoryName === selectedCategory);

  useEffect(() => {
    prepareData();
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/sous_categories")
      .then((response) => setCategories(response.data["hydra:member"]))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div id="app">
      <div className="container">
        <div className="search-and-add">
          <div className="search-container">
            <input
              type="text"
              placeholder="Recherche par Nom"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="red">
            <Link to="/Addproduit">
              <button className="add_category">Ajouter un produit</button>
            </Link>
          </div>
          <div className="category-selector">
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ width: "200px" }}
            >
              <option value="">select sous-catégories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}

                 
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="table-container">
          <Table
            bordered
            shadow={false}
            color="secondary"
            aria-label="Example pagination table"
            css={{
              height: "100%",
              width: "100%",
              minWidth: "800px",
              margin: "auto",
            }}
          >
            <Table.Header>
              <Table.Column>id</Table.Column>
              <Table.Column>Nom</Table.Column>
              <Table.Column>prix</Table.Column>
              <Table.Column width={50}>Image</Table.Column>
              <Table.Column>description</Table.Column>

              <Table.Column>Actions</Table.Column>
            </Table.Header>
            <Table.Body>
              {filteredData.map((item) => (
                <Table.Row key={item.id}>
                  <Table.Cell>{item.userId}</Table.Cell>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{item.prix}</Table.Cell>
                  <Table.Cell>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={`http://localhost:8000/${item.image}`}
                        alt=""
                        style={{ maxWidth: "100%" }}
                      />
                    </div>
                  </Table.Cell>
                  <Table.Cell>{item.description}</Table.Cell>
                  <Table.Cell>
                    <div className="action-buttons">
                      <button className="edit" onClick={() => handleEdit(item.userId)}>
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(item.userId)}>
                        <FaTrashAlt />
                      </button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
            <Table.Pagination
              shadow
              noMargin
              align="center"
              rowsPerPage={7}
              onPageChange={(page) => console.log({ page })}
            />
          </Table>
        </div>
      </div>
    </div>
  );
}
