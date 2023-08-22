import { Table } from "@nextui-org/react";
import "./index.css";
import React, { useState, useEffect } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function App() {
    const [categories, setCategories] = useState([]);
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const prepareData=()=>{axios
      .get("http://localhost:8000/api/categories")
      .then((response) => {
          setData(response.data["hydra:member"]);
      })
      .catch((error) => console.error(error));
        
};




    const handleDelete = (id) => {
      axios
        .delete(`http://localhost:8000/api/categories/${id}`)
        .then((res) => {
          console.log(res);
          prepareData();
        })
        
    };
    
    const handleEdit = (id) => {
        navigate(`/Editcategories/${id}`);
    };

    const filteredData = data.filter(({ name }) =>
        name.toLowerCase().includes(search.toLowerCase())
    );

    


    useEffect(() => {
      prepareData()
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
                        <Link to="/Addcategoris">
                            <button className="add_category">Ajouter une catégorie</button>
                        </Link>
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
                            minWidth: "800px", // Increase the minimum width
                            margin: "auto", // Center the table horizontally
                        }}
                    >
                        <Table.Header>
                            <Table.Column width={170}>id</Table.Column>
                            <Table.Column width={200}>Nom</Table.Column>
                            <Table.Column width={160}>Image</Table.Column>
                            <Table.Column width={70}>Actions</Table.Column>
                        </Table.Header>

                        <Table.Body>
                            {filteredData.map(({ id, name, image }) => (
                                <Table.Row key={id}>
                                    <Table.Cell>{id}</Table.Cell>
                                    <Table.Cell>{name}</Table.Cell>
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
                                                src={`http://localhost:8000/${image}`}
                                                alt=""
                                                style={{ maxWidth: "100%" }}
                                            />
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="action-buttons">
                                            
                                             
                                        <button  className="edit"
                                                onClick={() => handleEdit(id)}>
                                                <FaEdit />
                                            </button>
                                               
                                            <button onClick={() => handleDelete(id)}>
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