import { Link } from 'react-router-dom';


const Footer = () =>{
    return (
        <div className="navbar footer">
            <div className='navbar-links'>
            <Link to='/faq'>Veel Gestelde Vragen</Link>
        </div>
        <div className='navbar-links'>
        <Link to='/contact'>Contact</Link>
        </div>
        </div>
    )
}

export default Footer;