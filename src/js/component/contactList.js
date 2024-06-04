import React, { useContext } from "react";
import { Context } from "../store/appContext";
import ContactCard from "./contactcard.js";

const ContactList = () => {
    const {store, actions} = useContext(Context)
    return(
       

        
        <div className="container">
        <div className="d-flex flex-column align-items-center justify-content-center">

            <ContactCard/>
            
        </div>
        </div>
       
    )
}

export default ContactList;