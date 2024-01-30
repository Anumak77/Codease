import { useState } from 'react';
import Element from './element';

function Editor() {
    const [component, setComponent] = useState(null);
    function addElement() {
        var div = document.createElement("div");
        console.log(<Element id={3}/>);
        div.innerHTML = <Element id={3}/>;
        document.getElementById("Editor").appendChild(div);
    }

    return (
        <div id="Editor">
            <h1>Editor</h1>
            <button onClick={addElement}>Add Element</button>
        </div>
    )
}
export default Editor;
