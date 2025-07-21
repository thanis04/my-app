import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const pages = [
  "Products List",
  "Marketing List",
  "Order List",
  "Media Plans",
  "Offer Pricing SKUs",
  "Clients",
  "Suppliers",
  "Customer Support",
  "Sales Reports",
  "Finance & Accounting",
];

const AccessControl = () => {
  // Sample users
  const [users, setUsers] = useState([
    {
      id: 1,
      email: "john@example.com",
      permissions: pages.reduce((acc, page) => ({ ...acc, [page]: "View" }), {}),
    },
    {
      id: 2,
      email: "alice@example.com",
      permissions: pages.reduce((acc, page) => ({ ...acc, [page]: "Edit" }), {}),
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedUser, setSelectedUser] = useState({ email: "", permissions: {} });

  const handleClose = () => {
    setShowModal(false);
    setEditIndex(null);
    setSelectedUser({ email: "", permissions: {} });
  };

  const handleShow = (index) => {
    setEditIndex(index);
    setSelectedUser(users[index]);
    setShowModal(true);
  };

  const handleSave = () => {
    const updatedUsers = [...users];
    updatedUsers[editIndex] = selectedUser;
    setUsers(updatedUsers);
    handleClose();
  };

  const handlePermissionChange = (page, value) => {
    setSelectedUser({
      ...selectedUser,
      permissions: { ...selectedUser.permissions, [page]: value },
    });
  };

  return (
    <div className="container-fluid mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Access Control - User Permissions</h2>
      </div>

      {/* User Role Table */}
      <div className="table-responsive shadow-lg p-3 bg-white rounded">
        <table className="table table-bordered table-hover text-center align-middle">
          <thead className="table-dark">
            <tr>
              <th>Email</th>
              {pages.map((page) => (
                <th key={page}>{page}</th>
              ))}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{user.email}</td>
                {pages.map((page) => (
                  <td key={page}>{user.permissions[page]}</td>
                ))}
                <td>
                  <Button variant="warning" size="sm" onClick={() => handleShow(index)}>
                    Edit Roles
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Editing Permissions */}
      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit User Permissions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>User Email</Form.Label>
              <Form.Control type="email" value={selectedUser.email} disabled />
            </Form.Group>
            <h5>Permissions</h5>
            <div className="table-responsive">
              <table className="table table-sm table-bordered text-center">
                <thead className="table-light">
                  <tr>
                    <th>Page</th>
                    <th>Access Level</th>
                  </tr>
                </thead>
                <tbody>
                  {pages.map((page) => (
                    <tr key={page}>
                      <td>{page}</td>
                      <td>
                        <Form.Select
                          value={selectedUser.permissions[page] || "View"}
                          onChange={(e) => handlePermissionChange(page, e.target.value)}
                        >
                          <option value="View">View</option>
                          <option value="Edit">Edit</option>
                          <option value="Create">Create</option>
                          <option value="Delete">Delete</option>
                        </Form.Select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AccessControl;
