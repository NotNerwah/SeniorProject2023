import './inventory.css'
import React from 'react'

function displayInventory(inventory){
    let tHeads = <tr><td key="hsku">SKU</td><td key="hname">NAME</td><td key="hcategory">CATEGORY</td><td key="hquantity">QUANTITY</td><td key="hprice">PRICE</td></tr>
    let tBody = inventory.map((d,i)=> <tr key ={"row " + i}>
    <td key={d.sku + " sku"}>{d.sku}</td>
    <td key={d.sku + " name"}>{d.name}</td>
    <td key={d.sku + " category"}>{d.category}</td>
    <td key={d.sku + " quantity"}>{d.quantity}</td>
    <td key={d.sku + " price"}>{d.price}</td></tr>);

    return [tHeads,tBody]
}

const fetchData = async (url)=> {
    let data = await fetch(url);
    let json = await data.json();
    return json;
}

const Inventory = () => {
    const [inventory, setInventory] = React.useState([])
    let [tableHeads, tableBody] = [];
    React.useEffect(()=>{
        fetchData('/inventory').then(r => setInventory(r))
    }, [] )
    if (inventory.length !== 0){
        [tableHeads,tableBody] = displayInventory(inventory)
    }
    return (<div><h2>What's in the warehouse?</h2><body><table><thead>{tableHeads}</thead><tbody>{tableBody}</tbody></table></body></div>)
}
export default Inventory;