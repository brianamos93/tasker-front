'use client'

import Link from "next/link"
import { useActionState } from "react"

interface FormErrors {
    task?: string[],
}

interface FormState {
    errors: FormErrors,
}

interface TaskFormProps {
	formAction: any,
	initialData: {
		task: string
	},
}

export default function TaskForm({ formAction, initialData }: TaskFormProps) {
	const [ formState, action ] = useActionState<FormState>(formAction, {
		errors: {},
	})


return <>
	<h1>{initialData.task ? 'Update' : 'Create'} Post</h1>
	<form action={action}>
		<div className="w-96">
			<div className="mb-4">
				<label htmlFor="task" className="block mb-2">Task</label>
				<input type="text" name="task" id="task" defaultValue={initialData.task} className="rounded p-2 w-full" />
				
			</div>
			<div className="mb-4">
                    <button type="submit" className="bg-white px-4 py-2 rounded mr-2">Save</button>
                    <Link href="/task" className="bg-transparent px-4 py-2 rounded">Cancel</Link>
            </div>
		</div>
	</form>
</>
}