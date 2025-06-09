import styles from "./assignment.module.css";
import { TbTrash } from "react-icons/tb";
import type { TAssignment } from "../../type";
import { BsFillCheckCircleFill } from "react-icons/bs";
//doc https://date-fns.org/v4.1.0/docs/isPast
// differenceInCalendarDays(only calculate the day diff) vs differenceInDays(include time -- might show 0day left)
import { isToday, isPast, differenceInCalendarDays } from 'date-fns';

type Props = TAssignment & {
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
};

export function Assignment(props: Props) {
  const handleComplete = () => {
    props.onComplete(props.id);
  };

  const handleDelete = () => {
    props.onDelete(props.id);
  };

  const getDeadline = () => {
    if (!props.dueDate) return null;

    const today = new Date();
    const dayDiff = differenceInCalendarDays(props.dueDate, today);

    if (isToday(props.dueDate) || isPast(props.dueDate)) {
      return <span className={styles.dueNow}>Due: Now</span>;
    }

    if (dayDiff === 1) {
      return <span className={styles.dueTomorrow}>Tomorrow</span>;
    }

    return <span className={styles.dueDefault}>{dayDiff} days left</span>;
  };

  return (
    <div className={styles.assignment}>
      <button onClick={handleComplete} className={styles.checkContainer}>
        {props.isComplete ? (<BsFillCheckCircleFill size={20} color="#8284fa" />
        ) : (
          <div />
        )}
      </button>

      <p className={props.isComplete ? styles.textCompleted : ""}>{props.title}</p>
      {getDeadline()}

      <button onClick={handleDelete} className={styles.deleteButton}>
        <TbTrash size={20} />
      </button>
    </div>
  );
}
