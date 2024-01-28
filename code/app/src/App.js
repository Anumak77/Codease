import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { useState } from 'react';
import Editor from './components/editor';

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
                {<Editor id={1} />}
                {<Editor id={2}/>}
                <p>hi</p>
            </div>
        </div>
    );
}

export default App;
