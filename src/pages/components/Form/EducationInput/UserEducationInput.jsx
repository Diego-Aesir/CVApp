import React, {useState} from "react";
import styles from "./UserEducationInput.module.css";
import { FormInput } from "../UserInputs";
import {Dismiss} from '../EducationInput/UserEducationInput';

export default function UserEducationInput() {
    const [isOpen, setIsOpen] = useState(false);
    const [education, setEducation] = useState([]);
    const [formEducation, setFormEducation] = useState({
        name: '',
        place: '',
        startDate: '',
        endDate: ''
    });

    const HandleChange = (event) => {
        const {id, value} = event.target;
        setFormEducation((educ) => ({...educ, [id]:value}));
    }

    const ValidateInfoAndSubmit = () => {
        const {name, place, startDate, endDate} = formEducation;

        if (!name || !place || !startDate) {
            alert("All fields must be filled.");
            return;
        }
    
        if(endDate) {
            if (new Date(startDate) > new Date(endDate)) {
                alert("The Start Date must be prior to the End Date.");
                return;
            }
        }

        setEducation((educ => [...educ, formEducation]));
        setFormEducation({name:'', place: '', startDate: '', endDate:''});
        setIsOpen(false);
    }

    const HandleErase = (eraseIndex) => {
        setEducation((educ) => educ.filter((_, index) => index !== eraseIndex));
    }


    return (
        <div display="flex">
            <p className={styles.personalEducation}> Your Education</p>
            <div id={styles.educationList}>
                {education.map((ed, index) => (
                    <div key={index}>
                        <li>{ed.name} || [{ed.startDate} - {ed.endDate}] || {ed.place}</li>
                        <button className={styles.buttonErase} onClick={() => HandleErase(index)}> Erase this Education</button>
                    </div>
                ))}
            </div>
            <button className={styles.buttonAdd} onClick={() => setIsOpen(true)}> Add Education</button>
            {
              isOpen && (
                <dialog open>
                    <FormInput type="text" label="Name:" id="name" placeholder="Computer Science" value={formEducation.name} onChange={HandleChange}/>
                    <FormInput type="text" label="Where:" id="place" placeholder="Stamford" value={formEducation.place} onChange={HandleChange}/>
                    <FormInput type="date" label="Start Date:" id="startDate" value={formEducation.startDate} onChange={HandleChange}/>
                    <FormInput type="date" label="End Date:" id="endDate" value={formEducation.endDate} onChange={HandleChange}/>
                    <button onClick={ValidateInfoAndSubmit}>Submit</button>
                    <button onClick={Dismiss}> Dismiss </button>
                </dialog>
            )}
        </div>
    );
}