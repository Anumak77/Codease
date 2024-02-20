import { useState, useEffect } from 'react';
import { clickEvents, unselect } from "../scripts/clickEvents";

var id = 0; 

function save(setkey, setElements) {
    console.log(document.getElementById("Template").innerHTML);
    let template = {
        "name": document.getElementById("Template").name,
        "elements": document.getElementById("Template").innerHTML,
    }

    fetch("http://127.0.0.1:8000/api/templates/" + id + "/", {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(template),
    })
    .then(response => response.json())
    .then(data => {
        console.log("Success:", data);
        alert("Saved!")
    })
    .catch(err=>console.log(err))
}

function load(loadId, setKey, setElements) {
    const template = document.getElementById("Template");
    setElements([]);

    fetch("http://127.0.0.1:8000/api/templates/" + loadId + "/") 
    .then(response => response.json())
    .then(data => {
        console.log("Success:", data);
        id = data.id;
        template.innerHTML = data.elements;
        template.style.zIndex = -1;
        var elems = document.getElementsByClassName("element");
        console.log(elems);
        setKey(elems.length);
        for (const elem of elems) 
        {
            clickEvents(elem);
        }
    }); 
}

function newPage(setKey, setElements) {
    if (setKey && setElements) {
        setKey(0);
        setElements([]);
    }

    let newTemplate = {
        "name": "New template",
        "elements": "<div id='Background'></div>",
    }

    fetch("http://127.0.0.1:8000/api/templates/", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(newTemplate),
    })
    .then(response => response.json())
    .then(data => {
        console.log("Success:", data);
        id = data.id;
        const template = document.getElementById("Template");
        template.name = "New template";
        template.innerHTML = newTemplate.elements;
        template.style = null;
    })
    .catch(err=>console.log(err))
}

export { save, load, newPage };