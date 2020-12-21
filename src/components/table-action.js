import React from "react";
const { Dropdown } = require("react-bootstrap");

function TableAction({ data, onClick }) {
  return (
    <Dropdown>
      <Dropdown.Toggle size="sm" variant="success" id="dropdown-basic">
        Actions
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => onClick("view-profile", data)}>
          <span style={{ fontWeight: "bold", color: "#000" }}>
            View Profile
          </span>
        </Dropdown.Item>
        <Dropdown.Item onClick={() => onClick("edit-detail", data)}>
          <span style={{ fontWeight: "bold", color: "#000" }}>
            Edit Details
          </span>
        </Dropdown.Item>
        <Dropdown.Item onClick={() => onClick("add-member", data)}>
          <span style={{ fontWeight: "bold", color: "#000" }}>Add Member</span>
        </Dropdown.Item>
        <Dropdown.Item onClick={() => onClick("view-members", data)}>
          <span style={{ fontWeight: "bold", color: "#000" }}>
            View All Members
          </span>
        </Dropdown.Item>
        <Dropdown.Item onClick={() => onClick("remove-company", data)}>
          <span className="text-danger" style={{ fontWeight: "bold" }}>
            Remove
          </span>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default TableAction;
