import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { useState } from 'react';
import TopNavbar from './components/navbar';
import Editor from './components/editor';
import Element from './components/element';

function App() {
    const [component, setComponent] = useState(null);
    if (component == null) {
        setComponent(<Editor/>)
    }

    const handleClick = (event, component) => {
        let buttons = document.getElementsByClassName("nav-link");
        for (var button of buttons) {
            button.classList.remove("active");
        }
        if (event.currentTarget.classList.contains("nav-link")) {
            event.currentTarget.classList.add("active");
        }
        setComponent(component);
    };

    return (
        <div className="App">
            <div className="App-content container-fluid">
                {<TopNavbar/>}
                {component}
            </div>
        </div>
    );
}

export default App;
