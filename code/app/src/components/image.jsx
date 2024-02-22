import { useState, useEffect } from "react";
import { clickEvents } from "../scripts/clickEvents";

function Image({id}) {
    const [link, setLink] = useState("");

    useEffect(() => {
        setLink(document.getElementById("imagelink").value);
    }, []);

    const container = document.getElementById("elem" + id);   
    if (container != null) {
        container.innerHTML = `<img src="${link}" style="width: 100%; height: auto">`;
        clickEvents(container);
    }

    return (
        <div id={"elem" + id} key={id} className="element image" style={{width: "300px", height: "auto"}}></div>
    )
}
export default Image;
