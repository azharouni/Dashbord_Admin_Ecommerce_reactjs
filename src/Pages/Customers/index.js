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
    const navigate = useNavigate();
const prepareData=()=>{axios
    .get("http://localhost:8000/api/users")
    .then((response) => {
        setData(response.data["hydra:member"]);
    })
    .catch((error) => console.error(error));

axios
    .get("http://localhost:8000/api/adresses")
    .then((response) => setDetails(response.data["hydra:member"]))
    .catch((error) => console.error(error));}
   





const handleDelete = (id) => {
    
    axios.delete(`http://localhost:8000/api/users/${id}`).then((res)=>{prepareData()})
  };
    

    
    const handleEdit = (userId)=> {
           navigate(`/Editclient/${userId}`);
       };


    const filteredData = data
        .map((item) => {
            const userId = item.id; // Get the user ID directly from the 'id' property of the 'data' array
            const detail = details.find((d) => d.users === `/api/users/${userId}`);
            return { ...item, ...detail, userId };
        })
        .filter(({ email }) => email.toLowerCase().includes(search.toLowerCase()));

    useEffect(() => {
        prepareData()
    }, []);

    console.log(data);
    console.log(filteredData);

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
                        <Link to="/Addclient">
                            <button className="add_category">Ajouter un Client </button>
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
                            <Table.Column>id</Table.Column>
                            <Table.Column>Nom</Table.Column>
                            <Table.Column>Prénom</Table.Column>
                            <Table.Column>email</Table.Column>
                            <Table.Column>Télephone</Table.Column>
                            <Table.Column>adresse</Table.Column>
                            <Table.Column>ville</Table.Column>
                            <Table.Column>actions</Table.Column>
                        </Table.Header>
                        <Table.Body>
                            {filteredData.map((item) => (
                                <Table.Row key={item.id}>
                                    <Table.Cell>{item.userId}</Table.Cell>
                                    <Table.Cell>{item.fname}</Table.Cell>
                                    <Table.Cell>{item.lname}</Table.Cell>
                                    <Table.Cell>{item.email}</Table.Cell>
                                    <Table.Cell>{item.numTel}</Table.Cell>
                                    <Table.Cell>{item.adresse1}</Table.Cell>
                                    <Table.Cell>{item.ville}</Table.Cell>
                                    <Table.Cell>
                                        <div className="action-buttons">
                                            
                                             
                                        <button  className="edit"
                                                onClick={() => handleEdit(item.userId)}>
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
                            rowsPerPage={6}
                            onPageChange={(page)=> console.log({ page })}
                        />
                    </Table>
                </div>
            </div>
        </div>
    );
}