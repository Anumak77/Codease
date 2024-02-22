import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { useState, useEffect } from 'react';
import TopNavbar from './components/navbar';
import HomePage from './components/homepage';

function App() {
    const [component, setComponent] = useState(null);
    const [user, setUser] = useState(null);

    useEffect (() => {
        var id = new URLSearchParams(window.location.search).get('user');
        fetch("http://127.0.0.1:8000/api/custom_users/" + id + "/") 
        .then(response => response.json())
        .then(data => {
            console.log("Success:", data);
            setUser(JSON.stringify(data));
        });
    }, []);

    useEffect (() => {
        if (component == null && user) {
            console.log(user);
            setComponent(<HomePage setComponent={setComponent} user={user}/>)
        }
    }, [user])

    return (
        <div className="App">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            
            {<TopNavbar setComponent={setComponent} user={user}/>}
            {component}
        </div>
    );
}

export default App;
