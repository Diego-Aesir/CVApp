import React, {useState} from 'react';
import styles from './SkillsInput.module.css';
import {FormInput} from "../UserInputs";

export default function SkillsInput({addSkillList}) {
    const [isOpen, setIsOpen] = useState(false);
    const [skillList, setNewSkillList] = useState([]);
    const [newSkill, setNewSkill] = useState({
        skillName: "",
    });

    const HandleChange = (object) => {
        const {id, value} = object.target;
        setNewSkill((skill) => ({...skill, [id]: value}));
    };

    const Dismiss = () => {
        setIsOpen(false);
    };
        
    const ValidateAndSubmit = () => {
        const {skillName} = newSkill;

        if (!skillName) {
            alert("Field must be filled.");
            return;
        }

        setNewSkillList((oldSkill) => [...oldSkill, newSkill]);
        addSkillList(newSkill);
        setNewSkill({skillName: ''});
        setIsOpen(false);
    }

    const HandleErase = (indexErase) => {
        setNewSkillList((prev) => prev.filter((_, index) => index !== indexErase));
    } 

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <p className={styles.skillsP}> Skills</p>
            <div id={styles.skillList}>
                {skillList.map((skill, index) => (
                    <div key={index}> 
                        <li>{skill.skillName}</li>
                        <button className={styles.buttonEraser} onClick={() => HandleErase(index)}> Erase skill</button>
                    </div>
                ))}
            </div>
            <button className={styles.buttonAdd} onClick={() => setIsOpen(true)}>Add New Skill</button>

            {
                isOpen && (
                    <dialog open>
                        <FormInput type="text" label="Skill" id="skillName" placeholder="Proficient on Git" value={newSkill.skillName} onChange={HandleChange}></FormInput>
                        <button onClick={ValidateAndSubmit}> Submit</button>
                        <button onClick={Dismiss}>Cancel</button>
                </dialog>
            )}
        </div>
    );
}