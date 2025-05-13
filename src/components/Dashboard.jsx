import { useState } from 'react';
import '../styles/Dashboard.css';
import CourseList from './CourseList';
import PopularCourses from './PopularCourses';
import Statistics from './Statistics';

const Dashboard = ({ courseData }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = () => {
    if (!courseData || !Array.isArray(courseData)) return [];

    let filtered = courseData;

    if (activeTab === 'beginner') {
      filtered = filtered.filter((course) => course.level === 'Beginner');
    } else if (activeTab === 'gevorderd') {
      filtered = filtered.filter((course) => course.level === 'Gevorderd');
    } else if (activeTab === 'populair') {
      filtered = [...filtered].sort((a, b) => b.views - a.views);
    }

    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(term) ||
          course.description.toLowerCase().includes(term)
      );
    }

    return filtered;
  };

  const filtered = filteredCourses();

  return (
    <section className='dashboard'>
      <header className='dashboard-header'>
        <nav className='tab-buttons'>
          <button
            className={activeTab === 'all' ? 'active' : ''}
            onClick={() => setActiveTab('all')}
          >
            Alle Cursussen
          </button>
          <button
            className={activeTab === 'beginner' ? 'active' : ''}
            onClick={() => setActiveTab('beginner')}
          >
            Voor Beginners
          </button>
          <button
            className={activeTab === 'gevorderd' ? 'active' : ''}
            onClick={() => setActiveTab('gevorderd')}
          >
            Gevorderd
          </button>
          <button
            className={activeTab === 'populair' ? 'active' : ''}
            onClick={() => setActiveTab('populair')}
          >
            Meest Bekeken
          </button>
        </nav>
      </header>

      <div className='dashboard-content'>
        <section className='main-content'>
          <input
            type='text'
            placeholder='Zoek op titel of trefwoord...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='searchBar'
          />

          <h2>
            {activeTab === 'all'
              ? 'Alle Cursussen'
              : activeTab === 'beginner'
              ? 'Cursussen voor Beginners'
              : activeTab === 'gevorderd'
              ? 'Gevorderde Cursussen'
              : 'Meest Bekeken Cursussen'}
          </h2>

          {filtered.length > 0 ? (
            <CourseList courses={filtered} />
          ) : (
            <p className='no-results'>Geen cursussen gevonden.</p>
          )}
        </section>

        <aside className='sidebar'>
          <PopularCourses courses={courseData} />
          <Statistics courses={courseData} />
        </aside>
      </div>
    </section>
  );
};

export default Dashboard;
