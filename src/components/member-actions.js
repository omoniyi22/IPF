import React from 'react';
const { Dropdown } = require("react-bootstrap");


function MemberActions({data, onClick}){
    return (
    <Dropdown>
            <Dropdown.Toggle size="sm" variant="success" id="dropdown-basic">
                Actions
            </Dropdown.Toggle>
            <Dropdown.Menu>
            <Dropdown.Item onClick={() => onClick('assign-position', data)} ><span style={{fontWeight:'bold', color:'#000'}}>Assign Position</span></Dropdown.Item>
            <Dropdown.Item onClick={() => onClick('suspend', data)}><span className="text-danger" style={{fontWeight:'bold'}}>Suspend</span></Dropdown.Item>
            <Dropdown.Item onClick={() => onClick('remove', data)}><span className="text-danger" style={{fontWeight:'bold'}} >Remove</span></Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
    )
}

export default MemberActions;

