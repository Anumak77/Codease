import HomePage from './homepage';

function TopNavbar({setComponent}) {
    return (
        <div class="navbar">
            <div class="navbar-left">
                <img src="http://127.0.0.1:8000/static/img/logo.jpg" alt="Logo"/>
                <a href="http://localhost:3000/">Home</a>
            </div>
            <div class="navbar-right">
                <a href="http://127.0.0.1:8000/account/">Account</a>
            </div>
        </div>
    )
}

export default TopNavbar;