import React from 'react';
import PropTypes from 'prop-types';
import Member from './Member';

const Members = ({ members, onDelete, onEdit }) => {
  return (
    <>
      {members.map((member, index) => (
        <Member
          key={index}
          member={member}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </>
  );
}

Members.propTypes = {
  members: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default Members;
