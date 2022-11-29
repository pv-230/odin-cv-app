import React, { useState, useCallback } from 'react';
import './EducationInfo.css';
import EducationInfoForm from '../EducationInfoForm/EducationInfoForm';

export default function EducationInfo() {
  const [educations, setEducations] = useState([]);

  /**
   * Event handler for adding a new education.
   */
  function handleAddEducation() {
    const newEducation = { id: crypto.randomUUID() };
    setEducations([...educations, newEducation]);
  }

  /**
   * Event handler for removing an education.
   */
  const removeEducation = useCallback(
    (id) => {
      const newEducations = educations.filter((education) => education.id !== id);
      setEducations(newEducations);
    },
    [educations]
  );

  return (
    <div className="education-info">
      <div className="education-info__title-bar">Education</div>
      {educations.map((education) => (
        <EducationInfoForm
          key={education.id}
          id={education.id}
          removeEducation={removeEducation}
        />
      ))}
      <button className="education-info__add-btn" type="button" onClick={handleAddEducation}>
        Add education
      </button>
    </div>
  );
}
