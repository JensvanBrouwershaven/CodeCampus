import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from '../App'; // je homepage
import ProfilePage from '../pages/ProfilePage'; // path naar je profielpagina
import Contact from '../pages/Contact'
import FAQ from '../pages/FAQ'
import Help from '../pages/Help'

function MainRouter() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/Faq' element={<FAQ/>} />
        <Route path='/Help' element={<Help/>} />
      </Routes>
    </Router>
  );
}

export default MainRouter;
