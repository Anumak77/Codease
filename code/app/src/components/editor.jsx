import { useState, useEffect } from 'react';
import Element from './element';

function Editor() {
    const [key, setKey] = useState(0);
    const [elements, setElements] = useState([]);

    function addElement(elem) {
        setElements(elements.concat(<Element id={key} elem={elem}/>));
        setKey(key + 1);
        console.log(elements);
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
                console.log(elem);
                elem.addEventListener("mousedown", () => {
                    template.addEventListener("mousemove", onMouseDrag);
                });
                template.addEventListener("mouseup", () => {
                    template.removeEventListener("mousemove", onMouseDrag);
                });  

                function onMouseDrag(event) {
                    let leftValue = event.clientX;
                    let topValue = event.clientY;
                    elem.style.left = `${leftValue  - 150}px`;
                    elem.style.top = `${topValue - 50}px`;
                }
            }
        }); 
    }

    return (
        <div id="Editor">
            <ul id = "Editor-nav" class="nav nav-pills flex-column navbar-dark bg-primary">
                <li class="nav-item">
                    <button class="nav-link" onClick={() => save()}>Save</button>
                </li>
                <li class="nav-item">
                    <button class="nav-link" onClick={() => load(3)}>Load</button>
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
            </ul>

            <div id="Template">{elements}</div>    
        </div>
    )
}
export default Editor;
