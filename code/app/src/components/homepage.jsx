import Button from 'react-bootstrap/esm/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useState, useEffect } from 'react';
import Editor from './editor';
import { load, newPage, clone } from '../scripts/saveLoad';

function HomePage({setComponent, user}) {
    const [loads, setLoads] = useState([]);
    const [templates, setTemplates] = useState([]);

    useEffect (() => {
        fetch("http://127.0.0.1:8000/api/templates/?owner=" + JSON.parse(user).id) 
        .then(response => response.json())
        .then(data => {
            console.log("Success:", data);
            try {
                setLoads(data.reverse());
            } catch {}
        })
        
        fetch("http://127.0.0.1:8000/api/templates/") 
        .then(response => response.json())
        .then(data => {
            console.log("Success:", data);
            setTemplates(data.reverse());
        })
    }, [user]);

    // for (const template of templates) {
    // for (var i = 0; i < 10; i++) {
    //     var template = templates[i];
    //     try {
    //         console.log(document.getElementById(template.id));
    //         document.getElementById(template.id).innerHTML = template.elements;
    //     }
    //     catch {}
    // }

    return (
        <div id="HomePage">
            <h1>Editor</h1>
            <Button onClick={()=>{
                setComponent(<Editor setComponent={setComponent} user={user}/>);
                newPage(null, null, user);
            }}>New Template</Button>
            <DropdownButton
                as={ButtonGroup}
                title="Load Template"
                id="bg-vertical-dropdown-1"
            >
                {loads.map(
                    (temp) => (
                        <Dropdown.Item 
                            eventKey={load.id} 
                            onClick={() => {
                                setComponent(<Editor setComponent={setComponent} user={user}/>);
                                load(temp.id);
                            }}
                        >
                            {temp.name}
                        </Dropdown.Item>
                    ),
                )}
            </DropdownButton>
            <hr/>
            <h1>All Templates</h1>
            <table>
                {templates.map(
                    (template) => (
                        <tr>
                            <td width={"500px"} style={{border:"1px solid black", padding:"50px"}}>
                                <h5>{template.name}</h5>
                                <button
                                    eventKey={template.id}
                                    id={template.id}
                                    onClick={() => {
                                        var preview = document.getElementById("Preview" + template.id);
                                        preview.innerHTML = template.elements;
                                    }}
                                >Preview</button>
                                <button
                                    onClick={() => {
                                        setComponent(<Editor setComponent={setComponent} user={user}/>);
                                        clone(template.elements, user);
                                    }}
                                >Clone Template</button>
                            </td>
                            <td style={{ width: "1000px", height: "300px", border:"1px solid black", verticalAlign: "top", overflow: "hidden"}}>
                                <div id={"Preview" + template.id} style={{zoom: "0.3", position: "relative"}}></div>
                            </td>
                        </tr>
                    ))}
                   
                   
            </table>
            
        </div>
    )
}
export default HomePage;