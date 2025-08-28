import { Loader2Icon } from 'lucide-react'

export default function LoadingSpinner() {
	return (
		<div className="flex flex-col min-h-screen justify-center items-center">
			<Loader2Icon className="animate-spin" />
		</div>
	)
}
