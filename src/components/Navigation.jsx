import '../styles/App.css'
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
      <nav className='navbar'>
        <div className='navbar-container'>
          <ul className='navbar-links'>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/profile'>Profiel</Link>
            </li>
          </ul>
          <div className='navbar-links'>
            <Link to='/help'>Help</Link>
          </div>
        </div>
      </nav>
    );
  };
  
  export default Navbar;