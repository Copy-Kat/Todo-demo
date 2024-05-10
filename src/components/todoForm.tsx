import React, { FormEvent, SetStateAction } from "react";
import { Todo } from './todoList';

interface TodoFormProps {
	isEdit: boolean;
	todoContent: Todo
	inputRef: React.RefObject<HTMLInputElement>;
	setTodos: React.Dispatch<SetStateAction<Todo[]>>;
	closeModal: () => void;
}

interface FormFields extends HTMLFormControlsCollection {
	todo: HTMLInputElement;
}

interface FormData extends HTMLFormElement {
	readonly elements: FormFields;
}

function TodoForm({
	setTodos,
	closeModal,
	inputRef,
	todoContent,
	isEdit,
}: TodoFormProps) {
	const [titleValue, setTitleValue] = React.useState(todoContent.title);

	const handleSubmit = (event: FormEvent<FormData>) => {
		event.preventDefault();

		const form = event.currentTarget;

		const value = form.elements.todo.value;

		if (isEdit) {
			setTodos((prevTodos) =>
				prevTodos.map((todo) =>
					todo.id === todoContent.id
						? { ...todo, title: value }
						: todo
				)
			);
		}
		else {
			setTodos((prevTodos) => [
				...prevTodos,
				{ title: value, id: crypto.randomUUID(), is_completed: false },
			]);
		}

		form.reset();

		closeModal();
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTitleValue(event.target.value);
	};

	return (
		<form className="form" onSubmit={handleSubmit}>
			<label htmlFor="todo">
				<input
					onChange={handleChange}
					ref={inputRef}
					type="text"
					name="todo"
					id="todo"
					value={titleValue}
					placeholder="Write your next task"
				/>
			</label>
			<button type="submit">
				Submit
			</button>
		</form>
	);
}
export default TodoForm;
