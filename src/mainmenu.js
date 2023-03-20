const MainMenuComponent = () =>{
    return <div>
        <h1>Warehouse Inventory Manager</h1>
        <nav>
            <ul>
                <li>
                    <a href="index.html">Home</a>
                </li>
                <li>
                    <a href="Inventory.html">Inventory Manager</a>
                </li>
                <li>
                    <a href="Orders.html">Order Manager</a>
                </li>
            </ul>
        </nav>
    </div>
    }
function mainmenu() {
    return (
        <div className="mainmenu">
          <MainMenuComponent/>
        </div>
      );
}
export default mainmenu;