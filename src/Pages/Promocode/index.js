import React from "react";
import "./index.css";
import { Link } from "react-router-dom";

import { Avatar, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getInventory, getOrders } from "../../API";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


function Promocode() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getOrders().then((res) => {
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
      <Typography.Title level={4}>Code Promo</Typography.Title>
      <Link to="/Addcodopromo"><button className="addpromo">Ajouter un Code Promo  </button></Link>

      <Table
        loading={loading}
        columns={[
          {
            title: "ID_codepromo",
            dataIndex: "id",
          },
          {
            title: "code",
            dataIndex: " ",
          
          },
          
          {
            title: "Reductions",
            dataIndex: "discountPercentage",
            render: (percentage) => `${percentage} %`,
          },
          {
            title: "Action",
            dataIndex: "",
            width: 170,
            render: (params) => {
              return (
                <>
                  <DeleteOutlineIcon className="delete"  onClick={() => handleDelete(params.id)} /></>
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
export default Promocode;
