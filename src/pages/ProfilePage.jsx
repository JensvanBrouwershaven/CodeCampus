import { useEffect, useState } from 'react';
import { courses } from '../data/coursesData'; // of waar je je data importeert
import CourseList from '../components/CourseList';
import { Link } from 'react-router-dom';
import '../styles/App.css'
import Navbar from '../components/Navigation';

const getFavoriteCourseIds = () => {
  return document.cookie
    .split('; ')
    .filter(cookie => cookie.startsWith('favorite_') && cookie.split('=')[1] === 'true')
    .map(cookie => decodeURIComponent(cookie.split('=')[0].replace('favorite_', '')));
};

const ProfilePage = () => {
  const [favoriteCourses, setFavoriteCourses] = useState([]);

  useEffect(() => {
    const favoriteIds = getFavoriteCourseIds();
    const filtered = courses.filter(course =>
      favoriteIds.includes(course.id?.toString()) ||
      favoriteIds.includes(course.title?.replace(/\s+/g, '_'))
    );
    setFavoriteCourses(filtered);
  }, []);

  return (
    <main className='app'>
        <Navbar/>
      <nav className='breadcrumb'>
      <div className='app-header'>
      <h1>Mijn Profiel</h1>
      </div>
      </nav>


      {favoriteCourses.length > 0 ? (
        <>
          <h2>Mijn Favoriete Cursussen</h2>
          <CourseList courses={favoriteCourses} />
        </>
      ) : (
        <p className='no-favorites'>Je hebt nog geen favoriete cursussen.</p>
      )}
    </main>
  );
};

export default ProfilePage;
