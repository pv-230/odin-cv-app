import React, { Component } from 'react';
import './WorkInfo.css';
import WorkInfoForm from '../WorkInfoForm/WorkInfoForm';

export default class WorkInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workList: [],
    };
    this.handleAddWork = this.handleAddWork.bind(this);
    this.removeWork = this.removeWork.bind(this);
  }

  /**
   * Event handler for adding a new work experience.
   */
  handleAddWork() {
    this.setState((prevState) => {
      const { workList } = prevState;
      const newWork = {
        id: crypto.randomUUID(),
      };
      return { workList: [...workList, newWork] };
    });
  }

  removeWork(id) {
    this.setState((prevState) => ({
      ...prevState,
      workList: prevState.workList.filter((work) => work.id !== id),
    }));
  }

  render() {
    const { workList } = this.state;

    return (
      <div className="work-info">
        <div className="work-info__title-bar">Work Experience</div>
        {workList.map((work) => (
          <WorkInfoForm key={work.id} id={work.id} removeWork={this.removeWork} />
        ))}
        <button className="work-info__add-btn" type="button" onClick={this.handleAddWork}>
          Add work experience
        </button>
      </div>
    );
  }
}
