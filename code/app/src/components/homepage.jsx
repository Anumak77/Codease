import Button from 'react-bootstrap/esm/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useState, useEffect } from 'react';
import Editor from './editor';
import { load, newPage } from '../scripts/saveLoad';

function HomePage({setComponent}) {
    const [loads, setLoads] = useState([]);

    useEffect (() => {
        fetch("http://127.0.0.1:8000/api/templates/") 
        .then(response => response.json())
        .then(data => {
            console.log("Success:", data);
            setLoads(data.reverse());
        })
    }, []);

    return (
        <div id="HomePage">
            <h1>Editor</h1>
            <Button onClick={()=>{
                setComponent(<Editor setComponent={setComponent}/>);
                newPage();
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
                                setComponent(<Editor setComponent={setComponent}/>);
                                load(temp.id);
                            }}
                        >
                            {temp.id}. {temp.name}
                        </Dropdown.Item>
                    ),
                )}
            </DropdownButton>
            <hr/>
        </div>
    )
}
export default HomePage;