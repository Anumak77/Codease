import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useState } from 'react';
import Element from './element.jsx';
import Toolbar from './toolbar.jsx';
import Image from './image.jsx';

function Editor() {
    const [key, setKey] = useState(0);
    const [elements, setElements] = useState([]);

    function addElement(elem) {
        setElements(elements.concat(<Element id={key} elem={elem}/>));
        setKey(key + 1);
    }

    function addImage() {
        setElements(elements.concat(<Image id={key}/>));
        setKey(key + 1);
    }

    return (
        <div id="Editor">
            <Toolbar setKey={setKey} setElements={setElements}/>
            <ul id = "Editor-nav"  expand="lg" className="p-3 mb-2 nav flex-column navbar-dark" data-bs-theme="dark">
                <li className="nav-item">
                    <button className="nav-link" onClick={() => addElement(3)}>Text Box</button>
                    {/* <DropdownButton
                        as={ButtonGroup}
                        key={'TextArea'}
                        id={`dropdown-button-drop-${'TextArea'}`}
                        drop={"end"}
                        title={`${'TextArea'}`}
                    >
                        <Dropdown.Item eventKey="1"><button className="nav-link" onClick={() => addElement(3)}><img src="Nav1.png"/></button></Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item eventKey="2"><button className="nav-link" onClick={() => addElement(2)}><img src="Nav2.png"/></button></Dropdown.Item>
                    </DropdownButton> */}
                </li>
                <li className="nav-item">
                    <DropdownButton
                        as={ButtonGroup}
                        key={'Navbar'}
                        id={`dropdown-button-drop-${'Navbar'}`}
                        drop={"end"}
                        variant={"secondary"}
                        title={`${'Navbar'}`}
                    >
                        <Dropdown.Item eventKey="1"><button className="nav-link" onClick={() => addElement(1)}><img src="Nav1.png" alt="Nav1"/></button></Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item eventKey="2"><button className="nav-link" onClick={() => addElement(2)}><img src="Nav2.png" alt="Nav2"/></button></Dropdown.Item>
                    </DropdownButton>
                </li>
                <li className="nav-item">
                    <DropdownButton
                        as={ButtonGroup}
                        key={'Image'}
                        id={`dropdown-button-drop-${'Image'}`}
                        drop={"end"}
                        variant={"secondary"}
                        title={`${'Image'}`}
                        autoClose="outside"
                    >
                        <Dropdown.Item eventKey="1">
                            <input id="imagelink" type='text' placeholder="Input Image Address"/>
                            <button className="nav-link" onClick={() => addImage()}>Add Image</button>
                        </Dropdown.Item>
                    </DropdownButton>
                </li>
            </ul>

            <div id="Template" style={{background: "white"}}>
                {elements}
            </div>    
        </div>
    )
}
export default Editor;
