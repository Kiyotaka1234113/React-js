import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import TodoList from './components/TodoList'
import './App.css'

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const raw = localStorage.getItem('tasks')
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })
  const [filter, setFilter] = useState('all') // all | active | completed
  const inputRef = useRef(null)
  const [title, setTitle] = useState('')

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = useCallback(() => {
    const trimmed = title.trim()
    if (!trimmed) return
    setTasks((prev) => [
      { id: crypto.randomUUID(), title: trimmed, completed: false },
      ...prev,
    ])
    setTitle('')
    inputRef.current?.focus()
  }, [title])

  const toggleTask = useCallback((id) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }, [])

  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const filteredTasks = useMemo(() => {
    if (filter === 'active') return tasks.filter((t) => !t.completed)
    if (filter === 'completed') return tasks.filter((t) => t.completed)
    return tasks
  }, [tasks, filter])

  const totalCount = tasks.length
  const completedCount = useMemo(() => tasks.filter((t) => t.completed).length, [tasks])

  const onKeyDown = useCallback((e) => {
    if (e.key === 'Enter') addTask()
  }, [addTask])

  return (
    <div className="app">
      <h1>Список задач</h1>
      <div className="controls">
        <input
          ref={inputRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Новая задача..."
        />
        <button onClick={addTask}>Добавить задачу</button>
      </div>

      <div className="filters">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>Все</button>
        <button className={filter === 'active' ? 'active' : ''} onClick={() => setFilter('active')}>Активные</button>
        <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>Выполненные</button>
      </div>

      <div className="counters">
        Всего: {totalCount} • Выполнено: {completedCount}
      </div>

      <TodoList tasks={filteredTasks} onToggle={toggleTask} onDelete={deleteTask} />
    </div>
  )
}

export default App
