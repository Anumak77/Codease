import Button from 'react-bootstrap/esm/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useState, useEffect } from 'react';
import Editor from './editor';
import { load, newPage, clone, deleteTemplate } from '../scripts/saveLoad';

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
            <br/><br/><br/>
            <div id='Library'>
                <h1>All Templates</h1>
                
                <Row xs={1} md={3} className="g-5" style={{margin: "0 30px"}}>
                {templates.map(
                        (template, id) => (
                            <Col key={id}>
                                <Card className='Cards'>
                                    <Card.Body>
                                        <Card.Text>
                                            <div id={"Preview" + template.id} className="Preview"></div> 
                                        </Card.Text>
                                        <Card.Title><h4>{template.name}</h4></Card.Title>
                                        {template.owner === JSON.parse(user).id ?
                                            <div>
                                                <Button
                                                    onClick={() => {
                                                        setComponent(<Editor setComponent={setComponent} user={user}/>);
                                                        load(template.id);
                                                    }}
                                                >
                                                    Load Template 
                                                </Button>
                                                <Button
                                                    onClick={() => {
                                                        if (window.confirm("Are you sure you want to delete " + template.name + "?")) {
                                                            deleteTemplate(template.id);
                                                            window.location.reload();
                                                        }
                                                    }}
                                                >
                                                    Delete Template 
                                                </Button>
                                            </div>
                                        : 
                                            <Button
                                                onClick={() => {
                                                    setComponent(<Editor setComponent={setComponent} user={user}/>);
                                                    clone(template.elements, user);
                                                }}
                                            >
                                                Clone Template
                                            </Button>
                                        }
                                        </Card.Body>
                                </Card>
                            </Col>
                ))}
                </Row>
            </div>
        </div>
    )
}
export default HomePage;