import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase.js"; 
import 'bootstrap/dist/css/bootstrap.min.css';


const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [showContacts, setShowContacts] = useState(false);

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
    if (showContacts) {
      fetchContacts();
    }
  }, [showContacts]);

  return (
    <div>
        <i className="bi bi-bar-chart"></i>
      <button onClick={() => setShowContacts(!showContacts)}>
  <i className="bi bi-chat-left-text-fill">contacts</i>
</button>

      {showContacts && (
        <div>
          <h2>Your Contacts</h2>
          <ul>
            {contacts.map((contact) => (
              <li key={contact.id}>{contact.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Contacts;