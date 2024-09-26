import { FormInput } from "../UserInputs";
import React, {useState} from "react";
import formStyles from '../UserInputs.module.css';
import styles from "./UserPersonalInput.module.css";

function Description({id, className, label, placeholder, value, onChange}) {
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
                />
        </div>
    )
}

export default function UserPersonalInput({addPersonal}) {
    const [enableInput, setEnableInput] = useState(true);
    const [personalInfo, setPersonalInfo] = useState({
        userName: '',
        userEmail: '',
        userCountry: '',
        userCity: '',
        userDescription: ''
    });

    const handleChange = (event) => {
        const {id, value} = event.target;
        setPersonalInfo(previousInfo => ({
            ...previousInfo,
            [id]: value
        }));
    }

    const ValidateInfoAndSubmit = () => {
        const {userName, userEmail, userCountry, userCity, userDescription} = personalInfo;

        if(!userName || !userEmail || !userCountry || !userCity || !userDescription) {
            alert("All fields must be filled.");
            return;
        }

        addPersonal(personalInfo);
        setEnableInput(false);
    }

    const EnableInput = () => {
        setEnableInput(true);
    }

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <p className={styles.personalP}> Your Personal Information</p>
            {enableInput && (
                <form id={formStyles.formDiv}>
                <FormInput type="text" label="Name:" id="userName" placeholder="Diego" value={personalInfo.userName} onChange={handleChange}/>
                <FormInput type="e-mail" label="Email:" id="userEmail" placeholder="pleasehireme@gmail.com" value={personalInfo.userEmail} onChange={handleChange}/>
                <FormInput type="text" label="Country:" id="userCountry" placeholder="Brasil" value={personalInfo.userCountry} onChange={handleChange}/>
                <FormInput type="text" label="City:" id="userCity" placeholder="Manaus" value={personalInfo.userCity} onChange={handleChange}/>
                <Description id="userDescription" className={styles.userDescription} label="Description:" placeholder="My goal is to..." value={personalInfo.userDescription} onChange={handleChange}/>
                </form>
            )}
            {!enableInput && (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <p>Name: {personalInfo.userName}</p>
                    <p>Email: {personalInfo.userEmail}</p>
                    <p>Country: {personalInfo.userCountry}</p>
                    <p>City: {personalInfo.userCity}</p>
                    <p>Description: {personalInfo.userDescription}</p>
                </div>
            )}
            <button onClick={ValidateInfoAndSubmit}>Validate Information</button>
            <button onClick={EnableInput}>Enable Input</button>
        </div>
    );
}