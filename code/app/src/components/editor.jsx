import'../scripts/coloris.js';
import '../scripts/coloris.css';
import { useState, useEffect } from 'react';
import Element from './element';
import { clickEvents, unselect } from "../scripts/clickEvents";
import { changeColor } from "../scripts/changeStyles.js";

function Editor() {
    const [key, setKey] = useState(0);
    const [elements, setElements] = useState([]);
    const template = document.getElementById("Template");

    function addElement(elem) {
        setElements(elements.concat(<Element id={key} elem={elem}/>));
        setKey(key + 1);
        console.log(elements);
    }

    function deleteElement() {
        const id = template.getAttribute("data-selected");
        if (id == null) {
            return;
        }

        if (window.confirm("Are you sure?")) {
            const elem = document.getElementById(id);
            unselect(elem);
            elem.remove();
        }
    }

    function save() {
        console.log(document.getElementById("Template").innerHTML);
        let template = {
            "name": "template",
            "elements": document.getElementById("Template").innerHTML
        }

        fetch("http://127.0.0.1:8000/api/templates/", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(template),
        })
        .then(response => response.json())
        .then(data => {
            console.log("Success:", data);
            setElements([]);
        })
        .catch(err=>console.log(err))
    }

    function load(temp) {
        setElements([]);

        fetch("http://127.0.0.1:8000/api/templates/" + temp + "/") 
        .then(response => response.json())
        .then(data => {
            document.getElementById("Template").innerHTML = data.elements;
            var elems = document.getElementsByClassName("element");
            const template = document.getElementById("Template");
            console.log(elems);
            setKey(elems.length);
            for (const elem of elems) 
            {
                clickEvents(elem);
            }
        }); 
    }

    useEffect (() => {
        changeColor();
    }, []);

    return (
        <div id="Editor">
            <ul id = "Editor-nav" class="nav nav-pills flex-column navbar-dark bg-primary">
                <li class="nav-item">
                    <button class="nav-link" onClick={() => save()}>Save</button>
                </li>
                <li class="nav-item">
                    <button class="nav-link" onClick={() => load(1)}>Load</button>
                </li>
                <li class="nav-item">
                    <button class="nav-link" onClick={() => addElement(1)}>Navbar</button>
                </li>
                <li class="nav-item">
                    <button class="nav-link " onClick={() => addElement(2)}>Section</button>
                </li>
                <li class="nav-item">
                    <button class="nav-link" onClick={() => addElement(3)}>Image</button>
                </li>
                <li class="nav-item">
                    <button class="nav-link" onClick={() => addElement(4)}>Button</button>
                </li>
                <li class="nav-item">
                    <input id="color-picker" type="text" data-coloris/>
                </li>
                <li class="nav-item">
                    <button class="nav-link" onClick={() => deleteElement()}>Delete</button>
                </li>
            </ul>

            <div id="Template">{elements}</div>    
        </div>
    )
}
export default Editor;
