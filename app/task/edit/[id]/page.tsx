import TaskForm from "@/app/components/TaskForm";
import { getTask, updateTask } from "@/app/utils/apiconnections";
import { getSession } from "@/app/utils/loginlib";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface TaskEditProps {
	params: {
		id: string;
	};
}

export default async function TaskEdit({ params }: TaskEditProps) {
	const { id } = await params
	const task = await getTask(id)
	const session = await getSession()

	async function updateTaskForm(prevState: any, formData: FormData) {
		'use server'

		const taskdata = formData.get("task")
		
		updateTask(id, taskdata, session.token)

		revalidatePath('/task')
   		redirect('/task')
		
	}


	return (
		<main>
			<div>
				<TaskForm formAction={updateTaskForm} initialData={{task: task[0]?.task ?? ''}} />
			</div>
		</main>
	)
}