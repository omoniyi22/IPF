
import React from 'react';
const { Dropdown } = require("react-bootstrap");

function UserAction({data, onClick}){
    return (
    <Dropdown>
            <Dropdown.Toggle size="sm" variant="success" id="dropdown-basic">
                Actions
            </Dropdown.Toggle>
            <Dropdown.Menu>
            <Dropdown.Item onClick={() => onClick('assign-admin', data)} ><span style={{fontWeight:'bold', color:'#000'}}>Assign as User Admin</span></Dropdown.Item>
            <Dropdown.Item onClick={() => onClick('block', data)}><span className="text-danger"  style={{fontWeight:'bold', color:'#000'}}>Block</span></Dropdown.Item>
            <Dropdown.Item onClick={() => onClick('remove', data)}><span className="text-danger" style={{fontWeight:'bold'}}>Remove</span></Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
    )
}

export default UserAction;