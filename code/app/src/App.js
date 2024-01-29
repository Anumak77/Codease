import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { useState } from 'react';
import TopNavbar from './components/navbar';
import Editor from './components/editor';
import Element from './components/element';

function App() {
  const [component, setComponent] = useState(null);
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
                {<Editor/>}
                {<Element id={1} />}
                {<Element id={2}/>}
                <p>hi</p>
            </div>
        </div>
    );
}

export default App;
