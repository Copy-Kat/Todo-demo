import React from "react";

export interface Todo {
	title: string;
	id: string;
	is_completed: boolean;
}

interface TodoProps {
	todo: Todo;
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
	setEdit: React.Dispatch<React.SetStateAction<boolean>>;
	openModal: (content: Todo) => void;
}

interface TodoListProps {
	todos: Todo[];
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
	setEdit: React.Dispatch<React.SetStateAction<boolean>>;
	openModal: (content: Todo) => void;
}

function TodoList({ todos, setTodos, openModal, setEdit } : TodoListProps) {
    

	return (
		<>
			<ol>
				{todos && todos.length > 0 ? (
					todos?.map((todo) => (
						<TodoItem
                            setEdit={setEdit}
							key={todo.id}
							todo={todo}
							setTodos={setTodos}
							openModal={openModal}
						/>
					))
				) : (
					<p>Add more todos? ....</p>
				)}
			</ol>
		</>
	);
}
export default TodoList;

function TodoItem({ todo, setTodos, openModal, setEdit }: TodoProps) {
    const id = todo.id

	const completeTodo = () => {

		setTodos((prevTodos) =>
			prevTodos.map((todo) =>
				todo.id === id ? { ...todo, is_completed: !todo.is_completed } : todo
			)
		);
	};

    const deleteTodo = () => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

	return (
		<li id={todo.id}>
			<p>{todo.title}</p>
			<div>
				<button type="button" onClick={completeTodo}>
					Complete
				</button>
				<button
					type="button"
					onClick={() => {
						setEdit(true);
						openModal(todo);
					}}
				>
					Edit
				</button>
				<button type="button" onClick={deleteTodo}>
					Delete
				</button>
			</div>
		</li>
	);
}