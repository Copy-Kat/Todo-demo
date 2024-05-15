import React, { FormEvent, SetStateAction } from "react";
import { Todo } from './todoList';
import { Button } from "./ui/button";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "./ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "./ui/popover";

interface TodoFormProps {
	isEdit: boolean;
	todoContent: Todo
	inputRef: React.RefObject<HTMLInputElement>;
	setTodos: React.Dispatch<SetStateAction<Todo[]>>;
	closeModal: () => void;
}

interface FormFields extends HTMLFormControlsCollection {
	title: HTMLInputElement;
	description: HTMLInputElement;
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
	const [descriptionValue, setDescriptionValue] = React.useState(todoContent.description);
	const [dailyChecked, setdailyChecked] = React.useState(todoContent.is_daily);
	const [priorityChecked, setdailyPriorityChecked] = React.useState(todoContent.is_priority);
	const [date, setDate] = React.useState<Date | undefined>(todoContent.date_to_complete);

	if (date === undefined) {
		setDate(new Date())
	}

	const handleDailyChange = () => {
		setdailyChecked(!dailyChecked);
	};

	const handlePriorityChange = () => {
		setdailyPriorityChecked(!priorityChecked);
	};

	const handleSubmit = (event: FormEvent<FormData>) => {
		event.preventDefault();

		const form = event.currentTarget;

		const title = form.elements.title.value;
		const description = form.elements.description.value;

		if (isEdit) {
			setTodos((prevTodos) =>
				prevTodos.map((todo) =>
					todo.id === todoContent.id
						? {
								...todo,
								title: title,
								description: description,
								is_daily: dailyChecked,
								is_priority: priorityChecked,
								date_to_complete: date!
							}
						: todo
				)
			);
		}
		else {
			setTodos((prevTodos) => [
				...prevTodos,
				{ title: title, description: description, id: crypto.randomUUID(), is_completed: false, is_daily: dailyChecked, is_priority: priorityChecked, date_to_complete: date!},
			]);
		}

		form.reset();

		closeModal();
	};

	const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTitleValue(event.target.value);
	};

	const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDescriptionValue(event.target.value);
	};

	
	return (
		<form className="flex flex-col gap-5" onSubmit={handleSubmit}>
			<div className="flex flex-col gap-3">
				<label htmlFor="title"> Title: </label>
				<input
					className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
					onChange={handleTitleChange}
					ref={inputRef}
					type="text"
					name="title"
					id="title"
					value={titleValue}
					placeholder="Write your next task"
				/>
				<label htmlFor="description"> Title: </label>
				<input
					className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
					onChange={handleDescriptionChange}
					type="text"
					name="description"
					id="description"
					value={descriptionValue}
					placeholder="Description..."
				/>
				<div className="flex flex-row gap-5">
					<label htmlFor="dailycheck"> Daily task?</label>
					<input
						type="checkbox"
						checked={dailyChecked}
						onChange={handleDailyChange}
						id="dailycheck"
						name="dailycheck"
						value="Daily task"
					/>
				</div>
				<div className="flex flex-row gap-5">
					<label htmlFor="prioritycheck"> Priority task?</label>
					<input
						type="checkbox"
						checked={priorityChecked}
						onChange={handlePriorityChange}
						id="prioritycheck"
						name="prioritycheck"
						value="Priority task"
					/>
				</div>
				<div>Completion date:</div>
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant={"outline"}
							className={cn(
								"w-[280px] justify-start text-left font-normal",
								!date && "text-muted-foreground"
							)}
						>
							<CalendarIcon className="mr-2 h-4 w-4" />
							{date ? format(date, "PPP") : <span>Pick a date</span>}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0">
						<Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
					</PopoverContent>
				</Popover>
			</div>

			<Button
				className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 w-fit"
				type="submit"
			>
				{isEdit ? "Apply" : "Add"}
			</Button>
		</form>
	);
}
export default TodoForm;
