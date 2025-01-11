import { Task } from "@/app/utils/def"
import { getTasksList, getTask } from "@/app/utils/apiconnections"

export async function generateStaticParams() {
	const tasks = await getTasksList()
   
	return tasks.map((task: Task) => ({
	  slug: task.id,
	}))
  }

export default async function TaskPage({params}: {params: Promise<{ id: string }>
}) {
	const task = await getTask((await params).id)
	return (
		
		<><div>{task[0].task}</div><div>{task[0].id}</div></>
	)
  }