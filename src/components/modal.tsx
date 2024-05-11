import { Todo } from "./todoList";
import TodoForm from "./todoForm";
import React, { SetStateAction } from "react";

interface ModalProps {
	isEdit: boolean
	inputRef: React.RefObject<HTMLInputElement>;
	isModalOpen: boolean;
	modalTodoContent: Todo | null;
	setTodos: React.Dispatch<SetStateAction<Todo[]>>;
	closeModal: () => void;
}

function Modal({
    isEdit,
	inputRef,
	isModalOpen,
	modalTodoContent,
	setTodos,
	closeModal,
}: ModalProps) {
	if (isModalOpen !== true || modalTodoContent === null) {
		return null;
	}
	return (
		<div
			className="h-screen w-screen absolute top-0 left-0 bg-background bg-opacity-70
            "
			onClick={closeModal}
		>
			<section
				className="h-fit w-fit bg-card absolute left-1/2 -translate-x-1/2 top-[20%] border p-5 pt-2 pb-2 flex flex-col rounded-md"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex flex-row justify-center mb-3">
					<span className="m-auto">{isEdit ? "Editing existing todo" : "Make a new todo"}</span>
					<span onClick={closeModal}>
						&times;
					</span>
				</div>
				<TodoForm
					isEdit={isEdit}
					setTodos={setTodos}
					closeModal={closeModal}
					inputRef={inputRef}
					todoContent={modalTodoContent}
				/>
			</section>
		</div>
	);
};

export default Modal;
