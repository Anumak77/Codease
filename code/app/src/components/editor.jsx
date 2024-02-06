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
        const elems = document.getElementsByClassName("element");
        var html = "";
        for (var elem of elems) {
            html = html.concat(elem.outerHTML, "%^&*%");
        }

        var data = {
            "name": "Template",
            "elements": html,
        }

        fetch("http://127.0.0.1:8000/api/templates/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            console.log(response);
        })
        .then(data => {
            console.log("Success:", data);
            setElements([]);
            setKey(0);
        })
        .catch(err=>console.log(err))
    }

    function load(temp) {
        setElements([]);
        setKey(0);

        fetch("http://127.0.0.1:8000/api/templates/" + temp + "/") 
        .then(response => response.json())
        .then(data => {
            var elems = data.elements.split("%^&*%");
            console.log(elems);
            
            for (var elem of elems) 
            {
                if (elem == "") { continue; }
                console.log(elem);
                setElements(elements.concat(<Element id={key} html={elem}/>));
                setKey(key + 1);
            }
        }); 
    }

    return (
        <div id="Editor">
            <h1>Editor</h1>
            <button onClick={() => addElement(1)}>Add Element</button>
            <button onClick={() => addElement(2)}>Add Element</button>
            <button onClick={() => addElement(3)}>Add Element</button>
            <div id="Template">{elements}</div>
            <button onClick={() => save()}>Save</button>
            <button onClick={() => load(2)}>Load</button>
        </div>
    )
}
export default Editor;
