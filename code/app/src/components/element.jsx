import { useState, useEffect } from "react";
import { clickEvents, disableLink } from "../scripts/clickEvents";
import { changeText } from "../scripts/changeStyles";

function Element({id, elem}) {
    const [element, setElement] = useState("");

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/elements/" + elem + "/") 
        .then(response => response.json())
        .then(data => {
            setElement(data);
        });    
    }, [elem]);

    const container = document.getElementById("elem" + id);   
    if (container != null) {
        container.innerHTML = element.html;
        clickEvents(container);
        changeText(container);
        disableLink(container);
    }

    return (
        <div id={"elem" + id} key={id} className="element"></div>
    )
}
export default Element;
