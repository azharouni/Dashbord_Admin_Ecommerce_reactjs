import { BellFilled, MailOutlined } from "@ant-design/icons";
import { Badge, Drawer, Image, List, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { getComments, getOrders } from "../../API";
import React from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import { useLocation, useNavigate } from "react-router-dom";
import "./index.css"




function AppHeader() {
  const [comments, setComments] = useState([]);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getComments().then((res) => {
      setComments(res.comments);
    });
    getOrders().then((res) => {
      setOrders(res.products);
    });
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/home');
  }
  return (
    <div className="AppHeader">
       <div className="app">
       <span>E-Commerce</span>
           <LogoutIcon    onClick={handleLogout}/>

      </div>
      

    </div>
  );
}
export default AppHeader;
