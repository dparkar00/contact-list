import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/contact.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faTrash, faPen } from "@fortawesome/free-solid-svg-icons";


const ContactCard = () => {
    const { store, actions } = useContext(Context);
    const [editContactId, setEditContactId] = useState(null);
    const [editContactDetails, setEditContactDetails] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    const handleEditClick = (contact) => {
        setEditContactId(contact.id);
        setEditContactDetails(contact);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditContactDetails({
            ...editContactDetails,
            [name]: value
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        actions.updateContact(store.user.slug, editContactId, editContactDetails);
        setEditContactId(null);
    };

    return (
        <ul className="list-group">
            {store.contacts.map((item) => (
                <li key={item.id} className="list-group-item d-flex justify-content-between">
                    {editContactId === item.id ? (
                        <form onSubmit={handleFormSubmit} className="d-flex flex-column w-50">
                            <input
                                type="text"
                                name="name"
                                value={editContactDetails.name}
                                onChange={handleInputChange}
                                placeholder="Name"
                            />
                            <input
                                type="email"
                                name="email"
                                value={editContactDetails.email}
                                onChange={handleInputChange}
                                placeholder="Email"
                            />
                            <input
                                type="text"
                                name="phone"
                                value={editContactDetails.phone}
                                onChange={handleInputChange}
                                placeholder="Phone"
                            />
                            <input
                                type="text"
                                name="address"
                                value={editContactDetails.address}
                                onChange={handleInputChange}
                                placeholder="Address"
                            />
                             <div className="d-flex">
                                <button type="submit" className="btn btn-primary me-2">Save</button>
                                <button type="button" onClick={() => setEditContactId(null)} className="btn btn-secondary">Cancel</button>
                            </div>
                        </form>
                    ) : (
                        <>
                            <div className="image">
                            <FontAwesomeIcon icon={faUserCircle} />
                            </div>
                            <div className="d-flex flex-column w-50">
                                <span>{item.name}</span>
                                <span>{item.email}</span>
                                <span>{item.phone}</span>
                                <span>{item.address}</span>
                            </div>
                            <button onClick={() => actions.deleteContact(item.id)}><FontAwesomeIcon icon={faTrash} /></button>
                            <button onClick={() => handleEditClick(item)} className="btn contact-buttons pb-2">
                            <FontAwesomeIcon icon={faPen} />
                            </button>
                        </>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default ContactCard;
