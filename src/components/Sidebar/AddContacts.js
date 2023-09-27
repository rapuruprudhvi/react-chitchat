import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import 'bootstrap/dist/css/bootstrap.min.css';


const AddContacts = () => {
  const [name, setName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contacts, setContacts] = useState([]);

  const loadContacts = () => {
    const contactsQuery = query(collection(db, "contacts"), where("ownerId", "==", auth.currentUser.uid));
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

    const userExistsQuery = query(collection(db, "users"), where("email", "==", contactEmail));
    getDocs(userExistsQuery)
    .then((userExistsSnapshot) => {
      if (userExistsSnapshot.empty) {
        alert("User with provided email does not exist!");
        return;
      }
      const contactUid = userExistsSnapshot.docs[0].data().uid;

      const contactExistsQuery = query(collection(db, "contacts"), where("ownerId", "==", uid), where("email", "==", contactEmail));
      getDocs(contactExistsQuery)
      .then((contactExistsSnapshot) => {
        if (!contactExistsSnapshot.empty) {
          alert("Contact already present with provided email!");
          return;
        }

        return addDoc(collection(db, "contacts"), {
          uid: contactUid,
          email: contactEmail,
          name: name,
          createdAt: serverTimestamp(),
          ownerId: uid,
        });
      })
      .then(() => {
        loadContacts();
        setName("");
        setContactEmail("");
      });
    });

  };

  return (
    <div>
      <form onSubmit={(event) => addContacts(event)} className="add-contacts">
        <label>
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
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
          />
        </label>
        <br/>
        <br/>
        <button type="submit" >Add Contact</button>
      </form>

      <div className="contacts">
        <h2>Contacts</h2>
        <ul>
          {contacts.map((contact) => (
            <li key={contact.email}>
              {contact.name} ({contact.email})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddContacts;