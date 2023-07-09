import { useState, useEffect } from 'react';

interface Item {
  id: number;
  text: string;
  completed: boolean;
}

export const ToDoList: React.FC = () => {
  const [todos, setTodos] = useState<Item[]>([]);
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      const parsedTodos: Item[] = JSON.parse(storedTodos);
      const nonCompletedTodos = parsedTodos.filter(todo => !todo.completed);
      setTodos(nonCompletedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleToggle = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  const handleClick = () => {
    const newTodo: Item = { id: Date.now(), text: input, completed: false };
    setTodos([...todos, newTodo]);
    setInput('');
  };

  return (
    <div className="main-container">
      <h1>To Do List</h1>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => handleToggle(todo.id)}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Add Item"
        value={input}
        onChange={(e) => setInput(e.currentTarget.value)}
      />
      <button onClick={handleClick}>Add</button>
    </div>
  );
};
