import { useState } from 'react';
import '../styles/Dashboard.css';
import CourseList from './CourseList';
import PopularCourses from './PopularCourses';
import Statistics from './Statistics';

const Dashboard = ({ courseData }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('populariteit');
  const [dropdownOpen, setDropdownOpen] = useState(false); // New: dropdown toggle

  const filteredCourses = () => {
    if (!courseData || !Array.isArray(courseData)) return [];

    let filtered = courseData;

    if (activeTab === 'beginner') {
      filtered = filtered.filter((course) => course.level === 'Beginner');
    } else if (activeTab === 'gevorderd') {
      filtered = filtered.filter((course) => course.level === 'Gevorderd');
    }

    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(term) ||
          course.description.toLowerCase().includes(term)
      );
    }

    // Sorting
    switch (sortOption) {
      case 'Populariteit':
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'Rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'Duur':
        filtered.sort((a, b) => a.duration - b.duration);
        break;
      default:
        break;
    }

    return filtered;
  };

  const filtered = filteredCourses();

  return (
    <section className='dashboard'>
      <header className='dashboard-header'>
        <nav className='tab-buttons'>
          <button className={activeTab === 'all' ? 'active' : ''} onClick={() => setActiveTab('all')}>
            Alle Cursussen
          </button>
          <button className={activeTab === 'beginner' ? 'active' : ''} onClick={() => setActiveTab('beginner')}>
            Voor Beginners
          </button>
          <button className={activeTab === 'gevorderd' ? 'active' : ''} onClick={() => setActiveTab('gevorderd')}>
            Gevorderd
          </button>
          <button className={activeTab === 'populair' ? 'active' : ''} onClick={() => setActiveTab('populair')}>
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

          {/* 🔽 Custom Styled Sort Dropdown */}
          <div className='sort-dropdown'>
            <button className='sort-button' onClick={() => setDropdownOpen(!dropdownOpen)}>
              Sorteer op: {sortOption}
              <span className={`arrow ${dropdownOpen ? 'up' : 'down'}`} />
            </button>
            {dropdownOpen && (
              <ul className='sort-options'>
                {['populariteit', 'rating', 'duur'].map((option) => (
                  <li
                    key={option}
                    className={sortOption === option ? 'active' : ''}
                    onClick={() => {
                      setSortOption(option);
                      setDropdownOpen(false);
                    }}
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </li>
                ))}
              </ul>
            )}
          </div>

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
