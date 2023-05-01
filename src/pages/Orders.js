import React from 'react'
import './orders.css'

const fetchData = async (url)=> {
    let data = await fetch(url);
    let json = await data.json();
    return json;
}

function displayDOrders(orders,cancelOrder){
    let tHeads = <tr><td key="hordernumber">ORDER #</td>
    <td key="hsku">SKU</td>
    <td key="hitemname">ITEM NAME</td>
    <td key="hquantity">QUANTITY</td>
    <td key="hcustomername">CUSTOMER</td>
    <td key="hcustomeraddr">CUSTOMER ADDRESS</td>
    <td key="hcustomerphone">CUSTOMER PHONE NUMBER</td>
    <td key="hdel">CANCEL</td>
    </tr>

    let tBody = orders.map((d,i)=> <tr key ={"row " + i}>
    <td key={d.orderNumber + " orderNumber"}>{d.orderNumber}</td>
    <td key={d.orderNumber + " sku"}>{d.sku}</td>
    <td key={d.orderNumber + " itemName"}>{d.itemName}</td>
    <td key={d.orderNumber + " quantity"}>{d.quantity}</td>
    <td key={d.orderNumber + " customerName"}>{d.customerName}</td>
    <td key={d.orderNumber + " customerAddr"}>{d.customerAddr}</td>
    <td key={d.orderNumber + " customerPhone"}>{d.customerPhone}</td>
    <td key={d.orderNumber + "del"}><button onClick = {event => cancelOrder(d._id)}>X</button></td>
    </tr>);

    return [tHeads,tBody]
}

function displayBOrders(backorders){
    let tHeads = <tr><td key="hordernumber">ORDER #</td>
    <td key="hsku">SKU</td>
    <td key="hitemname">ITEM NAME</td>
    <td key="hcategory">CATEGORY</td>
    <td key="hquantity">QUANTITY</td>
    <td key="hprice">PRICE</td>
    </tr>

    let tBody = backorders.map((d,i)=> <tr key ={"row " + i}>
    <td key={d.id + " sku"}>{d.sku}</td>
    <td key={d.id + " itemName"}>{d.itemName}</td>
    <td key={d.id + " category"}>{d.category}</td>
    <td key={d.id + " quantity"}>{d.quantity}</td>
    <td key={d.id + " price"}>{d.price}</td>
    </tr>);

    return [tHeads,tBody]
}

const url = '/order'
const url2 ='/backorders'

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

const DisplayBackorders = () => {
    const [backorders, setBackorders] = React.useState([])
    let [tableHeads, tableBody] = [];
    React.useEffect(() => {
        fetchData(url2).then(r => setBackorders(r))
    }, [])
    if(backorders.length !== 0){
        [tableHeads,tableBody] = displayBOrders(backorders)
    }
    return (<div><h2>Backorders</h2><table><thead>{tableHeads}</thead><tbody>{tableBody}</tbody></table></div>)
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
            <OrderComp component={<DisplayBackorders/>}/>
        </div>
    );
}
export default Orders