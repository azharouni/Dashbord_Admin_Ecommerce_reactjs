import React from "react";
import "./index.css";
import { Link } from "react-router-dom";


import SearchIcon from '@mui/icons-material/Search';

import { Avatar, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getInventory, getOrders } from "../../API";

function Orders() {
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
      <Typography.Title level={4}>Commande</Typography.Title>
      <div className="search-container">
  
  <input type="text" placeholder="Search..." />
  <SearchIcon />

</div>

      <Table
        loading={loading}
        columns={[{ width: 70 },
            {
                title: "ID_order",
                dataIndex: "id",
              },
              
              {
                title: "Custemer",
                dataIndex: " ",
              },
          
          {
            title: "Adressse",
            dataIndex: " ",
          },
          {
            title: "Phone",
            dataIndex:"phone",
          },
          {
            title: "Quantity",
            dataIndex: "quantity",
          },
          

          
          {
            title: "Total_prix",
            dataIndex: "price",
            render: (value) => <span>${value}</span>,
          },
         
          {
            title: "Statut",
            dataIndex: "",
          },
          {
            title: "Type_payment",
            dataIndex: "",
          },
          {
            title: "date_commande",
            dataIndex: " ",
          },


          {
            title: "Detail_commande",
            dataIndex: "",
            width: 170,
            render: (params) => {
              console.log(params)
              return ( 
                <> 
                
                <Link to={`/Detailcommande/${params.id}`}><button className="Detailcommande">Detail</button></Link> 
               </>
              )
            }
          },
          {
            title: "Action",
            dataIndex: "",
            width: "80% ",
            render: (params) => {
              return (
                <>
  
         
              <button class="confirme_ordre">Confirmer</button>
              <button className="delete_ordre" onClick={() => handleDelete(params.id)}>Delete</button>
          
                  </>
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
export default Orders;
