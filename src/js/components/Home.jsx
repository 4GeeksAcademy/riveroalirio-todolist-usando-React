import React, { useState } from "react";

const TodoApp = () => {
	const [newTask, setNewTask] = useState("");
	const [todos, setTodos] = useState([]);
	const [filter, setFilter] = useState("all");

	const handleKeyDown = (event) => {
		if (event.key !== "Enter") return;

		const text = newTask.trim();
		if (text === "") return;

		const newTodo = {
			id: Date.now(),
			label: text,
			done: false
		};

		setTodos([...todos, newTodo]);
		setNewTask("");
	};

	const toggleDone = (id) => {
		const updated = todos.map((t) =>
			t.id === id ? { ...t, done: !t.done } : t
		);
		setTodos(updated);
	};

	const deleteTask = (id) => {
		const updated = todos.filter((t) => t.id !== id);
		setTodos(updated);
	};

	const filteredTodos = todos.filter((t) => {
		if (filter === "pending") return !t.done;
		if (filter === "done") return t.done;
		return true;
	});

	const footerText =
		todos.length === 0
			? "No tienes tareas pendientes: ¡Felicitaciones!"
			: `${todos.filter((t) => !t.done).length} tarea${todos.filter((t) => !t.done).length !== 1 ? "s" : ""
			} pendiente${todos.filter((t) => !t.done).length !== 1 ? "s" : ""
			}`;
	return (
		<div className="page">
			<div className="todo-container">
				<h1>Tareas por hacer</h1>

				<input
					type="text"
					placeholder="¿Qué necesitas hacer hoy?"
					value={newTask}
					onChange={(e) => setNewTask(e.target.value)}
					onKeyDown={handleKeyDown}
				/>

				<div className="filters">
					<button
						className={filter === "pending" ? "active-filter" : ""}
						onClick={() => setFilter("pending")}
					>
						Pendientes
					</button>
					<button
						className={filter === "done" ? "active-filter" : ""}
						onClick={() => setFilter("done")}
					>
						Completadas
					</button>
					<button
						className={filter === "all" ? "active-filter" : ""}
						onClick={() => setFilter("all")}
					>
						Todas
					</button>
				</div>

				<ul>
					{filteredTodos.map((todo) => (
						<li key={todo.id} className="todo-item">
							<label>
								<input
									type="checkbox"
									checked={todo.done}
									onChange={() => toggleDone(todo.id)}
								/>
								<span className={todo.done ? "done" : ""}>{todo.label}</span>
							</label>

							<button
								className="delete-button"
								onClick={() => deleteTask(todo.id)}
							>
								✖
							</button>
						</li>
					))}
				</ul>

				<div className="footer">{footerText}</div>
			</div>
		</div>
	);
};

export default TodoApp;