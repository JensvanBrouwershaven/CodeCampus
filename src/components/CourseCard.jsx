import { useState, useEffect } from 'react';
import '../styles/CourseCard.css';
import Modal from './Modal';

// Cookie helpers
const getCookie = (name) => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
};

const setCookie = (name, value, days = 365) => {
  const expires = new Date(Date.now() + days * 86400000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
};

const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
};

const CourseCard = ({ course }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [viewedDate, setViewedDate] = useState(null);

  const favoriteKey = `favorite_${course?.id || course?.title?.replace(/\s+/g, '_')}`;
  const viewedKey = `viewed_${course?.id || course?.title?.replace(/\s+/g, '_')}`;

  useEffect(() => {
    if (course) {
      const favorite = getCookie(favoriteKey);
      const viewed = getCookie(viewedKey);
      setIsFavorited(favorite === 'true');
      setViewedDate(viewed);
    }
  }, [course]);

  const toggleModal = () => setModalOpen(!isModalOpen);

  const toggleFavorite = () => {
    const newState = !isFavorited;
    setIsFavorited(newState);
    setCookie(favoriteKey, newState);
    window.location.reload(); // blijft zoals je had
  };

  const markAsViewed = () => {
    const now = new Date().toISOString();
    setCookie(viewedKey, now);
    setViewedDate(now);
    window.location.reload();
  };

  const unmarkAsViewed = () => {
    deleteCookie(viewedKey);
    setViewedDate(null);
    window.location.reload();
  };

  const openCourseVideo = (url) => () => {
    window.open(url, '_blank');
  };

  if (!course) {
    return (
      <article className="course-card empty">
        Geen cursus informatie beschikbaar
      </article>
    );
  }

  return (
    <>
      <article className="course-card clickable" onClick={toggleModal}>
        <figure className="course-image">
          <img src={course.imageUrl} alt={course.title} />
        </figure>
        <div className="course-content">
          <h3>{course.title}</h3>
          <p className="course-description">{course.description}</p>
          <dl className="course-details">
            <div>
              <dd className="level">Niveau: {course.level}</dd>
            </div>
            <div>
              <dd className="duration">Duur: {course.duration}</dd>
            </div>
          </dl>
          <footer className="course-stats">
            <span className="members">{course.members} leden</span>
            <span className="views">{course.views} weergaven</span>
            <span className="rating">⭐ {course.rating}</span>
          </footer>
        </div>
      </article>

      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <div className="modal-header">
          <h2>{course.title}</h2>
          <button className="favorite-button" onClick={toggleFavorite}>
            {isFavorited ? '❤️' : '🤍'}
          </button>
        </div>

        <img src={course.imageUrl} alt={course.title} style={{ width: '100%' }} />
        <p>{course.description}</p>
        <p><strong>Niveau:</strong> {course.level}</p>
        <p><strong>Duur:</strong> {course.duration}</p>
        <p><strong>Leden:</strong> {course.members}</p>
        <p><strong>Weergaven:</strong> {course.views}</p>
        <p><strong>Beoordeling:</strong> ⭐ {course.rating}</p>

        <div className="course-buttons">
  <button className="course-button" onClick={openCourseVideo(course.videoUrl)}>
    Bekijk Video
  </button>
  <button className="course-button" onClick={viewedDate ? unmarkAsViewed : markAsViewed}>
    {viewedDate
      ? `✅ Gemarkeerd als bekeken (${new Date(viewedDate).toLocaleDateString()})`
      : '👁️ Markeer als bekeken'}
  </button>
</div>

      </Modal>
    </>
  );
};

export default CourseCard;
