import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/form.css";

const Form = () => {
    const { actions } = useContext(Context); 

    const [newContact, setNewContact] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        //validation for phone number is a numerical value and valid length
        if (name === "phone" && isNaN(value)) {
            return; 
        }

        
        if (name === "phone" && value.length > 9) {
            return; 
        }

        setNewContact({ ...newContact, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        actions.newContact(newContact.name, newContact.email, newContact.phone, newContact.address);
        setNewContact({ name: "", email: "", phone: "", address: "" });
    };

    return (
        <div id="contact-form" className="container">
            <h1>Add a new contact</h1>
            <form onSubmit={handleSubmit}>
                <div className="d-flex flex-column">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Full Name"
                        value={newContact.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="d-flex flex-column">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter email"
                        value={newContact.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="d-flex flex-column">
                    <label htmlFor="telefono">Phone Number:</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        placeholder="Enter Phone Number"
                        value={newContact.phone}
                        onChange={handleChange}
                    />
                </div>
                <div className="d-flex flex-column">
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        placeholder="Enter Address"
                        value={newContact.address}
                        onChange={handleChange}
                    />
                </div>
                <button className="btn btn-dark w-100" type="submit">Save</button>
            </form>
            <Link to="/">
                <span>or go back to contacts</span>
            </Link>
        </div>
    );
};

export default Form;