import { useState, useEffect } from 'react';
import { clickEvents, unselect } from "../scripts/clickEvents";

function save(setkey, setElements) {
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
        alert("Saved!")
    })
    .catch(err=>console.log(err))
}

function load(temp, setKey, setElements) {
    const template = document.getElementById("Template");
    setElements([]);

    fetch("http://127.0.0.1:8000/api/templates/" + temp + "/") 
    .then(response => response.json())
    .then(data => {
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

export { save, load };