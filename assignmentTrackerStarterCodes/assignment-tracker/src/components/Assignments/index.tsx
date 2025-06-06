import { Assignment } from "../Assignment";
import styles from "./assignments.module.css";
import type { TAssignment } from "../../type";

type Props = {
  assignments: TAssignment[];
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
};

export function Assignments(props: Props) {
  const completedCount = props.assignments.filter((asm) => asm.isComplete).length;

  return (
    <section className={styles.assignments}>
      <header className={styles.header}>
        <div>
          <p>Created Assignments</p>
          <span>{props.assignments.length}</span>
        </div>

        <div>
          <p className={styles.textPurple}>Completed Assignments</p>
          <span>{completedCount} of {props.assignments.length}</span>
        </div>
      </header>

      <div className={styles.list}>
        {props.assignments.map((asm) => (
          <Assignment
            key={asm.id}
            onComplete={props.onComplete}
            onDelete={props.onDelete}
            {...asm} />
        ))}
      </div>
    </section>
  );
}
