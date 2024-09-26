import React, {useState} from 'react';
import styles from './UserInputs.module.css';
import UserPersonalInput from './PersonalInput/UserPersonalInput';
import UserEducationInput from './EducationInput/UserEducationInput';
import UserPreviousExperience from './WorkExperienceInput/UserPreviousExperience';
import SkillsInput from './SkillsInput/SkillsInput';
import CertificationInput from "./Certification/CertificationInput";

export function FormInput({type, label, id, placeholder="", value, onChange}) {
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
    )
}

export default function UserInputs() {
    const [personalList, setPersonalList] = useState([]);
    const [previousExperienceList, setPreviousExperienceList] = useState([]);
    const [educationList, setEducationList] = useState([]);
    const [skillsList, setSkillsList] = useState([]);
    const [certificationList, setCertificationList] = useState([]);

    const addPersonal = (personalInput) => {
        setPersonalList((prev) => [...prev, personalInput]);
        console.log(personalInput);
    }

    const addExperience = (experience) => {
        setPreviousExperienceList((prev) => [...prev, experience]);
        console.log(experience);

    }

    const addEducation = (education) => {
        setEducationList((prev) => [...prev, education]);
        console.log(education);

    }
    
    const addSkillList = (skill) => {
        setSkillsList((prev) => [...prev, skill]);
        console.log(skill);

    }

    const addCertification = (certification) => {
        setCertificationList((prev) => [...prev, certification]);
        console.log(certification);

    }


    return (
        <div id={styles.container}>
            <button className={styles.buttonSubmit}>Submit All</button>
            <div id={styles.wrapper}>
                <UserPersonalInput addPersonal={addPersonal}/>
                <UserPreviousExperience addExperience={addExperience}/>
                <UserEducationInput addEducation={addEducation}/>
                <SkillsInput addSkillList={addSkillList}/>
                <CertificationInput addCertification={addCertification}/>
            </div>
        </div>
    )
}