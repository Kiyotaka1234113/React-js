import { memo } from 'react'

function TodoItem({ task, onToggle, onDelete }) {
  return (
    <li className="todo-item">
      <label className={task.completed ? 'completed' : ''}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span>{task.title}</span>
      </label>
      <button className="delete-btn" onClick={() => onDelete(task.id)}>Удалить</button>
    </li>
  )
}

export default memo(TodoItem)


