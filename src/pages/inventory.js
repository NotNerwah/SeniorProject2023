import React, { useState } from "react";
import "./inventory.css"
import Popup from "../components/popup"

const numbers = '0123456789';

function generateOrderNumber(length){
    let result = 'WIM-';
    const numbersLength = numbers.length;
    for ( let i = 0; i < length; i++ ) {
        result += numbers.charAt(Math.floor(Math.random() * numbersLength));
    }

    return result;
}

const fetchData = async (url)=> {
    let data = await fetch(url);
    let json = await data.json();
    return json;
}


function displayInventory(inventory, togglePopup){

    let tHeads = <tr><td key="hsku">SKU</td>
    <td key="hitemname">ITEM NAME</td>
    <td key="hcategory">CATEGORY</td>
    <td key="hquantity">QUANTITY</td>
    <td key="hprice">PRICE</td>
    <td key = "haddbtn">ORDER?</td>
    </tr>

    let tBody = inventory.map((d,i)=> <tr key ={"row " + i}>
    <td key={d.id + " sku"}>{d.sku}</td>
    <td key={d.id + " itemName"}>{d.itemName}</td>
    <td key={d.id + " category"}>{d.category}</td>
    <td key={d.id + " quantity"}>{d.quantity}</td>
    <td key={d.id + " price"}>{d.price}</td>
    <td key = {d.id + " orderbtn"}><button onClick = {event => togglePopup()}>Add to Order</button></td>
    </tr>);

    return [tHeads,tBody]
}

const url = '/inventory';

async function addData(newOrder){
    const response = await fetch('/addorder', {method : 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(newOrder)})
    return response.json()
  }


const DisplayInventoryAndAddOrders = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [inventory, setInventory] = React.useState([])
    const togglePopup = () => {
        setIsOpen(!isOpen)
    }
    
    let [tableHeads, tableBody] = [];
    React.useEffect(() => {
        fetchData(url).then(r => setInventory(r))
    }, [])
    if(inventory.length !== 0){
        [tableHeads,tableBody] = displayInventory(inventory, togglePopup)
    }
    const [order, setOrders] = React.useState("")
    var [orderNumber, setOrderNumber] = React.useState("")
    var [sku, setSKU] = React.useState("")
    var [itemName, setItemName] = React.useState("")
    const [customerName, setCustomerName] = React.useState("")
    const [customerAddr, setCustomerAddr] = React.useState("")
    const [customerPhone, setCustomerPhone] = React.useState("")
    
    const addOrder = () => {
        setOrderNumber(orderNumber = generateOrderNumber(6));
        setSKU(sku = inventory.indexOf(togglePopup))
        setItemName(itemName = inventory.indexOf(togglePopup))
        let newOrder = {orderNumber: orderNumber, sku: sku, itemName: itemName, customerName: customerName, customerAddr: customerAddr, customerPhone: customerPhone}
        addData(newOrder)
        setOrders(order.concat(newOrder))
        togglePopup()
      }

    return (<div><h2>What's in Stock?</h2><table><thead>{tableHeads}</thead><tbody>{tableBody}</tbody></table>{isOpen && <Popup content= 
        {<><b>Enter Customer Information</b>
        <div>Customer Name:<input type="text" onChange={event => setCustomerName(event.target.value)} required></input></div>
        <div>Customer Address:<input type="text" onChange={event => setCustomerAddr(event.target.value)} required></input></div>
        <div>Customer Phone Number<input type="text" onChange={event => setCustomerPhone(event.target.value)} required></input></div>
        <div><button onClick={event => addOrder()}>Submit</button></div></>} handleClose= {togglePopup}/>}</div>)
}

const InventoryComp = ({component}) => {
    return (
        <div className='invComp'>
            {component}
        </div>
    )
}

const Inventory = () => {
    return <div className='Inventory'>
    <InventoryComp component={<DisplayInventoryAndAddOrders/>}/>
</div>
}
export default Inventory;