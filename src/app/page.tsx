"use client";

import React from "react";
import TodoHeader from "@/components/todoHeader";
import TodoList from "@/components/todoList";

import { Calendar } from "@/components/ui/calendar";

import { Button } from "@/components/ui/button";


import { Todo } from "@/components/todoList";
import Modal from '@/components/modal';
import { Plus } from "lucide-react";

export default function Home() {

	const [date, setDate] = React.useState<Date | undefined>(new Date());

	// const [daySelected, setDaySelected] = React.useState<Date[]>([])

	const [isModalOpen, setIsModalOpen] = React.useState(false);
	const [isEdit, setEdit] = React.useState(false);
	const [modalTodoContent, setModalTodoContent] = React.useState<Todo | null>(null);

	const inputRef = React.useRef<HTMLInputElement>(null);

	const openModal = (content: Todo) => {
		setIsModalOpen(true);
		setModalTodoContent(content);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

  	const [todos, setTodos] = React.useState<Todo[]>([
		{
			title: "Some task",
			id: "a",
			description: "some task",
			is_completed: false,
			is_daily: true,
			is_priority: false,
			date_to_complete: new Date(2024, 5, 8),
		},
	]);

  	const todos_completed = todos.filter(
			(todo) => todo.is_completed === true
		).length;

	const total_todos = todos.length;

	const daily_todos_completed = todos.filter(
		(todo) => todo.is_completed === true && todo.is_daily === true
	).length;

	const total_daily_todos = todos.filter(
		(todo) => todo.is_daily === true
	).length;

	const priority_todos_completed = todos.filter(
		(todo) => todo.is_completed === true && todo.is_priority === true
	).length;

	const total_priority_todos = todos.filter(
		(todo) => todo.is_priority === true
	).length;

	const daySelected: Date[] = todos.map((todo) => todo.date_to_complete)

	// const addDay = () => {
	// 	setDaySelected([...daySelected, new Date(2024, 5, 11)])
	// }

  React.useEffect(() => {
    if (isModalOpen) {
		window.scrollTo(0, 0)
    }
  }, [isModalOpen]);

	return (
		<main className="flex min-h-screen flex-col items-start bg-background p-5 px-7 gap-5">
			<div className="text-2xl font-semibold">Dashboard</div>

			<hr className="bg-foreground h-[0.5px] w-full" />

			<div className="flex flex-row w-full justify-between gap-5">
				<div className="w-full flex flex-col gap-5 items-center sm:items-start">
					<TodoHeader
						todos_completed={todos_completed}
						total_todos={total_todos}
						daily_todos_completed={daily_todos_completed}
						daily_total_todos={total_daily_todos}
						priority_todos_completed={priority_todos_completed}
						priority_total_todos={total_priority_todos}
					/>

					<div className="text-2xl font-semibold flex flex-row gap-5">
						My tasks{" "}
						<Button
							type="button"
							className="flex flex-row gap-3"
							onClick={() => {
								setEdit(false);
								openModal({
									title: "",
									description: "",
									id: crypto.randomUUID(),
									is_completed: false,
									is_daily: false,
									is_priority: false,
									date_to_complete: new Date(),
								});
							}}
						>
							{" "}
							Add <Plus />
						</Button>
					</div>

					<hr className="bg-foreground h-[0.5px] w-full" />

					<Modal
						isEdit={isEdit}
						inputRef={inputRef}
						isModalOpen={isModalOpen}
						modalTodoContent={modalTodoContent}
						closeModal={closeModal}
						setTodos={setTodos}
					/>
					<TodoList
						todos={todos}
						setTodos={setTodos}
						openModal={openModal}
						setEdit={setEdit}
					/>
				</div>

				<div className="w-fit justify-center hidden sm:table">
					<Calendar
						modifiers={{ booked: daySelected }}
						modifiersClassNames={{ booked: "booked" }}
						mode="single"
						selected={date}
						onSelect={setDate}
						className="rounded-md border"
						// components={{
						// 	DayContent: CustomDayContent,
						// 	// Row: CurrentWeekRow, // Replace the DayContent component
						// }}
					/>
				</div>
			</div>
		</main>
	);
}
