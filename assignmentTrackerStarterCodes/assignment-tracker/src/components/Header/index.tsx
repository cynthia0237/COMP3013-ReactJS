import styles from "./header.module.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { uppercase } from "../../helpers/stringHelpers";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { format } from "date-fns";

type Props = {
  onAddAssignment: (text: string, dueDate: Date) => void;
};

export function Header({ onAddAssignment }: Props) {
  const [assignmentTxt, setAssignmentTxt] = useState("");
  const isEmptyInput = assignmentTxt === "";
  const [dueDate, setDueDate] = useState<Date | undefined>();
  const isNoDueDate = dueDate === undefined;
  const [showDayPicker, setShowDayPicker] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dueDate) return;
    onAddAssignment(assignmentTxt, dueDate);
    //console.log("add asm", assignmentTxt);
    setAssignmentTxt("");
    setDueDate(undefined);
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

        <div className={styles.datePickerWrapper}>
          <label htmlFor="dueDate"> Due Date</label>

          <button
            type="button"
            id="dueDate"
            onClick={() => setShowDayPicker(!showDayPicker)}
            className={styles.datePickerButton}
          >
            {dueDate ? format(dueDate, "yyyy-MM-dd") : "Select date"}
          </button>

          {showDayPicker && (
            <div className={styles.datePickerPopup}>
              <DayPicker
                mode="single"
                selected={dueDate}
                onSelect={(date) => {
                  setDueDate(date);
                  setShowDayPicker(false);
                }}
              />
            </div>
          )}
        </div>

        <button type="submit" disabled={isEmptyInput || isNoDueDate}>
          Create <AiOutlinePlusCircle size={20} />
        </button>
      </form>
    </header>
  );
}
