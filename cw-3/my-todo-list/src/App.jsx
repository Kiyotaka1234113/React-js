import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ToDoList from "./components/ToDoList";

export default function App() {
  return (
    <div>
      <ToDoList />
    </div>
  );
}
