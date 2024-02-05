import { useState, useEffect } from "react";

function Element({id, elem}) {
    const [element, setElement] = useState("");

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/elements/" + elem + "/") 
        .then(response => response.json())
        .then(data => {
            setElement(data);
        });
        
        const container = document.getElementById("elem" + id);    
        container.addEventListener("mousedown", () => {
            document.addEventListener("mousemove", onMouseDrag);
        });
        document.addEventListener("mouseup", () => {
            document.removeEventListener("mousemove", onMouseDrag);
        });
    
        function onMouseDrag(event) {
            let leftValue = event.clientX;
            let topValue = event.clientY;
            container.style.left = `${leftValue}px`;
            container.style.top = `${topValue}px`;
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
