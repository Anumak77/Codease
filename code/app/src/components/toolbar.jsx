import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import'../scripts/coloris.js';
import '../scripts/coloris.css';
import { useState, useEffect } from 'react';
import Element from './element';
import { clickEvents, unselect } from "../scripts/clickEvents";
import { changeColor, changeBgColor } from "../scripts/changeStyles.js";
import { save, load } from "../scripts/saveLoad.js";

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
                <button className="" onClick={() => load(8, setKey, setElements)}><span className="material-symbols-outlined">folder_open</span></button>
            </li>
        </ul>  
    )
}
export default Toolbar;
