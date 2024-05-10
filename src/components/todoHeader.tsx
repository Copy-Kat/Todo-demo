interface TODOHeaderProps {
	todos_completed: number;
	total_todos: number
} 

function TodoHeader({ todos_completed, total_todos }: TODOHeaderProps) {
	return (
		<>
				<p>Progress</p>
			<div>
				{todos_completed}/{total_todos}
			</div>
		</>
	);
}
export default TodoHeader;
