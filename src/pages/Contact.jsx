import Navbar from "../components/Navigation";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';

const Contact = () =>{
    return (
        <main className="app">
        <><div>
            <Navbar />
        </div>
        <div className="contactmainpage">

        
              <div className='app-header'>
      <h1>Contact</h1>
      </div>
      <div className="Contact-Information">
        <h2>Telefoon: 06-01064578</h2>
        <h2>Email: Service@CodeCampus.nl</h2>
        <div className="wachttijd">
        <h2>Wij zijn alleen niet beschikbaar in weekenden. Verwacht een wachttijd van 1-3 werkdagen bij email. Als wij het telefonisch druk hebben zullen wij u terug bellen.</h2>
        </div>
        </div>
      </div>
        <div>
                <Footer />
            </div></>  
        </main>
    )
}

export default Contact;