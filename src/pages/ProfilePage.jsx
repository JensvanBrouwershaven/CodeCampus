import { useEffect, useState } from 'react';
import { courses } from '../data/coursesData';
import CourseList from '../components/CourseList';
import CourseCard from '../components/CourseCard';
import { Link } from 'react-router-dom';
import '../styles/App.css';
import Navbar from '../components/Navigation';
import Footer from '../components/Footer';

const getCookie = (name) => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
};

const getFavoriteCourseIds = () => {
  return document.cookie
    .split('; ')
    .filter(cookie => cookie.startsWith('favorite_') && cookie.split('=')[1] === 'true')
    .map(cookie => cookie.split('=')[0].replace('favorite_', ''));
};

const getViewedCourseIds = () => {
  return document.cookie
    .split('; ')
    .filter(cookie => cookie.startsWith('viewed_'))
    .map(cookie => cookie.split('=')[0].replace('viewed_', ''));
};

const ProfilePage = () => {
  const [favoriteCourses, setFavoriteCourses] = useState([]);
  const [viewedCourses, setViewedCourses] = useState([]);

  useEffect(() => {
    const favoriteIds = getFavoriteCourseIds();
    const filteredFavs = courses.filter(course =>
      favoriteIds.includes(course.id?.toString())
    );
    setFavoriteCourses(filteredFavs);

    const viewedIds = getViewedCourseIds();
    const filteredViewed = courses
      .filter(course => viewedIds.includes(course.id?.toString()))
      .sort((a, b) => {
        const aDate = new Date(getCookie(`viewed_${a.id}`));
        const bDate = new Date(getCookie(`viewed_${b.id}`));
        return bDate - aDate;
      });

    setViewedCourses(filteredViewed);
  }, []);

  return (
    <main className="app">
      <Navbar />

      <nav className="breadcrumb">
        <div className="app-header">
          <h1>Mijn Profiel</h1>
        </div>
      </nav>

      {favoriteCourses.length > 0 ? (
        <>
          <h2>Mijn Favoriete Cursussen</h2>
          <CourseList courses={favoriteCourses} />
        </>
      ) : (
        <p className="no-favorites">Je hebt nog geen favoriete cursussen.</p>
      )}

      <hr />

      <h2>Bekeken Cursussen ({viewedCourses.length})</h2>
      {viewedCourses.length > 0 ? (
        <div className="course-list">
          {viewedCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <p className="no-viewed">Je hebt nog geen cursussen bekeken.</p>
      )}

      <Footer />
    </main>
  );
};

export default ProfilePage;
