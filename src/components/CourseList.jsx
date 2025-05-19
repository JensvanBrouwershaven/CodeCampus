import { useState, useEffect } from 'react';
import CourseCard from './CourseCard';

const CourseList = ({ courses }) => {
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    // Reset animation by toggling animate off and on when courses change
    setAnimate(false);
    const timer = setTimeout(() => setAnimate(true), 10); // 10ms delay to restart animation
    return () => clearTimeout(timer);
  }, [courses]);

  if (!courses || courses.length === 0) {
    return <p className='empty-list'>Geen cursussen gevonden.</p>;
  }

  return (
    <section className='course-list'>
      {courses.map((course, index) => (
        <div
          key={course.id}
          className={animate ? 'fade-course' : ''}
          style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'both' }}
        >
          <CourseCard course={course} />
        </div>
      ))}
    </section>
  );
};

export default CourseList;
