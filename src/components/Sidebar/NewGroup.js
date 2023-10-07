import React, { useEffect, useState } from 'react';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import SidebarContacts from './SidebarContacts';
import CreateGroup from '../../Groups/CreateGroup';

function NewGroup() {
  const [contacts, setContacts] = useState([]);
  const [showSidebarContacts, setShowSidebarContacts] = useState(false);
  const [selectedNames, setSelectedNames] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]); 
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

  const handleNameClick = (name, id) => {
    if (!selectedNames.includes(name)) {
      setSelectedNames([...selectedNames, name]);
      setSelectedIds([...selectedIds, id]); 
    }
  };

  const handleNameDelete = (name, id) => {
    const updatedNames = selectedNames.filter((selectedName) => selectedName !== name);
    setSelectedNames(updatedNames);

    const updatedIds = selectedIds.filter((selectedId) => selectedId !== id);
    setSelectedIds(updatedIds); 
  };

  const toggleGroupName = () => {
    setShowGroupName(!showGroupName);
  };

  if (showGroupName) {
    return <CreateGroup selectedIds={selectedIds} />;
  }

  return (
    <div>
      {showSidebarContacts ? (
        <SidebarContacts />
      ) : (
        <div>
          <div className="row" style={{ backgroundColor: '#008069', position: 'sticky', top: '0', color: 'white', paddingTop: '50px', marginRight: '0px', paddingBottom: '10px' }}>
            <div className="col-1">
              <i className="bi bi-arrow-left" onClick={toggleComponent} style={{fontSize:"25px"}} ></i>
            </div>
            <h4 className="col-11">Add Group Participants</h4>
          </div>
          <div className="row">
            {selectedNames.map((name, index) => (
              <div key={index} className="col-12">
                {name}{' '}
                <i class="bi bi-x" onClick={() => handleNameDelete(name, selectedIds[index])}></i>
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
              onClick={() => handleNameClick(contact.name, contact.uid)}
            >
              {contact.name}
            </div>
          ))}
          
          {/* Conditionally render the button if at least one name is selected */}
          {selectedNames.length > 0 && (
            <div className="row">
              <div className='col-4'></div>
              <div className='col-8'>
                <i class="bi bi-check-circle-fill" onClick={toggleGroupName} style={{fontSize:"40px",color:"green"}}></i>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default NewGroup;
