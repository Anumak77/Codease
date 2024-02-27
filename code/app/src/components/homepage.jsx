import Button from 'react-bootstrap/esm/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
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

    useEffect (() => {
        for (const template of templates) {
            try {
                console.log(document.getElementById(template.id));
                document.getElementById("Preview" + template.id).innerHTML = template.elements;
            }
            catch {}
        }
    }, [templates]);

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
            <br/>
            
            <Row xs={1} md={2} className="g-4" style={{margin: "0 80px", textAlign: "center"}}>
            {templates.map(
                    (template, id) => (
                        <Col key={id}>
                            <Card className='Cards'>
                                <Card.Body>
                                    <Card.Text>
                                        <div id={"Preview" + template.id} className="Preview"></div> 
                                    </Card.Text>
                                    <Card.Title><h4>{template.name}</h4></Card.Title>
                                    <Button
                                        onClick={() => {
                                            setComponent(<Editor setComponent={setComponent} user={user}/>);
                                            clone(template.elements, user);
                                        }}
                                    >Clone Template</Button>
                                    </Card.Body>
                            </Card>
                        </Col>
            ))}
            </Row>
            {/* <>
                {templates.map(
                    (template) => (
                        <tr>
                            <td width={"500px"} style={{border:"1px solid black", padding:"50px"}}>
                                <h5>{template.name}</h5>
                                <Button
                                    eventKey={template.id}
                                    id={template.id}
                                    onClick={() => {
                                        var preview = document.getElementById("Preview" + template.id);
                                        preview.innerHTML = template.elements;
                                    }}
                                >Preview</Button>
                                <Button
                                    onClick={() => {
                                        setComponent(<Editor setComponent={setComponent} user={user}/>);
                                        clone(template.elements, user);
                                    }}
                                >Clone Template</Button>
                            </td>
                            <td style={{ width: "1000px", height: "300px", border:"1px solid black", verticalAlign: "top", overflow: "hidden"}}>
                                <div id={"Preview" + template.id} style={{zoom: "0.3", position: "relative"}}></div>
                            </td>
                        </tr>
                    ))}
            </table> */}
            
        </div>
    )
}
export default HomePage;