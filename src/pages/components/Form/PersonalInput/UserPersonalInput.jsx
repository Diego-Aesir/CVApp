import { FormInput } from "../UserInputs";
import React, {useState} from "react";
import formStyles from '../UserInputs.module.css';
import styles from "./UserPersonalInput.module.css";

function Description({id, label, placeholder, value, onChange}) {
    return (
        <div className={formStyles.inputDiv}>
            <label htmlFor={id}>{label}</label>
			<textarea 
                id={id}
                cols="10"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                />
        </div>
    )
}

export default function UserPersonalInput() {
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

    return (
        <div display="flex">
            <p className={styles.personalP}> Your Personal Information</p>
            <form id={formStyles.formDiv}>
                <FormInput type="text" label="Name:" id="userName" placeholder="Diego" value={personalInfo.userName} onChange={handleChange}/>
                <FormInput type="e-mail" label="Email:" id="userEmail" placeholder="pleasehireme@gmail.com" value={personalInfo.userEmail} onChange={handleChange}/>
                <FormInput type="text" label="Country:" id="userCountry" placeholder="Brasil" value={personalInfo.userCountry} onChange={handleChange}/>
                <FormInput type="text" label="City:" id="userCity" placeholder="Manaus" value={personalInfo.userCity}/>
                <Description id={styles.userDescription} label="Description:" placeholder="My goal is to..." value={personalInfo.userDescription} onChange={handleChange}/>
            </form>
        </div>
    );
}