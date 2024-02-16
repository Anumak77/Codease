import { useState, useEffect } from "react";

function Element({id, elem}) {
    const [element, setElement] = useState("");
    const template = document.getElementById("Template");
    const nav = document.getElementById("Editor-nav");

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/elements/" + elem + "/") 
        .then(response => response.json())
        .then(data => {
            setElement(data);
        });
        
        const container = document.getElementById("elem" + id);    
        container.addEventListener("mousedown", (event) => {
            container.setAttribute("data-offsetX", `${event.clientX - container.offsetLeft}`);
            container.setAttribute("data-offsetY", `${event.clientY - container.offsetTop}`);
            template.addEventListener("mousemove", onMouseDrag);
        });
        template.addEventListener("mouseup", () => {
            template.removeEventListener("mousemove", onMouseDrag);
        });
    
        function onMouseDrag(event) {
            //console.log(target);
            //console.log(`${event.clientX} - ${target.left} = ${offsetX}`);
            container.style.left = `${event.clientX - container.getAttribute('data-offsetX')}px`;
            console.log(`${event.clientX} - ${container.getAttribute('data-offsetX')} = ${container.style.left}`);
            //console.log(target.left);
            container.style.top = `${event.clientY - container.getAttribute('data-offsetY')}px`;
        }
    }, []);

    const container = document.getElementById("elem" + id);   
    if (container != null) {
        container.innerHTML = element.html;
    }

    return (
        <div id={"elem" + id} key={id} className="element"></div>
    )
}
export default Element;
