import { useState } from 'react';
import '../styles/CourseCard.css';
import Modal from './Modal';

const CourseCard = ({ course }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  if (!course) {
    return (
      <article className='course-card empty'>
        Geen cursus informatie beschikbaar
      </article>
    );
  }

  const toggleModal = () => setModalOpen(!isModalOpen);

  const openCourseVideo = (url) => () => {
    window.open(url, '_blank');
  };

  return (
    <>
      {/* Card that opens the modal */}
      <article className='course-card clickable' onClick={toggleModal}>
        <figure className='course-image'>
          <img src={course.imageUrl} alt={course.title} />
        </figure>
        <div className='course-content'>
          <h3>{course.title}</h3>
          <p className='course-description'>{course.description}</p>
          <dl className='course-details'>
            <div>
              <dt className='visually-hidden'>Niveau</dt>
              <dd className='level'>Niveau: {course.level}</dd>
            </div>
            <div>
              <dt className='visually-hidden'>Duur</dt>
              <dd className='duration'>Duur: {course.duration}</dd>
            </div>
          </dl>
          <footer className='course-stats'>
            <span className='members'>{course.members} leden</span>
            <span className='views'>{course.views} weergaven</span>
            <span className='rating'>⭐ {course.rating}</span>
          </footer>
        </div>
      </article>

      {/* Modal that shows detailed info and video button */}
      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <h2>{course.title}</h2>
        <img src={course.imageUrl} alt={course.title} style={{ width: '100%' }} />
        <p>{course.description}</p>
        <p><strong>Niveau:</strong> {course.level}</p>
        <p><strong>Duur:</strong> {course.duration}</p>
        <p><strong>Leden:</strong> {course.members}</p>
        <p><strong>Weergaven:</strong> {course.views}</p>
        <p><strong>Beoordeling:</strong> ⭐ {course.rating}</p>
        <button className='course-button' onClick={openCourseVideo(course.videoUrl)}>
          Bekijk Video
        </button>
      </Modal>
    </>
  );
};

export default CourseCard;
