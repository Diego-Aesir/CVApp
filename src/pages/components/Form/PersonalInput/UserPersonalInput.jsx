import { FormInput } from "../UserInputs";
import React, { useState } from "react";
import formStyles from "../UserInputs.module.css";
import styles from "./UserPersonalInput.module.css";

function Description({ id, className, label, placeholder, value, onChange }) {
  return (
    <div className={formStyles.inputDiv}>
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        className={className}
        cols="10"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-label={label}
      />
    </div>
  );
}

export default function UserPersonalInput({ addPersonal }) {
  const [enableInput, setEnableInput] = useState(true);
  const [personalInfo, setPersonalInfo] = useState({
    userName: "",
    userEmail: "",
    userCountry: "",
    userCity: "",
    userDescription: "",
  });

  const handleChange = ({ target: { id, value } }) => {
    setPersonalInfo(prevInfo => ({
      ...prevInfo,
      [id]: value,
    }));
  };

  const validateAndSubmit = () => {
    const { userName, userEmail, userCountry, userCity, userDescription } = personalInfo;

    if (Object.values(personalInfo).some(field => !field)) {
      alert("All fields must be filled.");
      return;
    }

    addPersonal(personalInfo);
    setEnableInput(false);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.personalP}>Your Personal Information</h2>
      {enableInput ? (
        <form id={formStyles.formDiv}>
          <div className={styles.inputList}>
            <div>
              <FormInput
                type="text"
                label="Name:"
                id="userName"
                placeholder="Diego"
                value={personalInfo.userName}
                onChange={handleChange}
              />
            </div>
            <div>
              <FormInput
                type="email"
                label="Email:"
                id="userEmail"
                placeholder="pleasehireme@gmail.com"
                value={personalInfo.userEmail}
                onChange={handleChange}
              />
            </div>
            <div>
              <FormInput
                type="text"
                label="Country:"
                id="userCountry"
                placeholder="Brasil"
                value={personalInfo.userCountry}
                onChange={handleChange}
              />
            </div>
            <div>
              <FormInput
                type="text"
                label="City:"
                id="userCity"
                placeholder="Manaus"
                value={personalInfo.userCity}
                onChange={handleChange}
              />
            </div>
            <div>
              <Description
                id="userDescription"
                className={styles.userDescription}
                label="Description:"
                placeholder="My goal is to..."
                value={personalInfo.userDescription}
                onChange={handleChange}
              />
            </div>
          </div>
        </form>
      ) : (
        <div id={formStyles.formDiv}>
          <p><strong>Name:</strong> {personalInfo.userName}</p>
          <p><strong>Email:</strong> {personalInfo.userEmail}</p>
          <p><strong>Country:</strong> {personalInfo.userCountry}</p>
          <p><strong>City:</strong> {personalInfo.userCity}</p>
          <p><strong>Description:</strong> {personalInfo.userDescription}</p>
        </div>
      )}
      <div className={styles.buttonContainer}>
        <button className={styles.submitButton} onClick={validateAndSubmit}>Validate Information</button>
        <button className={styles.enableButton} onClick={() => setEnableInput(true)}>Enable Input</button>
      </div>
    </div>
  );
}
