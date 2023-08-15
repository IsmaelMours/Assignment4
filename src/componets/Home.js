
import React, { useState, useEffect } from "react";
import Members from "../componets/Members";
import AddMember from "../componets/AddMember";
import Header from "../componets/Header";
import UpdateMember from "../componets/UpdateMember"; // Don't forget to import UpdateMember





const Home = () => {
    const [showAddMember, setShowAddMember] = useState(false);
    const [members, setMembers] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
  
   const fetchMembers = async () => {
        const membersFromServer = await fetchMembersData();
        setMembers(membersFromServer);
      };
    useEffect(() => {
     
    
      fetchMembers();
    }, );
  
    const fetchMembersData = async () => {
      const res = await fetch('http://localhost:3000/members');
      const data = await res.json();
      return data;
    };
  
    const addMember = async (member) => {
      try {
        const response = await fetch('http://localhost:3000/members', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(member),
        });
  
        if (response.ok) {
          const data = await response.json();
          setMembers([...members, data]);
        } else {
          alert('Failed to add member');
        }
      } catch (error) {
        alert('Error adding member: ' + error);
      }
    };
  
    const deleteMember = async (id) => {
      const res = await fetch(`http://localhost:3000/members/${id}`, {
        method: 'DELETE',
      });
  
      if (res.status === 200) {
        setMembers(members.filter((member) => member.id !== id));
      } else {
        alert('Error Deleting This Member');
      }
    };
  
    const handleEditMember = (memberId) => {
      const memberToUpdate = members.find(member => member.id === memberId);
      setSelectedMember(memberToUpdate);
      setShowUpdateForm(true);
    };
  
    const handleUpdateMember = async (updatedMember) => {
      try {
        const res = await fetch(`http://localhost:3000/members/${updatedMember.id}`, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(updatedMember),
        });
  
        if (res.ok) {
          const updatedMembers = members.map(member =>
            member.id === updatedMember.id ? updatedMember : member
          );
          setMembers(updatedMembers);
  
          setSelectedMember(null);
          setShowUpdateForm(false);
        } else {
          alert('Failed to update member');
        }
      } catch (error) {
        alert('Error updating member: ' + error);
      }
    };
  
    return (
   
    <div className="container">
     
        <Header onAdd={() => setShowAddMember(!showAddMember)} showAdd={!showAddMember} />
    
        {showAddMember && !showUpdateForm && <AddMember onAdd={addMember} />}
    
        {!showAddMember && !showUpdateForm && members.length > 0 ? (
          <Members
            members={members}
            onDelete={deleteMember}
            onEdit={handleEditMember}
          />
        ) : !showAddMember && !showUpdateForm ? (
          <p style={{textAlign:"center", fontWeight:'bolder'}}>No Members To Show</p>
        ) : null}
    
        {showUpdateForm && selectedMember && (
          <UpdateMember memberId={selectedMember.id} onUpdate={handleUpdateMember}  />
        ) }
      </div>


     
    );
}

export default Home