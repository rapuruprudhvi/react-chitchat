import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../../firebase.js"; // Import the auth object
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./Home.js";
import CreateGroup from "../../Groups/CreateGroup.js"
import AddContacts from "./AddContacts.js";

const SidebarContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [showHome, setShowHome] = useState(true);

  // Get the signed-in user's ID
  const signedInUserId = auth.currentUser ? auth.currentUser.uid : null;

  const fetchContacts = () => {
    const contactsCollection = collection(db, "contacts");

    getDocs(contactsCollection)
      .then((querySnapshot) => {
        const fetchedContacts = [];
        querySnapshot.forEach((doc) => {
          const contactData = doc.data();
          // Check if the ownerId of the contact matches the signed-in user's ID
          if (contactData.ownerId === signedInUserId) {
            fetchedContacts.push(contactData);
          }
        });

        setContacts(fetchedContacts);
      })
      .catch((error) => {
        console.error("Error fetching contacts: ", error);
      });
  };

  useEffect(() => {
    fetchContacts();
  }, [signedInUserId]); // Re-run the effect when the signed-in user changes

  // Function to toggle between SidebarContacts and Home
  const toggleComponent = () => {
    setShowHome(!showHome);
  };

  return (
    <div>
      {showHome ? (
        <div>
          <div className="row " style={{ backgroundColor: '#008069', position: 'sticky', top: "0", color: "white",paddingTop:"50px",marginRight:"0px",paddingBottom:"10px" }}>
            <div className="col-2">
              <button className="bi bi-arrow-left" onClick={toggleComponent}>back</button> {/* Bootstrap left arrow icon */}
            </div>
            <div className="col-10"> New Chat</div>
          </div>
          <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', flex: 1, overflowY: 'scroll' }}>
            <CreateGroup></CreateGroup>
            <h4>Your Contacts</h4>
            <span>
              {contacts.map((contact) => (
                <div className="row"
                  style={{paddingTop: "10px",paddingBottom: "10px",borderTop: "1px solid #ccc",transition: "background-color 0.3s"}}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#d1d7db";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "";
                  }}
                >
                  <div className="col-12">{contact.name}</div>
                </div>
              ))}
            </span>
            <AddContacts />
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