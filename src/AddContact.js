import React, { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import 'bootstrap/dist/css/bootstrap.min.css';


const AddContact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contacts, setContacts] = useState([]);
  const loadContacts = () => {
    const contactsQuery = query(collection(db, "contacts"));
    getDocs(contactsQuery)
      .then((contactsSnapshot) => {
        setContacts(contactsSnapshot.docs.map((doc) => doc.data()));
      })
  }

  useEffect(() => {
    loadContacts();
  }, []);

  const addContacts = (event) => {
    event.preventDefault();

    const { uid } = auth.currentUser;

    const emailExistsQuery = query(collection(db, "contacts"), where("email", "==", email));
    getDocs(emailExistsQuery)
      .then((emailExistsSnapshot) => {
        if (!emailExistsSnapshot.empty) {
          alert("Email already exists!");
          return;
        }

        return addDoc(collection(db, "contacts"), {
          email: email,
          name: name,
          createdAt: serverTimestamp(),
          ownerId: uid,
        });
      })
      .then(() => {
        loadContacts();
        setName("");
        setEmail("");
      })
      
  };

  return (
    <div>
      <form onSubmit={(event) => addContacts(event)} className="add-contacts">
        <label >
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br/>
        <br/>
        <button type="submit" className="btn">Add Contact</button>
      </form>
      
      <div>
        <h2>Contact List</h2>
        <ul>
          {contacts.map((contact, index) => (
            <li key={index}>{contact.name} </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddContact;
