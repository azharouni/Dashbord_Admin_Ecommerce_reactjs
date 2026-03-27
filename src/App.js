import React from "react";
import { Space } from "antd";
import "./App.css";
import AppFooter from "./Components/AppFooter";
import AppHeader from "./Components/AppHeader";
import PageContent from "./Components/PageContent";
import SideMenu from "./Components/SideMenu";
import { useLocation, useNavigate } from "react-router-dom";


function App() {
  const location = useLocation();
  const shouldShowNavbar = !["/","/Register"].includes(location.pathname)


  return (
    <div className="App">
{shouldShowNavbar && <AppHeader />}
<div className="SideMenuAndPageContent">
{shouldShowNavbar && <SideMenu />}



        <PageContent></PageContent>
      </div>
    </div>
  );
}
export default App;
