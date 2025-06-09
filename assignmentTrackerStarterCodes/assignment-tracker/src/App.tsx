import { Header } from "./components/Header";
import { Assignments } from "./components/Assignments";
import { useState } from "react";
import type { TAssignment } from "./type";

function App() {
  const [assignments, setAssignments] = useState<TAssignment[]>([]);

  const handleAddAssignment = (text: string, dueDate: Date) => {
    const newAssignment = {
      id: crypto.randomUUID(),
      title: text,
      isComplete: false,
      dueDate: dueDate
    }

    setAssignments([...assignments, newAssignment]);
  };

  const handleComplete = (id: string) => {
    const assignment = assignments.find(asm => asm.id === id);
    if (assignment)
      assignment.isComplete = !assignment.isComplete;
    else
      console.log("assignment not found");

    setAssignments([...assignments]);
  }

  const handleDelete = (id: string) => {
    const newAssignments = assignments.filter(asm => asm.id !== id);
    setAssignments(newAssignments);
  }

  return (
    <>
      <Header onAddAssignment={handleAddAssignment} />
      <Assignments
        assignments={assignments}
        onComplete={handleComplete}
        onDelete={handleDelete} />
    </>
  );
}

export default App;
