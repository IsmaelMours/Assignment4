
import { useLocation } from 'react-router-dom';
import Button from './Button';

const Header = ({ onAdd, showAdd }) => {


  return (
    <header className='header'>
      {showAdd  && (
        <Button text={showAdd ? 'Add Member' :' Back' } onClick={onAdd}  />
      )}
    </header>
  );
}




export default Header;
