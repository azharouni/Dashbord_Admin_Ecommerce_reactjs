import {
  AppstoreOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,

} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import CategoryIcon from '@mui/icons-material/Category';


import React from 'react';


import { FaPercentage } from "react-icons/fa";

function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");


  const navigate = useNavigate();
  return (
    <div className="SideMenu">
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        onClick={(item) => {
          //item.key
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
        items={[
          {
            label: "Dashbaord",

            icon: <AppstoreOutlined />,
            key: "/Dashboard",
          },
          {
            label: "Produit",
            key: "/inventory",
            icon: <ShopOutlined />,
          },
          {
            label: "Commande",
            key: "/orders",
            icon: <ShoppingCartOutlined />,
          },
          {
            label: "Cotegorie",
            key: "/cotegoris",
            icon: <ShopOutlined />,
          },
          {
            label: "Sous_Categorie",
            key: "/Souscategories",
            icon: <CategoryIcon />,
          },
          {
            label: "Client",
            key: "/customers",
            icon: <UserOutlined />,
          },

          /*
          {
            label: "offre",
            key: "/offre",
            icon: <FaPercentage />,
          },

          {
            label: "CodePromo",
            key: "/Promocode",
            icon: <CardGiftcardIcon />,
          },
*/
        ]}
      ></Menu>
    </div>
  );
}
export default SideMenu;
