import React from 'react';
import PropTypes from 'prop-types';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { BiEditAlt } from 'react-icons/bi';

const Member = ({ member, onDelete, onEdit }) => {
  return (
    <div className="member">
      <div className="member-image">
        <img src={member.imageUrl} alt={` ${member.fullName}`} />
      </div>
     <div className='member-details'>
     <p className='member-name' style={{ fontWeight: 'bold'}}>{member.fullName}</p>

     <p className='member-job' style={{ opacity: 0.6 }}>{member.jobTitle}</p>

     </div>
      
      <div className='icon-method'>
      <h3>
      <BiEditAlt
          size={30}
          style={{ color: "#164B60", marginRight: "20px", cursor: "pointer" }}
          onClick={() => onEdit(member.id)}
        />
        <RiDeleteBin7Line
          size={30}
          style={{ color: "#164B60", cursor: "pointer" }}
          onClick={() => onDelete(member.id)}
        />
      </h3>
      </div>
      
    </div>
  );
}

Member.propTypes = {
  member: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default Member;
