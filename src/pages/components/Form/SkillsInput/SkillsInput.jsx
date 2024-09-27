import React, { useState } from "react";
import styles from "./SkillsInput.module.css";
import { FormInput } from "../UserInputs";

export default function SkillsInput({ addSkillList }) {
  const [isOpen, setIsOpen] = useState(false);
  const [skillList, setNewSkillList] = useState([]);
  const [newSkill, setNewSkill] = useState({
    skillName: "",
  });

  const HandleChange = (event) => {
    const { id, value } = event.target;
    setNewSkill((skill) => ({ ...skill, [id]: value }));
  };

  const Dismiss = () => {
    setIsOpen(false);
  };

  const ValidateAndSubmit = () => {
    const { skillName } = newSkill;

    if (!skillName) {
      alert("Field must be filled.");
      return;
    }

    setNewSkillList((oldSkill) => [...oldSkill, newSkill]);
    addSkillList(newSkill);
    setNewSkill({ skillName: "" });
    setIsOpen(false);
  };

  const HandleErase = (indexErase) => {
    setNewSkillList((prev) => prev.filter((_, index) => index !== indexErase));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Skills</h2>
      <ul className={styles.skillList}>
        {skillList.map((skill, index) => (
          <li key={index} className={styles.skillItem}>
            {skill.skillName}
            <button
              className={styles.buttonEraser}
              onClick={() => HandleErase(index)}
            >
              Erase skill
            </button>
          </li>
        ))}
      </ul>
      <button className={styles.buttonAdd} onClick={() => setIsOpen(true)}>
        Add New Skill
      </button>

      {isOpen && (
        <dialog open className={styles.dialog}>
          <FormInput
            type="text"
            label="Skill"
            id="skillName"
            placeholder="Proficient on Git"
            value={newSkill.skillName}
            onChange={HandleChange}
          />
          <div className={styles.dialogButtons}>
            <button className={styles.buttonSubmit} onClick={ValidateAndSubmit}>
              Submit
            </button>
            <button className={styles.buttonDismiss} onClick={Dismiss}>
              Cancel
            </button>
          </div>
        </dialog>
      )}
    </div>
  );
}
