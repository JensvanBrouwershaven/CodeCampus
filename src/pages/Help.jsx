import Navbar from "../components/Navigation";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';

const Help = () => {
  return (
    <main className="app">
      <>
        <div>
          <Navbar />
        </div>
        <div className="contactmainpage">
          <div className='app-header'>
            <h1>Help & Uitleg</h1>
          </div>



          <div className="FAQbody">

            <div className="FaqQuestion">
              <div className="FaqQuestionName">
                <h2 className="faqname">
                  Wat is het doel van deze website?
                </h2>
              </div>
              <div className="FaqQuestionText">
                <p className="faqanswer">
                  Deze website is bedoeld om jou te helpen leren programmeren via interactieve cursussen en video’s. Je kunt op je eigen tempo leren en je voortgang bijhouden.
                </p>
              </div>
            </div>

            <div className="FaqQuestion">
              <div className="FaqQuestionName">
                <h2 className="faqname">
                  Hoe begin ik met een cursus?
                </h2>
              </div>
              <div className="FaqQuestionText">
                <p className="faqanswer">
                  Je drukt op een van onze vele lessen, hierbij kunt u de video bekijken en reeds zal u de uitleg krijgen over het materiaal.
                </p>
              </div>
            </div>

            <div className="FaqQuestion">
              <div className="FaqQuestionName">
                <h2 className="faqname">
                  Hoe houd ik mijn voortgang bij?
                </h2>
              </div>
              <div className="FaqQuestionText">
                <p className="faqanswer">
                  In je profiel zie je precies welke lessen je hebt voltooid. Iedere cursus toont ook je voortgang in procenten.
                </p>
              </div>
            </div>

            <div className="FaqQuestion">
              <div className="FaqQuestionName">
                <h2 className="faqname">
                  Wat als ik hulp nodig heb?
                </h2>
              </div>
              <div className="FaqQuestionText">
                <p className="faqanswer">
                  Je kunt ons bereiken via de <Link to="/contact" className="text-blue-600 underline">contactpagina</Link>. We proberen binnen 24 uur te reageren.
                </p>
              </div>
            </div>

            <div className="FaqQuestion">
              <div className="FaqQuestionName">
                <h2 className="faqname">
                  Op welke apparaten werkt de site?
                </h2>
              </div>
              <div className="FaqQuestionText">
                <p className="faqanswer">
                  De website werkt op computers, tablets en smartphones. Voor de beste ervaring raden we aan om een moderne browser zoals Chrome of Firefox te gebruiken.
                </p>
              </div>
            </div>

          </div>
        </div>
        <div>
          <Footer />
        </div>
      </>
    </main>
  );
};

export default Help;
