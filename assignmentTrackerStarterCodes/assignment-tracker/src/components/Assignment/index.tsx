import styles from "./assignment.module.css";
import { TbTrash } from "react-icons/tb";
import type { TAssignment } from "../../type";
import { BsFillCheckCircleFill } from "react-icons/bs";

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

  return (
    <div className={styles.assignment}>
      <button onClick={handleComplete} className={styles.checkContainer}>
        {props.isComplete ? (<BsFillCheckCircleFill size={20} color="#8284fa" />
        ) : (
          <div />
        )}
      </button>

      <p className={props.isComplete ? styles.textCompleted : ""}>{props.title}</p>

      <button onClick={handleDelete} className={styles.deleteButton}>
        <TbTrash size={20} />
      </button>
    </div>
  );
}
