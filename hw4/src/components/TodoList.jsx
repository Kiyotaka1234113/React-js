import { memo } from 'react'
import TodoItem from './TodoItem'

function TodoList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return <p>Список задач пуст</p>
  }

  return (
    <ul className="todo-list">
      {tasks.map((t) => (
        <TodoItem key={t.id} task={t} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  )
}

export default memo(TodoList)


