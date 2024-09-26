import React, {useState} from 'react';
import styles from './CertificationInput.module.css';
import { FormInput } from '../UserInputs';

export default function CertificationInput({addCertification}) {
    const [isOpen, setIsOpen] = useState(false);
    const [newCertification, setNewCertification] = useState({
        certificationName: '',
        certificationEmitter: '',
        certificationDate: ''
    });
    const [certificationList, setNewCertificationList] = useState([]);

    const HandleChange = (objet) => {
        const {id, value} = objet.target;
        setNewCertification((oldC) => ({...oldC, [id]:value}));
    }

    const ValidateInfoAndSubmit = () => {
        const {certificationName, certificationEmitter, certificationDate} = newCertification;

        if(!certificationName || !certificationEmitter || !certificationDate) {
            alert("All fields must be filled.");
            return;
        }

        setNewCertificationList((oldL) => ([...oldL, newCertification]));

        addCertification({
            certificationName,
            certificationEmitter,
            certificationDate
        });

        setNewCertification({
            certificationName: '',
            certificationEmitter: '',
            certificationDate: ''
        });
        setIsOpen(false);
    }

    const Dismiss = () => {
        setIsOpen(false);
    }

    const HandleErase = (indexToRemove) => {
        setNewCertificationList((oldCL) => (oldCL.filter((_, index) => index !== indexToRemove)));
    }

    return(
        <div style={{ display: "flex", flexDirection: "column" }}>
            <p className={styles.certificationP}>Certifications</p>
            <div id={styles.certificationList}>
                {certificationList.map((value, index) => (
                    <div>
                        <li>{value.certificationName} - {value.certificationEmitter} - {value.certificationDate}</li>
                        <button className={styles.buttonEraser} onClick={() => HandleErase(index)}>Erase this Certificate</button>
                    </div>
                ))}
            </div>
            <button onClick={() => setIsOpen(true)}>Add Certification</button>

            {isOpen && (
                <dialog open>
                    <FormInput type="text" label="Name:" id="certificationName" placeholder=".Net Security Specialist" value={newCertification.certificationName} onChange={HandleChange} />
                    <FormInput type="text" label="Emitter:" id="certificationEmitter" placeholder="Microsoft" value={newCertification.certificationEmitter} onChange={HandleChange} />
                    <FormInput type="date" label="Date:" id="certificationDate" placeholder='09-10-2022' value={newCertification.certificationDate} onChange={HandleChange} />
                    <button onClick={ValidateInfoAndSubmit}>Submit</button>
                    <button onClick={Dismiss}> Dismiss </button>
                </dialog>
            )}
        </div>
    );
}