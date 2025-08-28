import { columns } from '@/components/users/Columns'
import DataTable from '@/components/users/DataTable'
import LoadingSpinner from '@/components/users/LoadingSpinner'
import useFetchUsers from '@/hooks/useFetchUsers'


export default function UserList() {
	const { users, loading, error } = useFetchUsers()

	if (loading) {
		return <LoadingSpinner />
	}

	if (!loading && error) {
		<div className="text-red-500 text-center my-4">
			{error}
		</div>
	}

	return (
		<section>
			<h1 className='text-3xl font-semibold text-left mb-4'>Users</h1>

			{/* Show table when data is ready */}
			<DataTable columns={columns} data={users} />
		</section>
	)
}
