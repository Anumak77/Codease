import { useState, useEffect } from "react";

function Element({id, elem, html=null}) {
    const [element, setElement] = useState("");
    console.log(html);
    useEffect(() => {
        console.log(html);
        if (html == null) {
            fetch("http://127.0.0.1:8000/api/elements/" + elem + "/") 
            .then(response => response.json())
            .then(data => {
                setElement(data.html);
            });
        }
        else {
            setElement(html);
        }
        
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
        console.log(html);
        if (html != null) {
            console.log(html);
            container.outerHTML = html;
            console.log(container.outerHTML);
        }
        else {
            container.innerHTML = element;
        }   
    }

    return (
        <div id={"elem" + id} key={id} className="element"></div>
    )
}
export default Element;
