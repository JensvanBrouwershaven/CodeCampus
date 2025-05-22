import { useState, useEffect, useMemo } from 'react';
import '../styles/Dashboard.css';
import CourseList from './CourseList';
import PopularCourses from './PopularCourses';
import Statistics from './Statistics';

const SORT_OPTIONS = [
  { value: 'populariteit', label: 'Populariteit' },
  { value: 'rating', label: 'Rating' },
  { value: 'duur', label: 'Duur' },
  { value: 'favorieten', label: 'Favorieten' }
];

const LOCAL_STORAGE_KEY = 'dashboardPreferences';

const getFavoriteCourseIds = () => {
  return document.cookie
    .split('; ')
    .filter(cookie => cookie.startsWith('favorite_') && cookie.split('=')[1] === 'true')
    .map(cookie => decodeURIComponent(cookie.split('=')[0].replace('favorite_', '')));
};

const Dashboard = ({ courseData }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('populariteit');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  
  useEffect(() => {
    const savedPrefs = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (savedPrefs) {
      setActiveTab(savedPrefs.activeTab || 'all');
      setSearchTerm(savedPrefs.searchTerm || '');
      setSortOption(savedPrefs.sortOption || 'populariteit');
      setSelectedCategories(savedPrefs.selectedCategories || []);
    }
    setFavoriteIds(getFavoriteCourseIds());
  }, []);

  useEffect(() => {
    const preferences = {
      activeTab,
      searchTerm,
      sortOption,
      selectedCategories
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(preferences));
  }, [activeTab, searchTerm, sortOption, selectedCategories]);

  const allCategories = useMemo(() => {
    if (!courseData) return [];
    return [...new Set(courseData.flatMap(course => course.categories))];
  }, [courseData]);

  const filteredCourses = () => {
    if (!courseData || !Array.isArray(courseData)) return [];

    let filtered = [...courseData];

    if (activeTab === 'beginner') {
      filtered = filtered.filter(course => course.level === 'Beginner');
    } else if (activeTab === 'gevorderd') {
      filtered = filtered.filter(course => course.level === 'Gevorderd');
    }

    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(term) ||
          course.description.toLowerCase().includes(term)
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(course =>
        selectedCategories.every(cat => course.categories.includes(cat))
      );
    }

    switch (sortOption) {
      case 'favorieten':
        filtered = filtered.filter(course =>
          favoriteIds.includes(course.id?.toString()) ||
          favoriteIds.includes(course.title?.replace(/\s+/g, '_'))
        );
        break;
      case 'populariteit':
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'duur':
        filtered.sort((a, b) => a.duration - b.duration);
        break;
      default:
        break;
    }

    return filtered;
  };

  const filtered = filteredCourses();

  const resetPreferences = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setActiveTab('all');
    setSearchTerm('');
    setSortOption('populariteit');
    setSelectedCategories([]);
  };

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

          {/* Sort Dropdown */}
          <div className='sort-dropdown'>
            <button className='sort-button' onClick={() => setDropdownOpen(!dropdownOpen)}>
              Sorteer op: {
                SORT_OPTIONS.find(option => option.value === sortOption)?.label
              }
              <span className={`arrow ${dropdownOpen ? 'up' : 'down'}`} />
            </button>
            {dropdownOpen && (
              <ul className='sort-options'>
                {SORT_OPTIONS.map(({ value, label }) => (
                  <li
                    key={value}
                    className={sortOption === value ? 'active' : ''}
                    onClick={() => {
                      setSortOption(value);
                      setDropdownOpen(false);
                    }}
                  >
                    {label}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* ✅ Category Filter */}
          <div className='category-filter'>
            <h3>Filter op categorieën:</h3>
            <div className='category-buttons'>
              {allCategories.map((category) => (
                <button
                  key={category}
                  className={`category-button ${selectedCategories.includes(category) ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedCategories((prev) =>
                      prev.includes(category)
                        ? prev.filter((c) => c !== category)
                        : [...prev, category]
                    );
                  }}
                >
                  {category}
                </button>
              ))}
              {selectedCategories.length > 0 && (
                <button className='clear-button' onClick={() => setSelectedCategories([])}>
                  Wis categorieën
                </button>
              )}
            </div>
          </div>

          {/* ✅ Reset voorkeuren */}
          <div style={{ marginTop: '1rem' }}>
            <button className='clear-button' onClick={resetPreferences}>
              Reset al mijn voorkeuren
            </button>
          </div>

          <h2>
            {sortOption === 'favorieten'
              ? 'Favoriete Cursussen'
              : activeTab === 'all'
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
  