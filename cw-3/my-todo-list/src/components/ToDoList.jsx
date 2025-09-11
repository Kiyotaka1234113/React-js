import { useState, useEffect } from "react";

export default function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const addTask = () => {
    if (inputValue.trim() === "") return;
    setTasks([...tasks, inputValue.trim()]);
    setInputValue("");
  };

  useEffect(() => {
    if (tasks.length > 10) {
      alert("У вас более 10 задач для выполнения!");
    }
  }, [tasks]);

  return (
    <div style={{ margin: "20px", fontFamily: "Arial" }}>
      <h2>ToDo List</h2>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Введите задачу"
      />
      <button onClick={addTask} style={{ marginLeft: "10px" }}>
        Добавить задачу
      </button>

      <ul style={{ marginTop: "20px" }}>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
}
