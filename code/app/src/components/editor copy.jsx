import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState, useEffect } from 'react';
import Element from './element';
import Toolbar from './toolbar.jsx';
import { clickEvents, unselect } from "../scripts/clickEvents";
import { changeColor } from "../scripts/changeStyles.js";

function Editor() {
    const [key, setKey] = useState(0);
    const [elements, setElements] = useState([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const options = {
        name: 'Disable backdrop',
        scroll: true,
        backdrop: false,
    };

    const template = document.getElementById("Template");

    function addElement(elem) {
        setElements(elements.concat(<Element id={key} elem={elem}/>));
        setKey(key + 1);
        console.log(elements);
    }

    return (
        <div id="Editor">
            <Toolbar setKey={setKey} setElements={setElements}/>
            <Button variant="primary" onClick={handleShow}>
                Launch
            </Button>
            <Offcanvas id = "Editor-nav" show={show} onHide={handleClose} scroll={true} backdrop={false}>
                <Offcanvas.Header closeButton></Offcanvas.Header>
                <Offcanvas.Body>
                <ul id = "Editor-nav"  expand="lg" className="p-3 mb-2 nav flex-column navbar-dark" data-bs-theme="dark">
                    <li className="nav-item">
                        <button className="nav-link" onClick={() => addElement(1)}>Navbar</button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link " onClick={() => addElement(2)}>Section</button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link" onClick={() => addElement(3)}>Image</button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link" onClick={() => addElement(4)}>Button</button>
                    </li>
                </ul>
                </Offcanvas.Body>
            </Offcanvas>

            <div id="Template">{elements}</div>    
        </div>
    )
}
export default Editor;
