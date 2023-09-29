import { useEffect, useState } from 'react';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db, auth } from '../../firebase'; // Import your Firebase configuration
import SidebarContacts from './SidebarContacts'; // Import the SidebarContacts component

function NewGroup() {
  const [contacts, setContacts] = useState([]);
  const [showSidebarContacts, setShowSidebarContacts] = useState(false);

  const loadContacts = () => {
    const contactsQuery = query(collection(db, 'contacts'), where('ownerId', '==', auth.currentUser.uid));
    getDocs(contactsQuery)
      .then((contactsSnapshot) => {
        setContacts(contactsSnapshot.docs.map((doc) => doc.data()));
      })
      .catch((error) => {
        console.error('Error loading contacts:', error);
      });
  };

  useEffect(() => {
    loadContacts();
  }, []);

  // Define the toggleComponent function to handle the back button click
  const toggleComponent = () => {
    setShowSidebarContacts(true); // Set showSidebar to true to display SidebarContacts
  };

  return (
    <div>
      {showSidebarContacts ? (
        // Render the SidebarContacts component when showSidebar is true
        <SidebarContacts />
      ) : (
       
        <div>
          <div className="row " style={{ backgroundColor: '#008069', position: 'sticky', top: "0", color: "white",paddingTop:"50px",marginRight:"0px",paddingBottom:"10px" }}>
            <div className="col-2">
              <button className="bi bi-arrow-left" onClick={toggleComponent}>back</button> {/* Bootstrap left arrow icon */}
            </div>
            <h4 className="col-10"> Add Group Participants</h4>
          </div>
          {contacts.map((contact, index) => (
            <span key={index}>
            <h5>{contact.name}</h5>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default NewGroup;