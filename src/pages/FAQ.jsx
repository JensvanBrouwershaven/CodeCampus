import Navbar from "../components/Navigation";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';

const FAQ = () => {
  return (
    <main className="app">
      <>
        <div>
          <Navbar />
        </div>
        <div className="contactmainpage">
          <div className='app-header'>
            <h1>Veel Gestelde Vragen</h1>
          </div>

          <div className="FAQbody">

            <div className="FaqQuestion">
              <div className="FaqQuestionName">
                <h2 className="faqname">
                  Wat is programmeren?
                </h2>
              </div>
              <div className="FaqQuestionText">
                <h3 className="faqanswer">
                  Programmeren is het gebruiken van programmeertalen om websites of applicaties te maken. Hiermee kun je oplossingen bouwen voor bedrijven of het dagelijks gebruik van technologie verbeteren.
                </h3>
              </div>
            </div>

            <div className="FaqQuestion">
              <div className="FaqQuestionName">
                <h2 className="faqname">
                  Hoe maken jullie inkomsten?
                </h2>
              </div>
              <div className="FaqQuestionText">
                <h3 className="faqanswer">
                  Wij bieden betaalde cursussen en abonnementsdiensten aan. Daarnaast werken wij samen met bedrijven en instellingen voor maatwerktrajecten.
                </h3>
              </div>
            </div>

            <div className="FaqQuestion">
              <div className="FaqQuestionName">
                <h2 className="faqname">
                  Wie zijn wij?
                </h2>
              </div>
              <div className="FaqQuestionText">
                <h3 className="faqanswer">
                  Wij zijn CodeCampus! Een team van developers en docenten die mensen helpen bij het leren programmeren, of je nu net begint of al ervaring hebt.
                </h3>
              </div>
            </div>

            <div className="FaqQuestion">
              <div className="FaqQuestionName">
                <h2 className="faqname">
                  Hoe komen jullie aan de video's?
                </h2>
              </div>
              <div className="FaqQuestionText">
                <h3 className="faqanswer">
                  Onze video's worden gemaakt door ervaren en geverifieerde docenten. Wij betalen deze docenten zodat wij de lesstof in een gesloten omgeving kunnen aanbieden.
                </h3>
              </div>
            </div>

            {/* NEW FAQ QUESTIONS BELOW */}

            <div className="FaqQuestion">
              <div className="FaqQuestionName">
                <h2 className="faqname">
                  Welke programmeertalen kan ik bij jullie leren?
                </h2>
              </div>
              <div className="FaqQuestionText">
                <h3 className="faqanswer">
                  Je kunt bij ons onder andere HTML, CSS, JavaScript, Python, Java en SQL leren. Ook bieden we frameworks aan zoals React, Node.js en Django.
                </h3>
              </div>
            </div>

            <div className="FaqQuestion">
              <div className="FaqQuestionName">
                <h2 className="faqname">
                  Heb ik voorkennis nodig om te starten?
                </h2>
              </div>
              <div className="FaqQuestionText">
                <h3 className="faqanswer">
                  Nee, je kunt zonder voorkennis beginnen. We hebben cursussen speciaal voor absolute beginners die je stap voor stap begeleiden.
                </h3>
              </div>
            </div>

          </div>
        </div>
        <div>
          <Footer />
        </div>
      </>
    </main>
  )
}

export default FAQ;
