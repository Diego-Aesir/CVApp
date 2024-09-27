import React, { useState } from "react";
import styles from "./CertificationInput.module.css";
import { FormInput } from "../UserInputs";

export default function CertificationInput({ addCertification }) {
  const [isOpen, setIsOpen] = useState(false);
  const [newCertification, setNewCertification] = useState({
    certificationName: "",
    certificationEmitter: "",
    certificationDate: "",
  });
  const [certificationList, setCertificationList] = useState([]);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setNewCertification((prev) => ({ ...prev, [id]: value }));
  };

  const validateInfoAndSubmit = () => {
    const { certificationName, certificationEmitter, certificationDate } =
      newCertification;

    if (!certificationName || !certificationEmitter || !certificationDate) {
      alert("All fields must be filled.");
      return;
    }

    setCertificationList((prev) => [...prev, newCertification]);

    addCertification(newCertification);

    setNewCertification({
      certificationName: "",
      certificationEmitter: "",
      certificationDate: "",
    });
    setIsOpen(false);
  };

  const dismiss = () => {
    setIsOpen(false);
  };

  const handleErase = (indexToRemove) => {
    setCertificationList((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Certifications</h2>
      <div className={styles.certificationList}>
        {certificationList.map((cert, index) => (
          <div key={index} className={styles.certificationItem}>
            <li>
              {cert.certificationName} - {cert.certificationEmitter} -{" "}
              {cert.certificationDate}
            </li>
            <button
              className={styles.buttonEraser}
              onClick={() => handleErase(index)}
            >
              Erase this Certificate
            </button>
          </div>
        ))}
      </div>
      <button className={styles.buttonAdd} onClick={() => setIsOpen(true)}>
        Add Certification
      </button>

      {isOpen && (
        <dialog open className={styles.dialog}>
          <FormInput
            type="text"
            label="Name:"
            id="certificationName"
            placeholder=".Net Security Specialist"
            value={newCertification.certificationName}
            onChange={handleChange}
          />
          <FormInput
            type="text"
            label="Emitter:"
            id="certificationEmitter"
            placeholder="Microsoft"
            value={newCertification.certificationEmitter}
            onChange={handleChange}
          />
          <FormInput
            type="date"
            label="Date:"
            id="certificationDate"
            value={newCertification.certificationDate}
            onChange={handleChange}
          />
          <div className={styles.dialogButtons}>
            <button
              className={styles.buttonSubmit}
              onClick={validateInfoAndSubmit}
            >
              Submit
            </button>
            <button className={styles.buttonDismiss} onClick={dismiss}>
              Dismiss
            </button>
          </div>
        </dialog>
      )}
    </div>
  );
}
