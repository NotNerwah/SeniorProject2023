import React from 'react'
import './orders.css'


const numbers = '0123456789'

const receiveDay = new Date()
receiveDay.setDate(receiveDay.getDate()+5)
var mm = rd.getMonth() + 1
var dd = rd.getDate()
var yyyy = rd.getFullYear()
const dateInfo = mm + "/" + dd + "/" + yyyy

//const actualDate = new Date()



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

function displayDOrders(orders,cancelOrder){
    let tHeads = <tr><td key="hordernumber">ORDER #</td>
    <td key="hsku">SKU</td>
    <td key="hquantity">QUANTITY</td>
    <td key="hcustomername">CUSTOMER</td>
    <td key="hcustomeraddr">CUSTOMER ADDRESS</td>
    <td key="hcustomerphone">CUSTOMER PHONE NUMBER</td>
    <td key="hdel">CANCEL</td>
    </tr>

    let tBody = orders.map((d,i)=> <tr key ={"row " + i}>
    <td key={d.orderNumber + " orderNumber"}>{d.orderNumber}</td>
    <td key={d.orderNumber + " sku"}>{d.sku}</td>
    <td key={d.orderNumber + " quantity"}>{d.quantity}</td>
    <td key={d.orderNumber + " customerName"}>{d.customerName}</td>
    <td key={d.orderNumber + " customerAddr"}>{d.customerAddr}</td>
    <td key={d.orderNumber + " customerPhone"}>{d.customerPhone}</td>
    <td key={d.orderNumber + "del"}><button onClick = {event => cancelOrder(d._id)}>X</button></td>
    </tr>);

    return [tHeads,tBody]
}

function displayBOrders(backorders){
    let tHeads = <tr>
    <td key="hbackordernumber">BACKORDER #</td>
    <td key="hsku">SKU</td>
    <td key="hitemname">ITEM NAME</td>
    <td key="hcategory">CATEGORY</td>
    <td key="hquantity">QUANTITY</td>
    <td key="hprice">PRICE</td>
    <td key="hdate">DATE</td>
    </tr>

    let tBody = backorders.map((d,i)=> <tr key ={"row " + i}>
    <td key={d.id + " backorderNumber"}>{d.backorderNumber}</td>
    <td key={d.id + " sku"}>{d.sku}</td>
    <td key={d.id + " itemName"}>{d.itemName}</td>
    <td key={d.id + " category"}>{d.category}</td>
    <td key={d.id + " quantity"}>{d.quantity}</td>
    <td key={d.id + " price"}>{d.price}</td>
    <td key={d.id + " date"}>{d.date}</td>
    </tr>);

    return [tHeads,tBody]
}
//<td key ={d.id + " receive"}><button hidden onClick={receive(d._id)}>Receive</button></td>

function generateBackOrderNumber(length){
    let result = 'BACK-';
    const numbersLength = numbers.length;
    for ( let i = 0; i < length; i++ ) {
        result += numbers.charAt(Math.floor(Math.random() * numbersLength));
    }

    return result;
}

const url = '/order'
const url2 ='/backorder'
const url3 = '/inventory'

async function deleteData(id) {
    const response = await fetch('/cancelOrder',{method: 'POST', headers: {'Content-Type': 'application/json'}, body: '{"_id": "'+id+'"}'})
    return response.json()
}

const DisplayOrdersAndDelete = () => {
    const [orders, setOrders] = React.useState([])
    let [tableHeads,tableBody] = [];
    React.useEffect(() => {
        fetchData(url).then(r => setOrders(r))
    }, [])
    if(orders.length !== 0){
        const cancelOrder = (id) => {
            deleteData(id)
            setOrders(orders.filter(order => order._id !== id))
        }
        [tableHeads,tableBody] = displayDOrders(orders, cancelOrder);
    }
    return (<div><h2>Order Records</h2><table><thead>{tableHeads}</thead><tbody>{tableBody}</tbody></table></div>)
}

async function addData(newBackOrder){
    const response = await fetch('/addbackorder', {method : 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(newBackOrder)})
    return response.json()
}

const AddBackorder = () => {
        const [inventory, setInventory] = React.useState([])
        const [backorder, setBackorders] = React.useState([])
        const [sku, setSKU] = React.useState("")
        const [itemName, setItemName] = React.useState("")
        var [backorderNumber, setBackorderNumber] = React.useState("")
        const [category, setCategory] = React.useState("")
        const [price, setPrice] = React.useState(0)
        const [date, setDate] = React.useState(dateInfo)
        let [tableHeads, tableBody] = [];
        React.useEffect(() => {
            fetchData(url3).then(r => setInventory(r))
        }, [])
        if(inventory.length !== 0){
            [tableHeads,tableBody] = displayInventory(inventory)
        }
        const addBackorder = () => {
            setBackorderNumber(backorderNumber = generateBackOrderNumber(5))
            setSKU(sku)
            setItemName(itemName)
            setCategory(category)
            setPrice(price)
            setDate(dateInfo)
            let newBackorder = {backorderNumber: backorderNumber, sku: sku, itemName: itemName, category: category, quantity: 0, price: price, date: date}
            addData(newBackorder)
            setBackorders(backorder.concat(newBackorder))
        }
        return (<div><h2>Add a Backorder</h2><table hidden><thead>{tableHeads}</thead><tbody>{tableBody}</tbody></table>
        <div className='add'><button id ="Add" className="addButton" onClick={event => addBackorder()}>Add</button></div></div>)

}

const DisplayBackorders = () => {
    const [backorders, setBackorders] = React.useState([])

    let [tableHead, tableBod] = [];
    React.useEffect(() => {
        fetchData(url2).then(r => setBackorders(r))
    }, [])
    if(backorders.length !== 0){
        [tableHead,tableBod] = displayBOrders(backorders)
    }
    return (<div><h2>Backorders</h2><table><thead>{tableHead}</thead><tbody>{tableBod}</tbody></table></div>)
}

const OrderComp = ({component}) => {
    return (
        <div className='ordComp'>
            {component}
        </div>
    )
}
const Orders = () => {
    return (
        <div className='Orders'>
            <OrderComp component={<DisplayOrdersAndDelete/>}/>
            <OrderComp component={<AddBackorder/>}/>
            <OrderComp component={<DisplayBackorders/>}/>
        </div>
    );
}
export default Orders