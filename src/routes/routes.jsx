import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from '../App'; // je homepage
import ProfilePage from '../pages/ProfilePage'; // path naar je profielpagina

function MainRouter() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default MainRouter;
