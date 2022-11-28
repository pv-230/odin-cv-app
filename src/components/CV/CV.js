import React from 'react';
import './CV.css';
import ContactInfo from '../ContactInfo/ContactInfo';
import EducationInfo from '../EducationInfo/EducationInfo';
import WorkInfo from '../WorkInfo/WorkInfo';

export default function CV() {
  return (
    <div className="cv">
      <ContactInfo />
      <EducationInfo />
      <WorkInfo />
    </div>
  );
}
