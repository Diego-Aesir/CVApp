import React, { useState } from "react";
import styles from './UserInputs.module.css';
import UserPersonalInput from './PersonalInput/UserPersonalInput';
import UserEducationInput from './EducationInput/UserEducationInput';
import UserPreviousExperience from './WorkExperienceInput/UserPreviousExperience';

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
    return (
        <div id={styles.container}>
            <div id={styles.wrapper}>
                <UserPersonalInput/>
            </div>
            <div id={styles.wrapper}>
                <UserEducationInput/>
            </div>
            <div id={styles.wrapper}>
                <UserPreviousExperience/>
            </div>
        </div>
    )
}