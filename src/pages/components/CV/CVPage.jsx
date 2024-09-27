import { useState, useEffect } from "react";
import styles from "./CVPage.module.css";

const VerifyList = (list) => {
  if (list.length === 0) {
    return false;
  } else {
    return true;
  }
};

export default function CVPage({ data }) {
  const {
    personalList,
    previousExperienceList,
    certificationList,
    educationList,
    skillsList,
  } = data;
  const [previousExperienceListExist, setPreviousExperienceListExist] =
    useState(true);
  const [certificationListExist, setCertificationListExist] = useState(true);
  const [educationListExist, setEducationListExist] = useState(true);

  useEffect(() => {
    setPreviousExperienceListExist(VerifyList(previousExperienceList));
    setCertificationListExist(VerifyList(certificationList));
    setEducationListExist(VerifyList(educationList));
  }, []);

  return (
    <div id={styles.background}>
  <div id={styles.main}>
    <h1 className={styles.title}>Curriculum Vitae</h1>
    <section className={styles.section}>
      <h2>Personal Information</h2>
      {Object.keys(personalList).map(key => (
        <div key={key} className={styles.infoItem}>
          <p className={styles.paragraph}><strong>{key === "userName" ? "Name" : key === "userEmail" ? "Email" : key === "userCountry" ? "Country" : key === "userCity" ? "City" : "Description"}:</strong> {personalList[key]}</p>
        </div>
      ))}
    </section>

    {previousExperienceListExist && (
      <section className={styles.section}>
        <h2>Work Experience</h2>
        {previousExperienceList.map((experience, index) => (
          <div key={index} className={styles.experienceItem}>
            <p className={styles.paragraph}><strong>{experience.companyName}</strong> - {experience.jobTitle} (From {experience.startDate} to {experience.endDate})</p>
          </div>
        ))}
      </section>
    )}

    {educationListExist && (
      <section className={styles.section}>
        <h2>Education</h2>
        {educationList.map((education, index) => (
          <div key={index} className={styles.educationItem}>
            <p className={styles.paragraph}><strong>{education.name}</strong> [{education.startDate} - {education.endDate}] at {education.place}</p>
          </div>
        ))}
      </section>
    )}

    {certificationListExist && (
      <section className={styles.section}>
        <h2>Certifications</h2>
        {certificationList.map((certification, index) => (
          <div key={index} className={styles.certificationItem}>
            <p className={styles.paragraph}><strong>{certification.certificationName}</strong> by {certification.certificationEmitter} on {certification.certificationDate}</p>
          </div>
        ))}
      </section>
    )}

    <section className={styles.section}>
      <h2>Skills</h2>
      {skillsList.map((skill, index) => (
        <div key={index} className={styles.skillItem}>
          <p className={styles.paragraph}><strong>{skill.skillName}</strong></p>
        </div>
      ))}
    </section>
  </div>
</div>
  );
}
