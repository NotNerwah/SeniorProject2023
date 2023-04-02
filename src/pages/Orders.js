import React,{useState} from 'react'
import './orders.css'

const fetchData = async (url)=> {
    let data = await fetch(url);
    let json = await data.json();
    return json;
}

function displayDOrders(orders,deleteOrder){
    let tHeads = <tr><td key="hordernumber">ORDER #</td>
    <td key="hsku">SKU</td>
    <td key="hitemname">ITEM NAME</td>
    <td key="hcustomername">Customer</td>
    <td key="hcustomeraddr">Address</td>
    <td key="hcustomerphone">Phone Number</td>
    <td key="hdel">DEL</td>
    </tr>

    let tBody = orders.map((d,i)=> <tr key ={"row " + i}>
    <td key={d.orderNumber + " orderNumber"}>{d.orderNumber}</td>
    <td key={d.orderNumber + " sku"}>{d.sku}</td>
    <td key={d.orderNumber + " itemName"}>{d.itemName}</td>
    <td key={d.orderNumber + " customerName"}>{d.customerName}</td>
    <td key={d.orderNumber + " customerAddr"}>{d.customerAddr}</td>
    <td key={d.orderNumber + " customerPhone"}>{d.customerPhone}</td>
    <td key={d.orderNumber + "del"}><button onClick = {event => deleteOrder(d._id)}>X</button></td>
    </tr>);

    return [tHeads,tBody]
}