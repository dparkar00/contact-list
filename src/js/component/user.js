import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/contact.css";

const User = () => {
    const { store, actions } = useContext(Context);
    const [selectedValue, setSelectedValue] = useState(""); 

    useEffect(() => {
        actions.showUsers();
        actions.getContactList(); 
    }, []);

    const handleChange = (e) => {
       
        setSelectedValue(e.target.value);
        actions.getSelectedUser(e.target.value);
        actions.getContactList(); 
    };

    return (
        <div className="d-flex align-items-center justify-content-center ms-2">
            <div className="fw-bold pe-3">User:</div>
            <select 
                className="form-select" 
                aria-label="User list" 
                id="user-select"
                value={selectedValue} 
                onChange={handleChange}
            >
                {store.users.length > 0 && (
                    store.users.map((user) => (
                    <option key={user.id} value={`${user.slug}_${user.id || ""}`}>{user.slug}</option>                    ))
                )}
            </select>
        </div>
    );
};

export default User;