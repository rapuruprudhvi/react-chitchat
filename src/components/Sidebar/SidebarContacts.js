import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./Home.js";

const SidebarContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [showHome, setShowHome] = useState(true); 

  const fetchContacts = () => {
    const contactsCollection = collection(db, "contacts");

    getDocs(contactsCollection)
      .then((querySnapshot) => {
        const fetchedContacts = [];
        querySnapshot.forEach((doc) => {
          fetchedContacts.push(doc.data());
        });

        setContacts(fetchedContacts);
      })
      .catch((error) => {
        console.error("Error fetching contacts: ", error);
      });
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Function to toggle between SidebarContacts and Home
  const toggleComponent = () => {
    setShowHome(!showHome);
  };

  return (
    <div>
      {showHome ? ( 
        <div>
          <div className="row " style={{ backgroundColor: '#008069', position: 'sticky', top: "0", color: "white",paddingTop:"50",marginRight:"0px",paddingBottom:"10" }}>
             <div className="col-2">
              <button className="bi bi-arrow-left" onClick={toggleComponent}>back</button> {/* Bootstrap left arrow icon */}
             </div>
             <div className="col-10"> New Chat</div>
          </div>
          <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', flex: 1, overflowY: 'scroll' }}>
            <h4>Your Contacts</h4>
            <span>
              {contacts.map((contact) => (
                <div key={contact.id}>{contact.name}</div>
              ))}
            </span>
          </div>
        </div>
      ) : (
        <div>
          <Home></Home>
        </div>
      )}
    </div>
  );
};

export default SidebarContacts;