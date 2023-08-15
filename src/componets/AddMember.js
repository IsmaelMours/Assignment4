import React from 'react'
import { useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';

import { Link } from 'react-router-dom';


import pic from "../assets/photo.png";

const AddMember = ({ onAdd }) => {
  const initialPic = pic;
  const [fileUrl, setFileUrl] = useState(initialPic);
  
  const [fullName, setFullName] = useState('');
  const [jobTitle, setJobTitle] = useState('');

  

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create new member object
    const newMember = {
      fullName,
      jobTitle,
      imageUrl: fileUrl,
    };
    // Call the onAdd prop to add the member
    onAdd(newMember);

    // Clear form inputs
    setFullName('');
    setJobTitle('');
    setFileUrl(pic);

    // Redirect or perform other actions as needed
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
            Add Member
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddMember