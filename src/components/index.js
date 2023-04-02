import React from "react";
import { Nav, NavLink, NavMenu } 
    from "./navbarelements";

const Navbar = () =>{
    return (<><Nav><NavMenu><NavLink to="/inventory" activeStyle>Inventory</NavLink><NavLink to="/inventoryadjustment" activeStyle>Inventory Adjustment</NavLink><NavLink to ="/Orders" activeStyle>Order Records</NavLink></NavMenu></Nav></>);
};

export default Navbar;

