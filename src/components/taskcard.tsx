import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Todo } from "./todoList";

interface TaskCardProps {
	todo: Todo;
	setEdit: React.Dispatch<React.SetStateAction<boolean>>;
	openModal: (content: Todo) => void;
	completeTodo: () => void;
	deleteTodo: () => void;
}

export default function TaskCard({
	todo,
	setEdit,
	openModal,
	completeTodo,
    deleteTodo
}: TaskCardProps) {
	return (
		<Card className="min-w-[200px] max-w-[500px] w-fit gap-5">
			<CardHeader>
				<CardTitle className="flex flex-row gap-5 align-middle items-center">
					<div className="overflow-hidden max-w-[250px]"> {todo.title} </div>
					<Button type="button" onClick={completeTodo}>
						{todo.is_completed ? "Uncheck" : "Complete"}
					</Button>
				</CardTitle>
				<CardDescription className="overflow-hidden max-w-[150px]">
					{todo.description}
				</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col gap-5">
				Completion: {todo.date_to_complete.toDateString()}
				<div className="flex flex-row justify-between gap-5">
					<Button
						type="button"
						onClick={() => {
							setEdit(true);
							openModal(todo);
						}}
					>
						Edit
					</Button>
					<Button type="button" onClick={deleteTodo}>
						Delete
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
