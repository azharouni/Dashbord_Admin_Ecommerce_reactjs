import React, { useEffect, useState } from "react";
import { ShoppingCartOutlined, ShoppingOutlined, UserOutlined } from "@ant-design/icons";
import { Card, Space, Statistic, Typography } from "antd";
import axios from "axios";



export const getProduits = (data) => {
    const uniqueEmails = new Set(data.map((item) => item.name));
    return uniqueEmails.size;
};
export const getCustomerCount = (data) => {
    const uniqueEmails = new Set(data.map((item) => item.email));
    return uniqueEmails.size;
};

function Dashboard() {
    const [orders, ] = useState(0);
    const [inventory] = useState(0);
    const [ customerCount, setCustomerCount] = useState(0);
    const [ productCount, setProductCount] = useState(0);
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/users")
            .then((response) => {
                setData(response.data["hydra:member"]);
                setCustomerCount(getCustomerCount(response.data["hydra:member"]));
            })
            .catch((error) => console.error(error));
        axios
            .get("http://localhost:8000/api/produits")
            .then((response) => {
                setData(response.data["hydra:member"]);
                setProductCount(getProduits(response.data["hydra:member"]));
            })
            .catch((error) => console.error(error));



    }, []);

    console.log(data);


    return (
        <div className="AppD">
            <Space size={20} direction="vertical">
                <Typography.Title level={3}>Statistique</Typography.Title>
                <Space direction="horizontal">
                    <DashboardCard
                        icon={
                            <ShoppingCartOutlined
                                style={{
                                    color: "green",
                                    backgroundColor: "rgba(0,255,0,0.25)",
                                    borderRadius: 20,
                                    fontSize: 60,
                                    padding: 16,
                                }}
                            />
                        }
                        title={
                            <div style={{ fontSize: 20, fontWeight: "bold", width: "200px" , marginTop: 20}}>
                                Commandes
                            </div>
                        }
                        value={orders}
                    />
                    <DashboardCard
                        icon={
                            <ShoppingOutlined
                                style={{
                                    color: "blue",
                                    backgroundColor: "rgba(0,0,255,0.25)",
                                    borderRadius: 20,
                                    fontSize: 60,
                                    padding: 16,
                                }}
                            />
                        }
                        title={
                            <div style={{ fontSize: 20, fontWeight: "bold", width: "200px" , marginTop: 20}}>
                                Produits
                            </div>
                        }
                        value={productCount}
                    />
                    <DashboardCard
                        icon={
                            <UserOutlined
                                style={{
                                    color: "purple",
                                    backgroundColor: "rgba(0,255,255,0.25)",
                                    borderRadius: 20,
                                    fontSize: 60,
                                    padding: 16,
                                }}
                            />
                        }
                        title={
                            <div style={{ fontSize: 20, fontWeight: "bold", width: "200px" , marginTop: 20}}>
                                Clients
                            </div>
                        }
                        value={customerCount}

                    />
                </Space>
            </Space>
        </div>
    );
}

function DashboardCard({ title, value, icon, height = "400px", width = "400px" }) {
    return (
        <Card style={{ height, width, backgroundColor: "#EAEAEA", margin: "6px" }}>
            <Space direction="vertical">
                {icon}
                <Statistic title={title} value={value} />
            </Space>
        </Card>
    );
}

export default Dashboard;