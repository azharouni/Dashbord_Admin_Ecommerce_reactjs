import React from "react";
import "./index.css";

import { Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getInventory } from "../../API";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from "react-router-dom";


function    Offre() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getInventory().then((res) => {
      setDataSource(res.products);
      setLoading(false);
    });
  }, []);

  const handleEdit = (id) => {
    // Handle edit button click
};

const handleDelete = (id) => {
    // Handle delete button click
    setDataSource(dataSource.filter((item) => item.id !== id));
};

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Offre</Typography.Title>

      <Link to="/Addoffre"><button className="addoffre">Ajouter un offre </button></Link>


      <Table
        loading={loading}
        columns={[
          
          {
            title: "ID_offre",
            dataIndex: "price",
          },
          {
            title: "Pourcentage de remise",
            dataIndex: "discountPercentage",
            render: (percentage) => `${percentage} %`,

          },
          {
            title: "Prix",
            dataIndex: "price",
            render: (value) => <span>${value}</span>,
          },
          
          {
            title: "date_debut",
            dataIndex: " ",
          },

          
          {
            title: "date_fin",
            dataIndex: " ",
          },
          {
            title: "Action",
            dataIndex: "",
            width: 170,
            render: (params) => {
              return (
                <>
   <Link to={`/Offreedit/${params.price}`}><button className="edit_offre">Edit</button></Link> 

                  <DeleteOutlineIcon className="delete"  onClick={() => handleDelete(params.id)}/></>
              );
            }
          },
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
      ></Table>
    </Space>
  );
}
export default Offre;
