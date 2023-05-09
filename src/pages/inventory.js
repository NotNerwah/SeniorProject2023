import React, { useState } from "react";
import "./inventory.css"
import InventoryAdjustment from "./inventoryadjustment";

const numbers = '0123456789';

var count = [1,2,3,4,5,6,7,8,9,10]

const currentDate = new Date()

currentDate.setDate(7);

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



function displayInventory(inventory){

    let tHeads = <tr><td key="hsku">SKU</td>
    <td key="hitemname">ITEM NAME</td>
    <td key="hcategory">CATEGORY</td>
    <td key="hquantity">QUANTITY</td>
    <td key="hprice">PRICE</td>
    </tr>

    let tBody = inventory.map((d,i)=> <tr key ={"row " + i}>
    <td key={d.id + " sku"}>{d.sku}</td>
    <td key={d.id + " itemName"}>{d.itemName}</td>
    <td key={d.id + " category"}>{d.category}</td>
    <td key={d.id + " quantity"}>{d.quantity}</td>
    <td key={d.id + " price"}>{d.price}</td>
    </tr>);

    return [tHeads,tBody]
}

const url = '/inventory';


async function addData(newOrder){
    const response = await fetch('/addorder', {method : 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(newOrder)})
    return response.json()
}


const DisplayInventory = () => {
    const [inventory, setInventory] = React.useState([])
    let [tableHeads, tableBody] = [];
    React.useEffect(() => {
        fetchData(url).then(r => setInventory(r))
    }, [])
    if(inventory.length !== 0){
        [tableHeads,tableBody] = displayInventory(inventory)

    }
    return (<div><h2>Inventory Stock</h2><table><thead>{tableHeads}</thead><tbody>{tableBody}</tbody>
        </table></div>)
}

const AddOrders = () => {
    const [inventory, setInventory] = React.useState([])
    const [order, setOrders] = useState([])
    var [orderNumber, setOrderNumber] = React.useState("")
    const [sku, setSKU] = React.useState("")
    const [quantity, setQuantity] = React.useState(0)
    const [customerName, setCustomerName] = React.useState("")
    const [customerAddr, setCustomerAddr] = React.useState("")
    const [customerPhone, setCustomerPhone] = React.useState("")
    let [tableHeads, tableBody] = [];
    React.useEffect(() => {
        fetchData(url).then(r => setInventory(r))
    }, [])
    if(inventory.length !== 0){
        [tableHeads,tableBody] = displayInventory(inventory)
    }

    const handleChange = (event) =>{
        setSKU(event.target.value)
    }

    const handleQuantChange = (event) =>{
        setQuantity(event.target.value)

    }
    const addOrder = () => {
        setOrderNumber(orderNumber = generateOrderNumber(6))
        let newOrder = {orderNumber: orderNumber, sku: sku, quantity: quantity, customerName: customerName, customerAddr: customerAddr, customerPhone: customerPhone}
        addData(newOrder)
        setOrders(order.concat(newOrder))
        inventory.update(item => item.quantity-1)
    }
      return (<div><h2>Add an Item to Order</h2><table hidden><thead>{tableHeads}</thead><tbody>{tableBody}</tbody></table>
        <div className="inputs">SKU: <select value={sku} onChange={handleChange}><option value="">Choose an Item</option>{inventory.map(item => (<option value={item.sku} key={item.id}>{item.sku}</option>))}</select></div>
        <p></p>
        <div className="inputs">Quantity: <select value={quantity} onChange={handleQuantChange}><option value="">Choose a quantity(1-10): </option>{count.map(num => (<option>{num}</option>))}</select></div>
        <p></p>
        <b>Enter Customer Information</b>
        <div>Customer Name: <input type="text" onChange={event => setCustomerName(event.target.value)} required></input></div>
        <p></p>
        <div>Customer Address: <input type="text" onChange={event => setCustomerAddr(event.target.value)} required></input></div>
        <p></p>
        <div>Customer Phone Number: <input type="text" onChange={event => setCustomerPhone(event.target.value)} required></input></div>
        <div><button onClick={event => addOrder()}>Submit</button></div></div>)
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
    <InventoryComp component={<DisplayInventory/>}/>
    <InventoryComp component={<AddOrders/>}/>
</div>
}
export default Inventory;