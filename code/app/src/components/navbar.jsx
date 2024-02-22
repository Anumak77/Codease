import HomePage from "./homepage";

function TopNavbar({setComponent, user}) {
    return (
        <div className="navbar">
            <div className="navbar-left">
                <img src="http://127.0.0.1:8000/static/img/logo.jpg" alt="Logo"/>
                <a href="/" onClick={() => { setComponent(<HomePage setComponent={setComponent} user={user}/>) }}>Home</a>
            </div>
            <div className="navbar-right">
                <a href="http://127.0.0.1:8000/account/">{user?JSON.parse(user).name:"Account"}</a>
            </div>
        </div>
    )
}

export default TopNavbar;