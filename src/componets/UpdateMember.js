import React, { useState, useEffect } from 'react';

import { BsArrowLeft } from 'react-icons/bs';


const UpdateMember = ({ memberId, onUpdate }) => {
  const [fullName, setFullName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [picture, setPicture] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  // ... Other state variables and functions
  const fetchMember = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/members/${id}`);
      const data = await res.json();
      return data;
    } catch (error) {
      console.error('Error fetching member data:', error);
      throw error;
    }
  };
  useEffect(() => {
    if (picture) {
      setFileUrl(picture);
    }
  }, [picture]);
  useEffect(() => {
    // Fetch member data using memberId and populate the form
    // Example fetch logic (replace with your actual fetch logic):
    fetchMember(memberId)
      .then(memberData => {
        setFullName(memberData.fullName);
        setJobTitle(memberData.jobTitle);
        setPicture(memberData.imageUrl);
        
        // ... Populate other form fields
      })
      .catch(error => {
        console.error('Error fetching member data:', error);
      });
  }, [memberId]);

  const handleSubmit = async e => {
    e.preventDefault();
    const updatedMember = {
      id: memberId,
      fullName,
      jobTitle,
      imageUrl: fileUrl,
      // ... Other form fields
    };

    // Call the onUpdate function to update the member
    onUpdate(updatedMember);
  };
  const handlePicture = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        setFileUrl(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };
  const navigateToHome = () => {
    window.location.href = 'http://localhost:3001/'; // Redirect to the specified link
  };
  return (
    <div className="App">
      <div className="back-button">
      <BsArrowLeft
          size={50}
          style={{ color: "#164B60" }}
          onClick={navigateToHome}
        />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group-img">
          <div className='img-form'>
            <img src={fileUrl} className="img" alt="Preview" />
          </div>
          <div className='center-file-input'>
            <div className='file-control'>
              <input
                type="file"
                onChange={handlePicture}
                accept="image/*"
              />
            </div>
          </div>
        </div>
        <div className="center-inputs">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder='FULL Name'
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
              placeholder='JOB TITLE'
            />
          </div>
        </div>
        <div className="submit-button">
          <button type="submit" className="btn">
            Update Member
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateMember;
