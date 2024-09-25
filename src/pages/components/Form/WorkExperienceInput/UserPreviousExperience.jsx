import React, {useState} from 'react';
import styles from './UserPreviousExperience.module.css';
import { FormInput } from '../UserInputs';

export const Dismiss = () => {
    setIsOpen(false);
};

export default function UserPreviousExperience() {
    const [isOpen, setIsOpen] = useState(false);
    const [previousExperience, updateExperience] = useState([]);
    const [newExperience, setNewExperience] = useState({
        companyName: '',
        jobTitle: '',
        startDate: '',
        endDate: ''
    });
    
    const HandleChange = (e) => {
        const {id, value} = e.target;
        setNewExperience(previousInfo => ({
            ...previousInfo,
            [id]: value
        }));
    };
    
    const ValidateInfoAndSubmit = () => {
        const {companyName, jobTitle, startDate, endDate } = newExperience;
    
        if (!companyName || !jobTitle || !startDate) {
            alert("All fields must be filled.");
            return;
        }
    
        if(endDate) {
            if (new Date(startDate) > new Date(endDate)) {
                alert("The Start Date must be prior to the End Date.");
                return;
            }
        }

        updateExperience((prev => [...prev, newExperience]));
        setNewExperience({companyName: '', jobTitle: '', startDate: '', endDate: '' });
        setIsOpen(false);
    };

    const HandleErase = (indexToRemove) => {
        updateExperience((previous) => previous.filter((_,index) => index !== indexToRemove));
    }

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <p className={styles.workExperienceP}> Previous Work Experience</p>
            <div id={styles.workExperienceList}>
                {previousExperience.map((experience, index) => (
                    <div key={index}>
                        <li>{experience.companyName} - {experience.jobTitle}. From {experience.startDate} to {experience.endDate}</li>
                        <button className={styles.buttonEraser} onClick={() => HandleErase(index)}>Erase this Experience</button>
                    </div>
                ))}
            </div>
            <button className={styles.buttonAdd} onClick={() => setIsOpen(true)}> Add Work Experience</button>

            {isOpen && (
                <dialog open>
                    <FormInput type="text" label="Company:" id="companyName" placeholder="CV Company SA" value={newExperience.companyName} onChange={HandleChange}/>
                    <FormInput type="text" label="Job Title:" id="jobTitle" placeholder="Dev Senior" value={newExperience.jobTitle} onChange={HandleChange}/>
                    <FormInput type="date" label="Start Date:" id="startDate" value={newExperience.startDate} onChange={HandleChange}/>
                    <FormInput type="date" label="End Date:" id="endDate" value={newExperience.endDate} onChange={HandleChange}/>
                    <button onClick={ValidateInfoAndSubmit}>Submit</button>
                    <button onClick={Dismiss}> Dismiss </button>
                </dialog>
            )}
        </div>
    );
}