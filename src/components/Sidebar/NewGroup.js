import React, { useEffect, useState } from 'react';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import SidebarContacts from './SidebarContacts';
import CreateGroup from '../../Groups/CreateGroup';

function NewGroup() {
  const [contacts, setContacts] = useState([]);
  const [showSidebarContacts, setShowSidebarContacts] = useState(false);
  const [selectedNames, setSelectedNames] = useState([]);
  const [showGroupName, setShowGroupName] = useState(false);


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

  const toggleComponent = () => {
    setShowSidebarContacts(true);
  };

  const handleNameClick = (name) => {
    if (!selectedNames.includes(name)) {
      setSelectedNames([...selectedNames, name]);
    }
  };

  const handleNameDelete = (name) => {
    const updatedNames = selectedNames.filter((selectedName) => selectedName !== name);
    setSelectedNames(updatedNames);
  };

  const toggleGroupName = () => {
    setShowGroupName(!showGroupName);
  };

  if(showGroupName) {
    return <CreateGroup />
  }


  return (
    <div>
      {showSidebarContacts ? (
        <SidebarContacts />
      ) : (
        <div>
          <div className="row" style={{ backgroundColor: '#008069', position: 'sticky', top: '0', color: 'white', paddingTop: '50px', marginRight: '0px', paddingBottom: '10px' }}>
            <div className="col-2">
              <button className="bi bi-arrow-left" onClick={toggleComponent}>
                back
              </button>
            </div>
            <h4 className="col-10">Add Group Participants</h4>
          </div>
          <div className="row">
            {selectedNames.map((name, index) => (
              <div key={index} className="col-12">
                {name}{' '}
                <button onClick={() => handleNameDelete(name)} >
                  Delete
                </button>
              </div>
            ))}
          </div>
          {contacts.map((contact, index) => (
            <div
              key={index}
              className="row"
              style={{
                paddingTop: '15px',
                paddingBottom: '15px',
                marginBottom: '0px',
                marginRight: '0px',
                borderTop: '1px solid #dee2e6',
                fontSize: '20px',
                cursor: 'pointer',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#ccc';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '';
              }}
              onClick={() => handleNameClick(contact.name)}
            >
              {contact.name}
            </div>
          ))}
          
          {/* Conditionally render the button if at least one name is selected */}
          {selectedNames.length > 0 && (
            <div className="row">
              <div className='col-4'></div>
              <div className='col-8'>
                <button onClick={toggleGroupName}>Next</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default NewGroup;
