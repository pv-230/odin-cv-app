import React, { useState, useCallback } from 'react';
import './WorkInfo.css';
import WorkInfoForm from '../WorkInfoForm/WorkInfoForm';

export default function WorkInfo() {
  const [workList, setWorkList] = useState([]);

  /**
   * Event handler for adding a new work experience.
   */
  function handleAddWork() {
    const newWork = { id: crypto.randomUUID() };
    setWorkList([...workList, newWork]);
  }

  /**
   * Event handler for removing a work experience.
   */
  const removeWork = useCallback(
    (id) => {
      const newWorkList = workList.filter((work) => work.id !== id);
      setWorkList(newWorkList);
    },
    [workList]
  );

  return (
    <div className="work-info">
      <div className="work-info__title-bar">Work Experience</div>
      {workList.map((work) => (
        <WorkInfoForm key={work.id} id={work.id} removeWork={removeWork} />
      ))}
      <button className="work-info__add-btn" type="button" onClick={handleAddWork}>
        Add work experience
      </button>
    </div>
  );
}
