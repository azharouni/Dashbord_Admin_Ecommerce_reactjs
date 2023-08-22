import { Table } from "@nextui-org/react";
import "./index.css";
import React, { useState, useEffect } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

export default function App() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [data, setData] = useState([]);
    const [details, setDetails] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();


   


 
    const prepareData=()=>{axios
        .get("http://localhost:8000/api/sous_categories")
        .then((response) => {
            setData(response.data["hydra:member"]);
        })
        .catch((error) => console.error(error));
    
    axios
        .get("http://localhost:8000/api/categories")
        .then((response) => setDetails(response.data["hydra:member"]))
        .catch((error) => console.error(error));}
       


const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/api/sous_categories/${id}`)
    .then((res) => {
        console.log(res);
        prepareData();
      })
};

const handleEdit = (id)=> {
    navigate(`/EditSOUScategories/${id}`);
};
  






    const filteredData = data
    
        .map((item) => {
            const category = details.find((d) => d["@id"] === item.categorie);
            const categoryName = category ?category.name : "";
            return { ...item, categoryName };
        })
        .filter(
            ({ name, categoryName }) =>
                name.toLowerCase().includes(search.toLowerCase()) &&
                (!selectedCategory || categoryName === selectedCategory)
        );


        useEffect(() => {
            prepareData()
        }, []);
    

    useEffect(() => {
        setCategories(
            details.map((category) => ({
                label: category.name,
                value: category.name,
            }))
        );
    }, [details]);

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
                        <Link to="/Addsouscategories">
                            <button className="add_category">Ajouter un sous_categorie </button>
                        </Link>
                    </div>
                    <div className="category-selector">
<label htmlFor="category"> </label>
                        <select
                            id="category"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            style={{ width: "200px" }}
                        >
                            <option value="">select categorie </option>
                            {categories.map(({ label, value }) => (
                                <option key={value} value={value}>
                                    {label}
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
                            <Table.Column width={50}>id</Table.Column>
                            <Table.Column width={50}>Nom</Table.Column>
                            <Table.Column width={50}>catgories name</Table.Column>
                            <Table.Column width={50}>Image</Table.Column>
                            <Table.Column width={70}>Actions</Table.Column>
                        </Table.Header>
                        <Table.Body>
                            {filteredData.map((item) => (
                                <Table.Row key={item.id}>
                                    <Table.Cell>{item.id}</Table.Cell>
                                    <Table.Cell>{item.name}</Table.Cell>
                                    <Table.Cell>{item.categoryName}</Table.Cell>

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

                                    <Table.Cell>
                                        <div className="actions">
                                            <button onClick={() => handleEdit(item.id)}>
                                                <FaEdit />
                                            </button>
                                            <button  onClick={() => handleDelete(item.id)} >
                                                <FaTrashAlt  />
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