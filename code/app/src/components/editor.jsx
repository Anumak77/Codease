import { useState } from 'react';
import Element from './element';

function Editor() {
    const [elements, setElements] = useState([]);
    function addElement() {
        setElements(elements.concat(<Element id={elements.length}/>));
        console.log(elements);
    }

    return (
        <div id="Editor">
            <h1>Editor</h1>
            <button onClick={addElement}>Add Element</button>
            {elements}
        </div>
    )
}
export default Editor;
