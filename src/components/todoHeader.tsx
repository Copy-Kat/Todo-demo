import { Progress } from "@/components/ui/progress";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

interface TODOHeaderProps {
	todos_completed: number;
	total_todos: number;
	daily_todos_completed: number;
	daily_total_todos: number;
	priority_todos_completed: number;
	priority_total_todos: number;
}

function TodoHeader({
	todos_completed,
	total_todos,
	daily_todos_completed,
	daily_total_todos,
	priority_todos_completed,
	priority_total_todos,
}: TODOHeaderProps) {
	return (
		<div className="w-full flex gap-5 flex-wrap">
			<Card className="min-w-[200px] max-w-[500px] w-full">
				<CardHeader>
					<CardTitle>Total progress</CardTitle>
					<CardDescription>
						{todos_completed}/{total_todos} task completed
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Progress className="" value={(todos_completed / total_todos) * 100} />
				</CardContent>
			</Card>
			<Card className="min-w-[200px] max-w-[500px] w-full">
				<CardHeader>
					<CardTitle>Daily task</CardTitle>
					<CardDescription>
						{daily_todos_completed}/{daily_total_todos} task completed
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Progress
						className=""
						value={(daily_todos_completed / daily_total_todos) * 100}
					/>
				</CardContent>
			</Card>
			<Card className="min-w-[200px] max-w-[500px] w-full">
				<CardHeader>
					<CardTitle>Prioity tasks</CardTitle>
					<CardDescription>
						{priority_todos_completed}/{priority_total_todos} task completed
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Progress
						className=""
						value={(priority_todos_completed / priority_total_todos) * 100}
					/>
				</CardContent>
			</Card>
		</div>
	);
}
export default TodoHeader;
