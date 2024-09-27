import React, { useState } from "react";
import styles from "./UserPreviousExperience.module.css";
import { FormInput } from "../UserInputs";

export default function UserPreviousExperience({ addExperience }) {
  const [isOpen, setIsOpen] = useState(false);
  const [previousExperience, updateExperience] = useState([]);
  const [newExperience, setNewExperience] = useState({
    companyName: "",
    jobTitle: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setNewExperience((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const dismiss = () => {
    setIsOpen(false);
  };

  const validateInfoAndSubmit = () => {
    const { companyName, jobTitle, startDate, endDate } = newExperience;

    if (!companyName || !jobTitle || !startDate) {
      alert("All fields must be filled.");
      return;
    }

    if (endDate && new Date(startDate) > new Date(endDate)) {
      alert("The Start Date must be prior to the End Date.");
      return;
    }

    updateExperience((prev) => [...prev, newExperience]);
    addExperience({ companyName, jobTitle, startDate, endDate });
    setNewExperience({
      companyName: "",
      jobTitle: "",
      startDate: "",
      endDate: "",
    });
    setIsOpen(false);
  };

  const handleErase = (indexToRemove) => {
    updateExperience((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Previous Work Experience</h2>
      <ul className={styles.workExperienceList}>
        {previousExperience.map((experience, index) => (
          <li key={index} className={styles.experienceItem}>
            {experience.companyName} - {experience.jobTitle}. From{" "}
            {experience.startDate} to {experience.endDate}
            <button
              className={styles.buttonEraser}
              onClick={() => handleErase(index)}
            >
              Erase this Experience
            </button>
          </li>
        ))}
      </ul>
      <button className={styles.buttonAdd} onClick={() => setIsOpen(true)}>
        Add Work Experience
      </button>

      {isOpen && (
        <dialog open className={styles.dialog}>
          <FormInput
            type="text"
            label="Company:"
            id="companyName"
            placeholder="CV Company SA"
            value={newExperience.companyName}
            onChange={handleChange}
          />
          <FormInput
            type="text"
            label="Job Title:"
            id="jobTitle"
            placeholder="Dev Senior"
            value={newExperience.jobTitle}
            onChange={handleChange}
          />
          <FormInput
            type="date"
            label="Start Date:"
            id="startDate"
            value={newExperience.startDate}
            onChange={handleChange}
          />
          <FormInput
            type="date"
            label="End Date:"
            id="endDate"
            value={newExperience.endDate}
            onChange={handleChange}
          />
          <div className={styles.dialogButtons}>
            <button
              className={styles.buttonSubmit}
              onClick={validateInfoAndSubmit}
            >
              Submit
            </button>
            <button className={styles.buttonDismiss} onClick={dismiss}>
              Dismiss
            </button>
          </div>
        </dialog>
      )}
    </div>
  );
}
