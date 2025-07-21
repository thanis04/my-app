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

const AdminDashboard = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      email: "john@example.com",
      permissions: pages.reduce((acc, page) => ({ ...acc, [page]: "View" }), {}),
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [newUser, setNewUser] = useState({ email: "", permissions: {} });

  const handleClose = () => {
    setShowModal(false);
    setEditIndex(null);
    setNewUser({ email: "", permissions: {} });
  };

  const handleShow = (index = null) => {
    if (index !== null) {
      setEditIndex(index);
      setNewUser(users[index]);
    } else {
      setNewUser({ email: "", permissions: {} });
    }
    setShowModal(true);
  };

  const handleSave = () => {
    if (editIndex !== null) {
      const updatedUsers = [...users];
      updatedUsers[editIndex] = newUser;
      setUsers(updatedUsers);
    } else {
      const autoPassword = Math.random().toString(36).slice(-8);
      console.log("Auto-generated password:", autoPassword);
      setUsers([...users, { ...newUser, id: Date.now() }]);
    }
    handleClose();
  };

  const handlePermissionChange = (page, value) => {
    setNewUser({
      ...newUser,
      permissions: { ...newUser.permissions, [page]: value },
    });
  };

  return (
    <div className="container-fluid mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Super Admin Dashboard</h2>
        <Button variant="primary" onClick={() => handleShow()}>
          + Add New User
        </Button>
      </div>

      <div className="table-responsive shadow-lg p-3 bg-white rounded">
        <table className="table table-bordered table-striped text-center align-middle">
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
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleShow(index)}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Right-side Modal for Add/Edit */}
      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{editIndex !== null ? "Edit User" : "Add New User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                placeholder="Enter user email"
              />
            </Form.Group>

            <h5 className="mt-3">Permissions</h5>
            <div className="table-responsive">
              <table className="table table-sm table-bordered text-center">
                <thead className="table-light">
                  <tr>
                    <th>Page</th>
                    <th>Permission</th>
                  </tr>
                </thead>
                <tbody>
                  {pages.map((page) => (
                    <tr key={page}>
                      <td>{page}</td>
                      <td>
                        <Form.Select
                          value={newUser.permissions[page] || ""}
                          onChange={(e) =>
                            handlePermissionChange(page, e.target.value)
                          }
                        >
                          <option value="">Select</option>
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
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
