import TaskForm from "@/app/components/TaskForm";
import { getTask } from "@/app/utils/apiconnections";

interface TaskEditProps {
	params: {
		id: string;
	};
}

export default async function TaskEdit({ params }: TaskEditProps) {
	const { id } = await params
	const task = await getTask(id)
	console.log(task[0].task)

	const updateAction = "test"

	return (
		<main>
			<div>
				<TaskForm formAction={updateAction} initialData={{task: task[0]?.task ?? ''}} />
			</div>
		</main>
	)
}