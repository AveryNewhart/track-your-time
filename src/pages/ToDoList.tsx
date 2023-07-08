import React from 'react'

export const ToDoList = () => {
  return (
    <div className="main-container">
      <h1>To Do List</h1>
      <ul>
        <li>item 1</li>
        <li>item 2</li>
      </ul>
      <input type="text" placeholder="Add Item" />
      <button>Add</button>
    </div>
  )
}
