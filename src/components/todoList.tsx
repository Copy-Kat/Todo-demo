import React from "react";

import TaskCard from "./taskcard";

export interface Todo {
	title: string;
	id: string;
	description: string;
	is_priority: boolean;
	is_daily: boolean;
	is_completed: boolean;
	date_to_complete: Date
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
		<div className="flex flex-row flex-wrap gap-5 w-full">
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
		</div>
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

		<TaskCard 
			todo={todo}
			setEdit={setEdit}
			openModal={openModal}
			completeTodo={completeTodo}
			deleteTodo={deleteTodo}
		/>

		// <li id={todo.id}>
		// 	<p>{todo.title}</p>
		// 	<div>
		// 		<Button type="button" onClick={completeTodo}>
		// 			Complete
		// 		</Button>
		// 		<Button
		// 			type="button"
		// 			onClick={() => {
		// 				setEdit(true);
		// 				openModal(todo);
		// 			}}
		// 		>
		// 			Edit
		// 		</Button>
		// 		<Button type="button" onClick={deleteTodo}>
		// 			Delete
		// 		</Button>
		// 	</div>
		// </li>
	);
}