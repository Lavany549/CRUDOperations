import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Modal } from 'react-bootstrap';

const MainPage = () => {
    const myComponent = {
        width: '80%',
        height: '90vh',
        overflowX: 'hidden',
        overflowY: 'scroll'
    };
    const [isCreateMode, setIsCreateMode] = useState(false);
    const [fetchMode, setFetchMode] = useState(false);
    const [selectedItemData, setSelectedItemData] = useState(null);

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const [warehouseData, setWarehouseData] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState(null);
    // State variables for Product ID
    const [productID, setProductID] = useState("");
    const [productIDError, setProductIDError] = useState("");

    // State variables for Product Name
    const [productName, setProductName] = useState("");
    const [productNameError, setProductNameError] = useState("");

    // State variables for To Pincode
    const [toPincode, setToPincode] = useState("");
    const [toPincodeError, setToPincodeError] = useState("");

    // State variables for From Pincode
    const [fromPincode, setFromPincode] = useState("");
    const [fromPincodeError, setFromPincodeError] = useState("");

    // State variables for Status
    const [status, setStatus] = useState("");
    const [statusError, setStatusError] = useState("");

    const handleClose = () => {
        setShowConfirmationModal(false);
        setProductID("");
        setProductName("");
        setToPincode("");
        setFromPincode("");
        setStatus("");
        setProductIDError("");
        setProductNameError("");
        setToPincodeError("");
        setFromPincodeError("");
        setStatusError("");
        setSelectedItemData("");
        setIsCreateMode(false);
        setFetchMode(false);

    };
    const showErrorAlert = (errorMessage) => {
        alert(`Error: ${errorMessage}`);
    };
    const fetchData = async () => {
        try {
            const response = await axios.get('/api/data/getalldata');
            const data = response.data;
            setWarehouseData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            showErrorAlert('Error fetching data. Please try again.');
        }
    };

    const deleteItem = async (id) => {
        try {
            const response = await axios.delete(`/api/data/delete/${id}`);
            // Optionally, you can fetch the updated data after deletion
            fetchData();
        } catch (error) {
            console.error('Error deleting data:', error);
            showErrorAlert('Error deleting data. Please try again.');
        }
    };
    const fetchItemById = async ({ id }) => {
       
        if (!id) {
            setProductIDError("Product ID cannot be empty");
            return;
        } else {
            setProductIDError(""); // Reset the error if the input is valid
        }
        try {
            const response = await axios.get(`/api/data/getProductbyId/${id}`);
            const itemData = response.data;
            setSelectedItemData(itemData);
            setShowConfirmationModal(true);
        } catch (error) {
            console.error('Error fetching item by ID:', error);
            showErrorAlert('Error fetching item by ID. Please try again.');
        }
    };


    const handleShowById = () => {
        // Fetch data by ID when the "Show by ID" button is clicked

        setFetchMode(true);
        setShowConfirmationModal(true);
        //fetchItemById(id);

    };
    const validate = () => {
        // Validate the input for Product ID
        if (productID === "") {
            setProductIDError("Product ID cannot be empty");
            return;
        } else {
            setProductIDError(""); // Reset the error if the input is valid
        }

        // Validate the input for Product Name
        if (productName === "") {
            setProductNameError("Product Name cannot be empty");
            return;
        } else {
            setProductNameError(""); // Reset the error if the input is valid
        }

        // Validate the input for To Pincode
        if (toPincode === "") {
            setToPincodeError("To Pincode cannot be empty");
            return;
        } else {
            setToPincodeError(""); // Reset the error if the input is valid
        }

        // Validate the input for From Pincode
        if (fromPincode === "") {
            setFromPincodeError("From Pincode cannot be empty");
            return;
        } else {
            setFromPincodeError(""); // Reset the error if the input is valid
        }
        return true;

    }
    const updateItem = async () => {
        const isValid = validate();

        if (isValid) {
            try {
                await axios.patch(`/api/data/update/${selectedItemId}`, {
                    productId: productID,
                    productName: productName,
                    toPincode: toPincode,
                    fromPincode: fromPincode,
                    status: status
                });

                // Optionally, you can fetch the updated data after updating
                fetchData();

                // Close the modal after updating
                handleClose();
            } catch (error) {
                console.error('Error updating data:', error);
                showErrorAlert('Error updating data. Please try again.');
            }
        }
    };


    const handleCreateClick = () => {
        // Set the mode to create
        setIsCreateMode(true);

        // Reset state variables
        setProductID("");
        setProductName("");
        setToPincode("");
        setFromPincode("");
        setStatus("");

        // Show the modal
        setShowConfirmationModal(true);
    };

    const createItem = async () => {
        const isValid = validate();

        if (isValid) {
            try {
                const response = await axios.post("/api/data/create", {
                    productId: productID,
                    productName: productName,
                    toPincode: toPincode,
                    fromPincode: fromPincode,
                    status: status ? status : "scanned"
                });

               

                // Optionally, you can fetch the updated data after creating
                fetchData();

                // Close the modal after creating
                handleClose();
            } catch (error) {
                console.error('Error creating data:', error);
                showErrorAlert('Error creating data. Please try again.');
            }
        }
    };

    const handleUpdateClick = (id) => {
        // Find the selected item from warehouseData based on the id
        const selectedItem = warehouseData.find(item => item._id === id);

        // Set the initial values of the product in the state
        setProductID(selectedItem.productId);
        setProductName(selectedItem.productName);
        setToPincode(selectedItem.toPincode);
        setFromPincode(selectedItem.fromPincode);
        setStatus(selectedItem.status);

        // Set the selectedItemId to the id of the item to be updated
        setSelectedItemId(id);
        setShowConfirmationModal(true);
    };


    useEffect(() => {
        fetchData();
    });
    function logout() {
        localStorage.removeItem('currentUser');
        window.location.href = '/login'
    }

    return (
        <div className="mainContainer">
            <div style={{display:'flex',alignItems:'center'}} >
                <div><h1>Warehouse Details</h1></div>
                <div style={{padding: '20px 3px 10px 150px', margin: "0 0 10px 0"}}>
                <button onClick={logout}>Logout</button>
                </div>
            </div>
            <br />

            <div style={myComponent}>
                <table>
                    <thead>
                        <tr>
                            <th>Item ID</th>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>To Pincode</th>
                            <th>From Pincode</th>
                            <th>Status</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {warehouseData.map((item) => (
                            <tr key={item._id}>
                                <td>{item._id}</td>
                                <td>{item.productId}</td>
                                <td>{item.productName}</td>
                                <td>{item.toPincode}</td>
                                <td>{item.fromPincode}</td>
                                <td>{item.status}</td>
                                <td>
                                    <input
                                        className={"inputButton"}
                                        type="button"
                                        value={"Update"}
                                        onClick={() => handleUpdateClick(item._id)}
                                    />
                                </td>
                                <td>
                                    <input
                                        style={{ background: "red" }}
                                        className={"inputButton"}
                                        type="button"
                                        onClick={() => deleteItem(item._id)}
                                        value={"Delete"}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div style={{ width: "100%" }}>
                <Modal show={showConfirmationModal} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title>
                            {isCreateMode ? (
                                <p>Create Product</p>
                            ) : (
                                <p>{fetchMode ? "View Product" : "Update Product"}</p>
                            )}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {fetchMode && !selectedItemData ? (
                            <>
                                <div className={"inputContainer"}>
                                    <label>Product ID:</label>
                                    <input
                                        type="text"
                                        value={productID}
                                        placeholder="Enter Product ID"
                                        onChange={ev => setProductID(ev.target.value)}
                                        onClick={() => fetchItemById({ id: productID })} // Pass an object with the id property
                                        className={"inputBox"}
                                    />

                                    <label className="errorLabel">{productIDError}</label>
                                </div>

                            </>
                        ) : selectedItemData ? (
                            <>
                                <div style={{
                                    width: '100%',
                                    height: '90vh',
                                    overflowX: 'scroll',
                                    overflowY: 'scroll',
                                }}>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Item ID</th>
                                                <th>Product ID</th>
                                                <th>Product Name</th>
                                                <th>To Pincode</th>
                                                <th>From Pincode</th>
                                                <th>Status</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedItemData.map((item) => (
                                                <tr key={item._id}>
                                                    <td>{item._id}</td>
                                                    <td>{item.productId}</td>
                                                    <td>{item.productName}</td>
                                                    <td>{item.toPincode}</td>
                                                    <td>{item.fromPincode}</td>
                                                    <td>{item.status}</td>

                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                            </>
                        ) : (
                            <>
                                <div className={"inputContainer"}>
                                    <label>Product ID:</label>
                                    <input
                                        value={productID}
                                        placeholder="Enter Product ID"
                                        onChange={ev => setProductID(ev.target.value)}
                                        className={"inputBox"} />
                                    <label className="errorLabel">{productIDError}</label>
                                </div>

                                <div className={"inputContainer"}>
                                    <label>Product Name:</label>
                                    <input
                                        value={productName}
                                        placeholder="Enter Product Name"
                                        onChange={ev => setProductName(ev.target.value)}
                                        className={"inputBox"} />
                                    <label className="errorLabel">{productNameError}</label>
                                </div>

                                <div className={"inputContainer"}>
                                    <label>To Pincode:</label>
                                    <input
                                        value={toPincode}
                                        placeholder="Enter To Pincode"
                                        onChange={ev => setToPincode(ev.target.value)}
                                        className={"inputBox"} />
                                    <label className="errorLabel">{toPincodeError}</label>
                                </div>

                                <div className={"inputContainer"}>
                                    <label>From Pincode:</label>
                                    <input
                                        value={fromPincode}
                                        placeholder="Enter From Pincode"
                                        onChange={ev => setFromPincode(ev.target.value)}
                                        className={"inputBox"} />
                                    <label className="errorLabel">{fromPincodeError}</label>
                                </div>

                                <div className={"inputContainer"}>
                                    <label>Status:</label>
                                    <select
                                        value={status}
                                        onChange={ev => setStatus(ev.target.value)}
                                        className={"inputBox"}>
                                        <option value="scanned">Scanned</option>
                                        <option value="unscanned">Unscanned</option>
                                    </select>
                                    <label className="errorLabel">{statusError}</label>
                                </div>
                            </>

                        )}


                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={handleClose}>Cancel</button>
                        {isCreateMode ? (
                            <button onClick={createItem}>Create</button>
                        ) : fetchMode ? (
                            <button onClick={() => fetchItemById({ id: productID })}>Fetch</button>
                        ) : (
                            <button onClick={updateItem}>Update</button>
                        )}
                    </Modal.Footer>

                </Modal>
            </div>

            <div style={{ display: 'flex', alignItems: "center" }}>
                <div>
                    <h1>Total rows: {warehouseData.length}</h1>
                </div>
                {/* //top right bottom left */}
                <div style={{ padding: '20px 3px 10px 50px', margin: "0 0 10px 0" }}>
                    <input
                        style={{ background: 'green' }}
                        className={"inputButton"}
                        type="button"
                        onClick={() => handleCreateClick()}
                        value={"Create new entry"}

                    />
                </div>
                <div style={{ padding: '20px 3px 10px 50px', margin: "0 0 10px 0" }}>
                    <input
                        style={{ background: 'green' }}
                        className={"inputButton"}
                        type="button"
                        onClick={() => handleShowById()}
                        value={"Filter by ProductID"}

                    />
                </div>
            </div>

        </div>
    );
};

export default MainPage;
