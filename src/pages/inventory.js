import React from 'react'

function displayInventory(inventory){
    let tHeads = <tr><td key="hsku">SKU</td><td key="hname">NAME</td><td key="hcategory">CATEGORY</td><td key="hquantity">QUANTITY</td><td key="hprice">PRICE</td></tr>
    let tBody = inventory.map((d,i)=> <tr key ={"row " + i}>
    <td key={d.item + " sku"}>{d.sku}</td>
    <td key={d.item + " name"}>{d.name}</td>
    <td key={d.item + " category"}>{d.category}</td>
    <td key={d.item + " quantity"}>{d.quantity}</td>
    <td key={d.item + " price"}>{d.price}</td></tr>);

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
    return (<div><h2>What's in the warehouse?</h2><table><thead>{tableHeads}</thead><tbody>{tableBody}</tbody></table></div>)
}
export default Inventory;