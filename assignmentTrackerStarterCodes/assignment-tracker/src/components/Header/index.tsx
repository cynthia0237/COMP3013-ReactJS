import styles from "./header.module.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { uppercase } from "../../helpers/stringHelpers";
import { useState } from "react";

type Props = {
  onAddAssignment: (text: string) => void;
};

export function Header({ onAddAssignment }: Props) {
  const [assignmentTxt, setAssignmentTxt] = useState("");
  const isEmptyInput = assignmentTxt === "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddAssignment(assignmentTxt);
    console.log("add asm", assignmentTxt);
    setAssignmentTxt("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAssignmentTxt(e.currentTarget.value);
  };

  return (
    <header className={styles.header}>
      {/* This is simply to show you how to use helper functions */}
      <h1>{uppercase("bcit")} Assignment Tracker</h1>
      <form className={styles.newAssignmentForm} onSubmit={handleSubmit}>
        <input placeholder="Add a new assignment" type="text" value={assignmentTxt} onChange={handleChange} />
        <button type="submit" disabled={isEmptyInput}>
          Create <AiOutlinePlusCircle size={20} />
        </button>
      </form>
    </header>
  );
}
