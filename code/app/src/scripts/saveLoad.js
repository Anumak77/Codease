import { clickEvents } from "../scripts/clickEvents";

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

function load(loadId, setElements) {
    if (setElements) {
        setElements([]);
    }

    fetch("http://127.0.0.1:8000/api/templates/" + loadId + "/") 
    .then(response => response.json())
    .then(data => {
        console.log("Success:", data);
        const template = document.getElementById("Template");
        id = data.id;
        template.name = "New template";
        template.innerHTML = data.elements;
        template.style.zIndex = -1;
        template.setAttribute("data-selected", null);
        
        var elems = document.getElementsByClassName("element");
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
        "elements": "<div id='Background' style='width: 100%; height: 100%; z-index: 0;'></div>",
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
        template.setAttribute("data-selected", null);
    })
    .catch(err=>console.log(err))
}

function download() {
    const template = document.getElementById("Template");
    const link = document.createElement("a");
    const content = template.outerHTML;
    const file = new Blob([content], { type: 'application/html' });
    link.href = URL.createObjectURL(file);
    link.download = template.name + ".html";
    link.click();
    URL.revokeObjectURL(link.href);
}

export { save, load, newPage, download };