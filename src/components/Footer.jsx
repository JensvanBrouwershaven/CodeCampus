import { Link } from 'react-router-dom';


const Footer = () =>{
    return (
        <div className="navbar footer">
            <div>
        <p>Veel gestelde vragen</p>
        </div>
        <div className='navbar-links'>
        <Link to='/contact'>Contact</Link>
        </div>
        </div>
    )
}

export default Footer;