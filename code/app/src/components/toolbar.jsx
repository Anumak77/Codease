import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import'../scripts/coloris.js';
import '../scripts/coloris.css';
import { useState, useEffect } from 'react';
import Element from './element';
import { clickEvents, unselect } from "../scripts/clickEvents";
import { changeColor, changeBgColor } from "../scripts/changeStyles.js";
import { save, load, newPage } from "../scripts/saveLoad.js";

function Toolbar({ setKey, setElements }) {
    const template = document.getElementById("Template");

    function deleteElement() {
        const id = template.getAttribute("data-selected");
        if (id == null) {
            return;
        }

        if (window.confirm("Are you sure?")) {
            const elem = document.getElementById(id);
            unselect(elem);
            elem.remove();
        }
    }

    useEffect (() => {
        changeColor();
        changeBgColor();

        fetch("http://127.0.0.1:8000/api/templates/") 
        .then(response => response.json())
        .then(data => {
            console.log("Success:", data);
        })
    }, []);

    return (
        <ul id = "Toolbar" className="nav navbar-dark" >
            <li className="nav-item">
                <span className="material-symbols-outlined">format_color_text</span>
                <button id="color-picker" type="text" data-coloris>&#9632;</button>
            </li>
            <li className="nav-item">
                <span className="material-symbols-outlined">format_color_fill</span>
                <button id="bgcolor-picker" type="text" data-coloris>&#9632;</button>
            </li>
            <li className="nav-item">
                <button onClick={() => deleteElement()}><span className="material-symbols-outlined" style={{color: "#D50000"}}>delete</span></button>
            </li>
            <li className="nav-item">
                <button className="" onClick={() => save(setKey, setElements)}><span className="material-symbols-outlined">save</span></button>
            </li>
            <li className="nav-item">
            {/* <DropdownButton
                as={ButtonGroup}
                title="Dropdown"
                id="bg-vertical-dropdown-1"
            >
                <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
                <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
            </DropdownButton> */}
                <button className="" onClick={() => load(47, setKey, setElements)}><span className="material-symbols-outlined">folder_open</span></button>
            </li>
            <li className="nav-item">
                <button className="" onClick={() => {
                    if (window.confirm("Do you want to save the current template?")) {
                        save(setKey, setElements);
                    }
                    newPage(setKey, setElements);
                }}><span className="material-symbols-outlined">note_add</span></button>
            </li>
        </ul>  
    )
}
export default Toolbar;
