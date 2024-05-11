"use client";

import React from "react";
import TodoHeader from "@/components/todoHeader";
import TodoList from "@/components/todoList";

import ThemeSwitch from "@/components/themeSwitch";

import { Todo } from "@/components/todoList";
import Modal from '@/components/modal';

export default function Home() {

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
			{ title: "Some task", id: 'a', is_completed: false },
			{
				title: "Some other task",
				id: 'v',
				is_completed: true,
			},
			{ title: "last task", id: 's', is_completed: false },
		]);

  const todos_completed = todos.filter(
			(todo) => todo.is_completed === true
		).length;

	const total_todos = todos.length;

  // React.useEffect(() => {
  //   if (isModalOpen && inputRef.current) {
  //     inputRef.current.focus();
  //     // position the cursor at the end of the text
  //     inputRef.current.setSelectionRange(
  //       inputRef.current.value.length,
  //       inputRef.current.value.length
  //     );
  //   }
  // }, [isModalOpen]);

	return (
		<main className="flex min-h-screen flex-col items-center bg-background">
      <ThemeSwitch />
      
			<div className="">
				<TodoHeader todos_completed={todos_completed} total_todos={total_todos} />
				<button
					type="button"
					onClick={() => {
            setEdit(false)
            openModal({
              title: "",
              id: crypto.randomUUID(),
              is_completed: false,
            });
          }}
				>
					{" "}
					Add{" "}
				</button>
				<Modal
          isEdit={isEdit}
					inputRef={inputRef}
					isModalOpen={isModalOpen}
					modalTodoContent={modalTodoContent}
					closeModal={closeModal}
					setTodos={setTodos}
				/>
				<TodoList todos={todos} setTodos={setTodos} openModal={openModal} setEdit={setEdit}/>
			</div>
		</main>
	);
}
