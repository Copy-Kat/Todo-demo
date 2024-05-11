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
	title: HTMLInputElement;
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

		const value = form.elements.title.value;

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
		<form className="flex flex-col gap-5" onSubmit={handleSubmit}>
			<div className="flex flex-col gap-3">
				<label htmlFor="title"> Title: </label>
				<input
					className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
					onChange={handleChange}
					ref={inputRef}
					type="text"
					name="title"
					id="title"
					value={titleValue}
					placeholder="Write your next task"
				/>
			</div>

			<button
				className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 w-fit pl-2 pr-2"
				type="submit"
			>
				{isEdit ? "Apply" : "Add"}
			</button>
		</form>
	);
}
export default TodoForm;
