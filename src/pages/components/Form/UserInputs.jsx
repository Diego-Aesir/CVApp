import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "./UserInputs.module.css";
import UserPersonalInput from "./PersonalInput/UserPersonalInput";
import UserEducationInput from "./EducationInput/UserEducationInput";
import UserPreviousExperience from "./WorkExperienceInput/UserPreviousExperience";
import SkillsInput from "./SkillsInput/SkillsInput";
import CertificationInput from "./Certification/CertificationInput";

export function FormInput({
  type,
  label,
  id,
  placeholder = "",
  value,
  onChange,
}) {
  return (
    <div className={styles.inputDiv}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default function UserInputs() {
  const router = useRouter();
  const [personalList, setPersonalList] = useState({
    userName: "",
    userEmail: "",
    userCountry: "",
    userCity: "",
    userDescription: "",
  });
  const [previousExperienceList, setPreviousExperienceList] = useState([]);
  const [educationList, setEducationList] = useState([]);
  const [skillsList, setSkillsList] = useState([]);
  const [certificationList, setCertificationList] = useState([]);

  const submitCv = () => {
    const { userName, userEmail, userCountry, userCity, userDescription } =
      personalList;

    if (
      !userName ||
      !userEmail ||
      !userCountry ||
      !userCity ||
      !userDescription
    ) {
      alert("All personal fields are required.");
      return;
    }

    for (const experience of previousExperienceList) {
      const { companyName, jobTitle, startDate, endDate } = experience;
      if (!companyName || !jobTitle || !startDate || !endDate) {
        alert("All fields in previous experience are required.");
        return;
      }
    }

    for (const education of educationList) {
      const { name, place, startDate, endDate } = education;
      if (!name || !place || !startDate || !endDate) {
        alert("All fields in education are required.");
        return;
      }
    }

    if (skillsList.length === 0) {
      alert("At least one skill is required.");
      return;
    }
    for (const skill of skillsList) {
      if (!skill.skillName) {
        alert("All fields in skills are required.");
        return;
      }
    }

    for (const certification of certificationList) {
      const { certificationName, certificationEmitter, certificationDate } =
        certification;
      if (!certificationName || !certificationEmitter || !certificationDate) {
        alert("All fields in certification are required.");
        return;
      }
    }

    const dataToSubmit = {
      personalList,
      previousExperienceList,
      educationList,
      skillsList,
      certificationList,
    };

    router.push({
      pathname: "/cv",
      query: { data: JSON.stringify(dataToSubmit) },
    });
  };

  const addPersonal = (personalInput) => {
    setPersonalList(personalInput);
  };

  const addExperience = (experience) => {
    setPreviousExperienceList((prev) => [...prev, experience]);
  };

  const addEducation = (education) => {
    setEducationList((prev) => [...prev, education]);
  };

  const addSkillList = (skill) => {
    setSkillsList((prev) => [...prev, skill]);
  };

  const addCertification = (certification) => {
    setCertificationList((prev) => [...prev, certification]);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Build Your CV</h2>
      <button className={styles.buttonSubmit} onClick={submitCv}>
        Submit All
      </button>
      <div className={styles.wrapper}>
        <UserPersonalInput addPersonal={addPersonal} />
        <UserPreviousExperience addExperience={addExperience} />
        <UserEducationInput addEducation={addEducation} />
        <SkillsInput addSkillList={addSkillList} />
        <CertificationInput addCertification={addCertification} />
      </div>
    </div>
  );
}