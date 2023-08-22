import { BrowserRouter, Route, Routes , useLocation} from "react-router-dom";
import React, { useState, useEffect } from "react";

import Customers from "../../Pages/Customers";
import Dashboard from "../../Pages/Dashbaord";
import Inventory from "../../Pages/Inventory";
import Orders from "../../Pages/Orders";
import Cotegoris from "../../Pages/Cotegoris";
import Offre from "../../Pages/offre";
import Editproduit from "../../Pages/Editproduit";
import Promocode from "../../Pages/Promocode";
import Editclient from "../../Pages/Editclient";
import Editcategories from "../../Pages/Editcategories";
import Offreedit from "../../Pages/Offreedit";
import Login  from "../../Pages/Login";
import Addproduit  from "../../Pages/Addproduit";
import Addcategoris  from "../../Pages/Addcategoris";
import Addclient  from "../../Pages/Addclient";
import Addoffre  from "../../Pages/Addoffre";
import Addcodopromo  from "../../Pages/Addcodopromo";
import Souscategories  from "../../Pages/Souscategories";
import Addsouscategories  from "../../Pages/Addsouscategories";
import EditSOUScategories from "../../Pages/EditSOUScategories";
import Register from "../../Pages/Register";
import Detailcommande from "../../Pages/Detailcommande";








  
function AppRoutes() {
  

  const location = useLocation();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (
      !token &&
      location.pathname !== "/" &&
      location.pathname !== "/login" &&
      location.pathname !== "/Register" 
    ) {
      window.location.href = "/"; // or use navigate('/login') if you have access to the `useNavigate` hook
    }
  }, [location]);



  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/Register" element={<Register/>}></Route>

      <Route path="/Dashboard" element={<Dashboard/>}></Route>

      <Route path="/inventory" element={<Inventory />}></Route>
      <Route path="/orders" element={<Orders />}></Route>
      <Route path="/customers" element={<Customers />}></Route>
      <Route path="/cotegoris" element={<Cotegoris/>}></Route>
        <Route path="/offre" element={<Offre/>}></Route>
        <Route path="/edit/:id" element={<Editproduit/>}></Route>
        <Route path="/Promocode" element={<Promocode/>}></Route>
        <Route path="/Editclient/:id" element={<Editclient/>}></Route>
        <Route path="/Editcategories/:id" element={<Editcategories/>}></Route>

        <Route path="/Offreedit/:title" element={<Offreedit/>}></Route>
        <Route path="/Promocode" element={<Promocode/>}></Route>
        <Route path="/Addproduit" element={<Addproduit/>}></Route>
        <Route path="/Addcategoris" element={<Addcategoris/>}></Route>
        <Route path="/Addclient" element={<Addclient/>}></Route>
        <Route path="/Addoffre" element={<Addoffre/>}></Route>
        <Route path="/Addcodopromo" element={<Addcodopromo/>}></Route>
        <Route path="/Souscategories" element={<Souscategories/>}></Route>
        <Route path="/Addsouscategories" element={<Addsouscategories/>}></Route>
        <Route path="/EditSOUScategories/:id" element={<EditSOUScategories/>}></Route>
        <Route path="/Detailcommande/:id" element={<Detailcommande/>}></Route>


        

        

    </Routes>
  );
}
export default AppRoutes;
