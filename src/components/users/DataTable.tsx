import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { useMemo, useState } from "react"
import useDebounce from "@/hooks/useDebounce"
import FilterDropdown from "./FilterDropdown"

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
}

export default function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
	const [searchQuery, setSearchQuery] = useState<string>("")
	const [filterCity, setFilterCity] = useState("")
	const [filterCompany, setFilterCompany] = useState("")

	const debouncedQuery = useDebounce(searchQuery, 500)

	const cities = Array.from(
		new Set(data.map((user: any) => user.address.city))
	).map((city) => ({ label: city, value: city }))

	const companies = Array.from(
		new Set(data.map((user: any) => user.company.name))
	).map((company) => ({ label: company, value: company }))

	const filteredData = useMemo(() => {
		const q = debouncedQuery?.toString?.().trim().toLowerCase()
		return (data as any[]).filter((user) => {
			// Name search
			if (q) {
				const name = (user?.name ?? "").toString().toLowerCase()
				if (!name.includes(q)) return false
			}
			// City filter
			if (filterCity?.toString?.().trim()) {
				if (user?.address?.city !== filterCity) return false
			}
			// Company filter
			if (filterCompany?.toString?.().trim()) {
				if (user?.company?.name !== filterCompany) return false
			}
			return true
		})
	}, [data, debouncedQuery, filterCity, filterCompany])


	const table = useReactTable({
		data: filteredData,
		columns,
		getCoreRowModel: getCoreRowModel(),
	})


	return (
		<div>
			<div className="flex w-full justify-between gap-4">
				<Input
					placeholder="Search by user name"
					className="mb-4 w-full max-w-sm"
					value={searchQuery}
					onChange={(event) => setSearchQuery(event.target.value)}
				/>

				<FilterDropdown cities={cities} companies={companies} setFilterCity={setFilterCity} setFilterCompany={setFilterCompany} />
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id} className="px-5">
											{header.isPlaceholder
												? null
												: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id} className="text-left p-5">
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}