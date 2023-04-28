import React,{useState} from 'react'
import './inventoryadjustment.css'

const fetchData = async (url)=> {
    let data = await fetch(url);
    let json = await data.json();
    return json;
}


function displayDInventory(inventory,deleteItem){
    let tHeads = <tr><td key="hsku">SKU</td>
    <td key="hname">ITEM NAME</td>
    <td key="hcategory">CATEGORY</td>
    <td key="hquantity">QUANTITY</td>
    <td key="hprice">PRICE</td>
    <td key="hdel">DEL</td>
    </tr>

    let tBody = inventory.map((d,i)=> <tr key ={"row " + i}>
    <td key={d.id + " sku"}>{d.sku}</td>
    <td key={d.id + " itemName"}>{d.itemName}</td>
    <td key={d.id + " category"}>{d.category}</td>
    <td key={d.id + " quantity"}>{d.quantity}</td>
    <td key={d.id + " price"}>{d.price}</td>
    <td key={d.id + "del"}><button onClick = {event => deleteItem(d._id)}>X</button></td>
    </tr>);

    return [tHeads,tBody]
}

const url = '/inventory'

async function deleteData (id){
    const response = await fetch('/deleteitem',{method: 'POST', headers: {'Content-Type': 'application/json'}, body: '{"_id": "'+id+'"}'})
    return response.json()
}

const DeleteInventoryItem = () => {
    const [inventory, setInventory] = React.useState([])
    let [tableHeads,tableBody] = [];
    React.useEffect(() => {
        fetchData(url).then(r => setInventory(r))
    }, [])
    if(inventory.length !== 0){
        const deleteItem = (id) => {
            deleteData(id)
            setInventory(inventory.filter(item => item._id !== id))
        }
        [tableHeads,tableBody] = displayDInventory(inventory, deleteItem);
    }
    return (<div><h2>Adjusting the Inventory?</h2><table><thead>{tableHeads}</thead><tbody>{tableBody}</tbody></table></div>)
}

async function addData(newItem){
    const response = await fetch('/additem', {method : 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(newItem)})
    return response.json()
}

const AddInventoryItem = () => {
    const [inventory, setInventory] = useState("")
    const [sku, setSKU] = useState("")
    const [itemName, setItemName] = useState("")
    const [category, setCategory] = useState("")
    const [quantity, setQuantity] = useState("")
    const [price, setPrice] = useState("")

    const addItem = () => {
        let newItem = {sku: sku, itemName: itemName, category: category, quantity: quantity, price: price}
        addData(newItem)
        setInventory(inventory.concat(newItem))
    }
    return (<div><h3>Add Item</h3>
    <div className="inputs">SKU: <input type="text" className='textInput' onChange={event => setSKU(event.target.value)} required></input></div>
    <div className="inputs">Name: <input type="text" className='textInput' onChange={event => setItemName(event.target.value)}></input></div>
    <div className="inputs">Category: <input type="text" className='textInput' onChange={event => setCategory(event.target.value)}></input></div>
    <div className="inputs">Quantity: <input type="text" className='textInput' onChange={event => setQuantity(event.target.value)}required></input></div>
    <div className="inputs">Price: <input type="text" className='textInput' onChange={event => setPrice(event.target.value)}required></input></div>
    <div className='add'><button id ="Add" className="addButton" onClick={event => addItem()}>Add</button></div>
    </div>)
}

const InventoryAdjustComp = ({component}) => {
    return (
        <div className='invAdjComp'>
            {component}
        </div>
    )
}

const InventoryAdjustment = () => {
    return (
        <div className='InventoryAdjustment'>
            <InventoryAdjustComp component={<DeleteInventoryItem/>}/>
            <InventoryAdjustComp component={<AddInventoryItem/>}/>
        </div>
    );
}

export default InventoryAdjustment;