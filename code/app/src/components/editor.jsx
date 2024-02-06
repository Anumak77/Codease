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
            console.log(elems);
            setKey(elems.length);
            for (const elem of elems) 
            {
                console.log(elem);
                elem.addEventListener("mousedown", () => {
                    document.addEventListener("mousemove", onMouseDrag);
                });
                document.addEventListener("mouseup", () => {
                    document.removeEventListener("mousemove", onMouseDrag);
                });  

                function onMouseDrag(event) {
                    let leftValue = event.clientX;
                    let topValue = event.clientY;
                    elem.style.left = `${leftValue}px`;
                    elem.style.top = `${topValue}px`;
                }
            }
        }); 
    }

    return (
        <div id="Editor">
            <h1>Editor</h1>
            <button onClick={() => addElement(1)}>Add Element</button>
            <button onClick={() => addElement(2)}>Add Element</button>
            <button onClick={() => addElement(3)}>Add Element</button>
            <button onClick={() => save()}>Save</button>
            <button onClick={() => load(3)}>Load</button>
            <div id="Template">{elements}</div>
            
        </div>
    )
}
export default Editor;
